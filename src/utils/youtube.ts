export function getYouTubeVideoId(url: string) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname
      .replace(/^www\./, "")
      .replace(/^m\./, "");

    let videoId = "";

    if (host === "youtu.be") {
      videoId = parsedUrl.pathname.split("/")[1] || "";
    } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (parsedUrl.pathname === "/watch") {
        videoId = parsedUrl.searchParams.get("v") || "";
      } else {
        const [type, id] = parsedUrl.pathname.split("/").filter(Boolean);

        if (["embed", "shorts", "live"].includes(type)) {
          videoId = id || "";
        }
      }
    }

    return /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : null;
  } catch {
    return null;
  }
}

export function getYouTubeEmbedUrl(url: string) {
  const videoId = getYouTubeVideoId(url);

  return videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : null;
}