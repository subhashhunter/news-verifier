import axios from "axios";

export default async function searchNewsAPI(query) {
  try {
    const apiKey = process.env.NEWSAPI_KEY;

    if (!apiKey) {
      console.log("NewsAPI key missing");
      return;
    }

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=5&apiKey=${apiKey}`;

    const res = await axios.get(url);
    console.log("response from newsapi",res)
    return res.data?.articles ?? [];

  } catch (error) {
    console.log(error.message)
    console.log("NewsAPI failed");
    return [];
    
  }
}
