import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export default async function analyzeWithAI(claim, news, wiki) {

 
  const evidence = news.slice(0,5).map(n =>
    `${n.title} - ${n.source?.name || ""}`
  ).join("\n");

  const wikiText = wiki?.extract || "No wiki info";

  const prompt = `
You are a news verification assistant.

Claim:
"${claim}"

Wikipedia Information:
${wikiText}

News Evidence:
${evidence}

Task:
1. Decide if claim is likely true, false, or unclear.
2. Give confidence score (0-100).
3. Explain reasoning briefly.

Return JSON ONLY:
{
 "verdict":"",
 "confidence":0,
 "reason":""
}
`;

  try {
    const response = await client.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    });

    const text = response.choices[0].message.content;

    return JSON.parse(text);

  } catch (err) {
    console.log("AI analysis failed");
    return null;
  }
}