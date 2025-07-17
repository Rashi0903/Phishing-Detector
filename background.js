// 🔑 Your Google Safe Browsing API key
const API_KEY = "put your API key here"; 

// Listen for URL check messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CHECK_URL") {
    checkWithSafeBrowsing(message.url).then(result => {
      sendResponse(result);
    });
    return true; // async response
  }
});

// ✅ Function to hit Safe Browsing API
async function checkWithSafeBrowsing(urlToCheck) {
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;
  const body = {
    client: {
      clientId: "phishing-detector",
      clientVersion: "1.0"
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [
        { url: urlToCheck }
      ]
    }
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data && data.matches) {
      console.warn("⚠️ Google Safe Browsing flagged this URL!", data.matches);
      return { safe: false, matches: data.matches };
    } else {
      return { safe: true };
    }
  } catch (err) {
    console.error("Safe Browsing API error:", err);
    // On error, assume safe (or tu chaahe toh block kar de)
    return { safe: true };
  }
}
