// Helper function to talk to the Express backend
async function sendToBackend(type, data) {
  const statusDiv = document.getElementById("status");
  statusDiv.innerText = "Verifying..."; 

  try {
    const response = await fetch("http://localhost:8000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: type, // Matches server.js logic
        payload: data,  // Matches server.js logic
        timestamp: new Date().toISOString(),
      }),
    });

    const result = await response.json();
    statusDiv.innerText = `Result: ${result.label}`; 
  } catch (error) {
    console.error("Backend Error:", error);
    statusDiv.innerText = "Error: Backend not reachable.";
  }
}

// Logic to trigger data extraction and sending
document.getElementById("verifyBtn").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Ensure content script is ready to receive the message
  chrome.tabs.sendMessage(tab.id, { action: "getText" }, (response) => {
    if (chrome.runtime.lastError) {
      document.getElementById("status").innerText = "Error: Refresh the page.";
      return;
    }

    if (response) {
      // 1. Sending Text Data
      sendToBackend("text", {
        title: response.title,
        content: response.content,
        url: response.url,
      });

      // 2. Sending Image Data
      if (response.firstImage) {
        sendToBackend("image", { imageUrl: response.firstImage });
      }

      // 3. Sending Video Data (Updated key to match content.js)
      if (response.firstVideo) {
        sendToBackend("video", { videoUrl: response.firstVideo });
      }
    }
  });
});