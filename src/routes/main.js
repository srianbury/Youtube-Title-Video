import { Router } from "express";
import fetch from "node-fetch";
import { getPath } from "../common";

const router = Router();

const ORDER_DATE = "date";
const ORDER_VIEW_COUNT = "viewcount";

const FORMAT_LINK = "link";
const FORMAT_JSON = "json";

const YOUTUBE_404 = "https://www.youtube.com/error?src=404";

/*
  Returns the url for
    - most recent (date) (default)
    - most viewed (viewcount)
  given a channel ID
  
  Options
    - Order
      - date (default)
      - viewcount
    - Format
     - link (default)
     - json
*/
router.get("/:channelId", async (req, res) => {
  const BASE = "https://www.googleapis.com/youtube/v3/search";
  const GRAPHQUERY_PART = "snippet,id";

  const channelId = req.params.channelId;
  const order = req.query.order || ORDER_DATE;
  const format = req.query.format || FORMAT_LINK;

  const maxResults = order === ORDER_DATE ? 1 : 2;
  const url = `${BASE}?key=${process.env.YOUTUBE_API_KEY}&channelId=${channelId}&part=${GRAPHQUERY_PART}&order=${order}&maxResults=${maxResults}`;

  const response = await fetch(url);

  if (response.status !== 200) {
    if (format == FORMAT_JSON) {
      return res.status(404).send({ videoId: null });
    }

    return res.redirect(YOUTUBE_404);
  }

  const result = await response.json();
  let videoUrl = getUrl(order, result);

  if (format === FORMAT_JSON) {
    return res.send({
      videoId: videoUrl
    });
  }

  videoUrl = watchFormat(videoUrl);
  return res.redirect(videoUrl);
});

function getUrl(order, result) {
  let videoUrl;
  switch (order) {
    case ORDER_VIEW_COUNT:
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

router.path = getPath("watch");
export default router;
export { YOUTUBE_404 };
