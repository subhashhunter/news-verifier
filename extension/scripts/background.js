// 1. Create the Context Menu items when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "verifyText",
    title: "Verify selected text",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "verifyImage",
    title: "Verify this image",
    contexts: ["image"]
  });
});

// 2. Listen for when the user clicks those menu items
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "verifyText") {
    // Wrap string in object to keep 'payload' structure consistent with popup.js
    sendToBackend("text", { content: info.selectionText });
  } else if (info.menuItemId === "verifyImage") {
    sendToBackend("image", { imageUrl: info.srcUrl });
  }
});

// 3. Reusable function to talk to the Express server
async function sendToBackend(type, data) {
  try {
    const response = await fetch('http://localhost:8000/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        category: type, 
        payload: data,
        timestamp: new Date().toISOString()
      })
    });
    
    const result = await response.json();
    console.log("Background Verification Result:", result);
    
    // Send a notification to the user with the result
    // Note: Ensure icons/icon128.png exists in your folder
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png', 
      title: 'Verification Result',
      message: `The AI says this is: ${result.label}`,
      priority: 2
    });
  } catch (error) {
    console.error("Background fetch failed:", error);
  }
}