🛡️ Phishing Detector – Chrome Extension

⚡ Detect suspicious websites before they load.

🚫 Block phishing attempts with hacker‑style warnings.

✅ Rule‑based + API powered (optional).

📂 Project Structure
pgsql
Copy
Edit
📁 Phishing-Detector/
│
├── manifest.json        👉 The heart of the extension (name, permissions, entry points)
│
├── popup.html           👉 UI that appears when you click the extension icon
├── popup.js             👉 Checks active tab URL & shows result
│
├── content.js           👉 Injected script that scans & blocks pages in real time
├── background.js        👉 Service worker (can handle APIs or future logic)
│
├── blocked.html         👉 Full-screen hacker‑style “SITE BLOCKED” page
│
└── icons/               👉 Extension icons (16×16, 48×48, 128×128)

✨ Features
✅ Real‑time phishing detection (offline rules)
✅ Overlay warning with Proceed or Block
✅ Stylish blocked.html page with hacker vibe
✅ Works on all websites thanks to host permissions
✅ Optional integration with Google Safe Browsing API

🔎 Detection Rules
The extension calculates a risk score based on these rules:

✅ Check	                📝 What it does
🔐 HTTPS Check	        Warns if URL doesn’t start with https://
🔗 URL Length	        Warns if URL is longer than 75 characters
📧 @ Symbol	            Warns if URL contains @
🌐 Subdomains	        Warns if hostname has more than 3 dots
🏦 Keywords	            Warns if URL has suspicious words: login, signin, bank, verify, etc.
📌 IP Address	        Warns if domain is just an IP address
✂️ Shorteners	        Warns if URL uses known shorteners like bit.ly, tinyurl.com

👉 Risk Points Logic:

0 → ✅ Safe

1–2 → ⚠️ Medium Risk

≥3 → 🚨 High Risk – Phishing suspected

⚡ Optional: Google Safe Browsing API
Want to take it next level?
You can integrate Google’s Safe Browsing API:

🔑 Get an API key from Google Cloud Console
🌐 Check each URL against Google’s threat database.
✅ Combine API result with rule‑based score for ultimate accuracy.

🚀 Installation
Download or clone this repository.

Open Chrome → go to chrome://extensions/.

Turn on Developer Mode (top-right toggle).

Click Load Unpacked → select the project folder.

That’s it! 🎉 Your extension is live.

🤖 Future Improvements
📡 Add PhishTank API integration

🧠 Train an ML model for smarter detection

🎨 Create dark/light themes for popup UI

📊 Add a dashboard to log and review flagged URLs

🏷️ Version
v1.0 – Initial Release ✅
Built with: JavaScript, HTML, CSS, and a pinch of hacker soul 💚

Enjoy safe browsing.