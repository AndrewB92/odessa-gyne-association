export const onRequestGet: PagesFunction<{
  GITHUB_CLIENT_ID: string;
}> = async ({ env, request }) => {
  const url = new URL(request.url);

  const origin = url.origin;
  const scope = "repo,user";

  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", `${origin}/api/callback`);
  authUrl.searchParams.set("scope", scope);

  return Response.redirect(authUrl.toString(), 302);
};