export function analyze({ news = [], wiki, duck = [] }) {
  let score = 50;
  let reasons = [];

  if (wiki) {
    score += 10;
    reasons.push("Topic exists on Wikipedia");
  }

  if (news.length >= 3) {
    score += 40;
    reasons.push("Multiple reliable news sources found");
  } 
  else if (news.length > 0) {
    score += 15;
    reasons.push("Some news coverage found");
  } 
  else {
    score -= 40;
    reasons.push("No trusted news sources support this claim");
  }

  if (!wiki && news.length === 0) {
    score -= 20;
    reasons.push("No reliable evidence found");
  }

  score = Math.max(0, Math.min(100, score));

  let verdict =
    score >= 75 ? "Likely True"
    : score <= 35 ? "Likely False"
    : "Unclear";

  return { score, verdict, reason: reasons };
}
