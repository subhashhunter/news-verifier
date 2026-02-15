export function routeQuery(text) {
  const lower = text.toLowerCase();

  return {
    useNews: true,
    useWiki: true,
    useDuck: true
  };
}
