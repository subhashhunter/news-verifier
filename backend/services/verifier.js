import searchWiki from "./sources/wiki.js";
import searchDuck from "./sources/duck.js";
import analyzeWithAI from "./aiAnalyzer.js";
import { routeQuery } from "./router.js";
import searchGNews from "./sources/gnews.js";
import searchNewsAPI from "./sources/newsapi.js";

export default async function verifyText(text) {
  const route = routeQuery(text);

  const [gnews, newsapi, wiki, duck] = await Promise.all([
    route.useNews ? searchGNews(text) : [],
    route.newsApi ? searchNewsAPI(text) : [],
    route.useWiki ? searchWiki(text) : null,
    route.useDuck ? searchDuck(text) : []
  ]);

 
  const news = [...gnews, ...newsapi];

  const aiResult = await analyzeWithAI(text, news, wiki);

  return {
  text,
  accuracy: aiResult?.confidence ,
  verdict: aiResult?.verdict ,
  wikiFound: !!wiki,
  newsCount: news.length,
  reason: aiResult?.reason
};
}
