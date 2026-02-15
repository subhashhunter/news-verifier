// import searchGNews from "./sources/gnews.js";
import searchWiki from "./sources/wiki.js";
import searchDuck from "./sources/duck.js";
import { analyze } from "./analyzer.js";
import { routeQuery } from "./router.js";
import searchGNews from "./sources/gnews.js";

export default async function verifyText(text) {
  const route = routeQuery(text);

  const [news, wiki, duck] = await Promise.all([
    route.useNews?searchGNews(text):null,
    route.useWiki ? searchWiki(text) : null,
    route.useDuck ? searchDuck(text) : null
  ]);

  const result = analyze({news, wiki, duck });

  // return {
  //   text,
  //   accuracy: result.score,
  //   verdict: result.verdict,
  //    newsCount: news.length,
  //   wikiFound: !!wiki
  // };
  return {
  text,
  accuracy: result.score,
  verdict: result.verdict,
  wikiFound: !!wiki,
  newsCount: news.length,
  reason: result.reason
};

}
