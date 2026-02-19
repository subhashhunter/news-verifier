import axios from "axios";

export default async function searchGNews(query) {
  try {
    const apiKey =process.env.API_KEY;
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&apikey=${apiKey}`;
    const res = await axios.get(url);
    return res.data?.articles ?? [];
  } catch(error) {
    console.log(error);
      return [];
  }
}
