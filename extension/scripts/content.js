chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getText") {
    // 1. Text & Metadata extraction
    const headline = document.querySelector("h1")?.innerText || document.title;

    const paragraphs = Array.from(document.querySelectorAll("p"))
      .map((p) => p.innerText.trim())
      .filter((text) => text.length > 20);

    // 2. Image extraction
    const images = Array.from(document.querySelectorAll("img"))
      .map((img) => img.src)
      .filter((src) => src.startsWith('http')); // Ensure valid URLs

    // 3. Video extraction (Native tags and common embeds)
    const videoElements = Array.from(document.querySelectorAll("video"))
      .map((v) => v.src)
      .filter((src) => src);

    const iframes = Array.from(document.querySelectorAll("iframe"))
      .map((f) => f.src)
      .filter((src) => src.includes("youtube.com") || src.includes("vimeo.com"));

    // Send response back to popup.js
    sendResponse({
      title: headline,
      content: paragraphs.slice(0, 5).join("\n\n"),
      firstImage: images[0] || null,
      firstVideo: videoElements[0] || iframes[0] || null, 
      url: window.location.href,
    });
  }
  // Keeps the message channel open for asynchronous response
  return true;
});