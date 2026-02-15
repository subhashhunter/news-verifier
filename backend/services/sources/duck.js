import axios from "axios";

export default async function searchDuck(query) {
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;
    const res = await axios.get(url);
    return res.data.RelatedTopics || [];
  } catch(error) {
    console.log(error)
  }
}
