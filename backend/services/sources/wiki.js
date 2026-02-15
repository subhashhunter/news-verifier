import axios from "axios";

export default async function searchWiki(query) {
  try {
    // STEP 1: search for relevant page
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;

    const searchRes = await axios.get(searchUrl, {
      headers: {
        "User-Agent": "news-verifier-bot/1.0"
      }
    });

    const results = searchRes.data.query.search;

    if (!results || results.length === 0) {
      return null;
    }

    // take first best result
    const title = results[0].title;

    // STEP 2: get summary of that page
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

    const summaryRes = await axios.get(summaryUrl, {
      headers: {
        "User-Agent": "news-verifier-bot/1.0"
      }
    });

    return summaryRes.data.extract || null;

  } catch (err) {
    console.log("Wiki error");
    return null;
  }
}
