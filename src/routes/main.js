import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

const DATE = "date";
const VIEW_COUNT = "viewcount";

/*
  Returns the url for
    - most recent (date) (default)
    - most viewed (viewcount)
  given a channel ID
*/
router.get("/:channelId", async (req, res) => {
  const BASE = "https://www.googleapis.com/youtube/v3/search";
  const GRAPHQUERY_PART = "snippet,id";
  const channelId = req.params.channelId;
  const order = req.query.order || DATE;
  const maxResults = order === DATE ? 1 : 2;
  const url = `${BASE}?key=${process.env.YOUTUBE_API_KEY}&channelId=${channelId}&part=${GRAPHQUERY_PART}&order=${order}&maxResults=${maxResults}`;
  const response = await fetch(url);
  const result = await response.json();

  let videoUrl = getUrl(order, result);
  videoUrl = watchFormat(videoUrl);
  return res.redirect(videoUrl);
});

function getUrl(order, result) {
  let videoUrl;
  switch (order) {
    case VIEW_COUNT:
      videoUrl = result.items[1].id.videoId;
      break;
    default:
      videoUrl = result.items[0].id.videoId;
  }
  return videoUrl;
}

function watchFormat(url) {
  return `https://www.youtube.com/watch?v=${url}`;
}

export default router;
