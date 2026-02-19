import searchWiki from "./sources/wiki.js";
import searchDuck from "./sources/duck.js";
import { analyze } from "./analyzer.js";
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

  // combine both news sources
  const news = [...gnews, ...newsapi];

  const result = analyze({ news, wiki, duck });

  return {
    text,
    accuracy: result.score,
    verdict: result.verdict,
    wikiFound: !!wiki,
    newsCount: news.length,
    reason: result.reason
  };
}
