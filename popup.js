// ----------------------
// 🚀 POPUP SCAN HANDLER
// ----------------------
document.getElementById('scanBtn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let url = tab.url;
  let resultDiv = document.getElementById('result');
  let actionsDiv = document.getElementById('actions');

  // Run our rule-based engine
  let decision = checkPhishing(url);

  // Show result
  resultDiv.textContent = decision.message;
  resultDiv.style.color = decision.color;
  resultDiv.style.textShadow = decision.color === "red" ? "0 0 5px #ff0000, 0 0 10px #ff0000"
                              : decision.color === "orange" ? "0 0 5px #ffa500"
                              : "0 0 5px #00ff00";

  // Show actions if risky
  if (decision.risk > 0) {
    actionsDiv.style.display = 'block';
  } else {
    actionsDiv.style.display = 'none';
  }
});

// ----------------------
// 🕵️ RULE-BASED CHECK
// ----------------------
function checkPhishing(url) {
  let u = url.toLowerCase();
  let riskCount = 0;

  // 1. Must be https
  if (!u.startsWith("https://")) riskCount++;

  // 2. Long suspicious URL
  if (u.length > 75) riskCount++;

  // 3. Contains '@'
  if (u.includes('@')) riskCount++;

  // 4. Too many subdomains
  let hostname = new URL(url).hostname;
  if ((hostname.match(/\./g) || []).length > 3) riskCount++;

  // 5. Suspicious keywords
  const susWords = ['login','signin','update','secure','bank','confirm','webscr','account','ebayisapi','verify'];
  for (let w of susWords) {
    if (u.includes(w)) {
      riskCount++;
      break;
    }
  }

  // 6. IP address as domain
  if (/(\d{1,3}\.){3}\d{1,3}/.test(hostname)) riskCount++;

  // 7. URL shorteners
  const shorteners = ['bit.ly','goo.gl','t.co','tinyurl.com','ow.ly','buff.ly'];
  for (let s of shorteners) {
    if (u.includes(s)) {
      riskCount++;
      break;
    }
  }

  // 🚦 Decision logic
  if (riskCount >= 3) {
    return { message: "🚨 High Risk! Phishing suspected!", color: "red", risk: 2 };
  }
  if (riskCount > 0) {
    return { message: "⚠️ Medium Risk. Be cautious!", color: "orange", risk: 1 };
  }
  return { message: "✅ Looks safe.", color: "green", risk: 0 };
}

// ----------------------
// 🔘 ACTION BUTTONS
// ----------------------
document.getElementById('proceed').addEventListener('click', () => {
  // proceed alert
  alert("⚠️ You chose to proceed! Stay ultra cautious. 🔓");
});

document.getElementById('block').addEventListener('click', async () => {
  // close the current tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.remove(tab.id);
});
