export const onRequestGet: PagesFunction<{
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}> = async ({ env, request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Missing GitHub OAuth code", { status: 400 });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json<{
    access_token?: string;
    token_type?: string;
    scope?: string;
    error?: string;
    error_description?: string;
  }>();

  if (!tokenData.access_token) {
    return new Response(
      tokenData.error_description || tokenData.error || "GitHub OAuth failed",
      { status: 401 }
    );
  }

  const content = `
<!doctype html>
<html>
  <body>
    <script>
      (function() {
        const receiveMessage = function(event) {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({
              token: tokenData.access_token,
              provider: "github"
            })}',
            event.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        };

        window.addEventListener("message", receiveMessage, false);

        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
    },
  });
};