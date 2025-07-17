// Inject only once
if (!window.hasRunPhishingOverlay) {
  window.hasRunPhishingOverlay = true;

  // Agar bypass flag set hai toh kuch mat kar
  if (sessionStorage.getItem('phishBypass') === 'true') {
    // do nothing
  } else {
    const currentUrl = window.location.href.toLowerCase();
    let riskCount = 0;
    let reasons = [];

    // 👉 Rule-based checks
    if (!currentUrl.startsWith("https://")) {
      riskCount++;
      reasons.push("No HTTPS");
    }
    if (currentUrl.length > 75) {
      riskCount++;
      reasons.push("Very long URL");
    }
    if (currentUrl.includes("@")) {
      riskCount++;
      reasons.push("Contains @ in URL");
    }
    let hostname = new URL(window.location.href).hostname;
    if ((hostname.match(/\./g) || []).length > 3) {
      riskCount++;
      reasons.push("Too many subdomains");
    }

    // 👉 Safe Browsing API check
    chrome.runtime.sendMessage({ type: "CHECK_URL", url: window.location.href }, (response) => {
      if (response && response.safe === false) {
  // 🚨 Direct block if Google flagged
  document.documentElement.innerHTML = ""; // clear everything
  document.body.style.margin = "0";
  document.body.style.height = "100vh";
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";
  document.body.style.backgroundColor = "#000"; // plain black
  document.body.style.fontFamily = "'Courier New', monospace";
  document.body.style.color = "#0f0";
  document.body.style.position = "relative"; // for footer positioning

  // container
  const container = document.createElement("div");
  container.style.textAlign = "center";
  container.style.position = "relative";
  container.style.zIndex = "10";

  // heading
  const h1 = document.createElement("h1");
  h1.innerHTML = "🚫 SITE BLOCKED";
  h1.style.fontSize = "3em";
  h1.style.color = "#f00";
  h1.style.textShadow = "0 0 15px #fff,0 0 30px #fff,0 0 50px #fff";
  h1.style.animation = "glow 2s infinite alternate";
  h1.style.marginBottom = "20px";
  container.appendChild(h1);

  // message
  const p = document.createElement("p");
  p.textContent = "This site was flagged as suspicious and has been blocked.";
  p.style.fontSize = "1.2em";
  p.style.color = "#0f0";
  p.style.textShadow = "0 0 10px #0f0";
  p.style.marginBottom = "40px";
  container.appendChild(p);

  // hacker lines
  const hackerLines = document.createElement("div");
  hackerLines.innerText = `> Threat patterns detected…\n> Access denied.`;
  hackerLines.style.fontSize = "0.9em";
  hackerLines.style.color = "#0f0";
  hackerLines.style.whiteSpace = "pre-line";
  hackerLines.style.animation = "flicker 2s infinite alternate";
  container.appendChild(hackerLines);

  // footer
  const footer = document.createElement("div");
  footer.textContent = "🛡️ Phishing Detector v1.0";
  footer.style.position = "absolute";
  footer.style.bottom = "15px";
  footer.style.left = "0";
  footer.style.right = "0";
  footer.style.textAlign = "center";
  footer.style.fontSize = "0.9em";
  footer.style.color = "#0f0";
  footer.style.textShadow = "0 0 5px #0f0";
  document.body.appendChild(footer);

  // keyframes
  const style = document.createElement("style");
  style.textContent = `
    @keyframes glow {
      from { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #fff; }
      to { text-shadow: 0 0 20px #eee, 0 0 40px #eee, 0 0 60px #eee; }
    }
    @keyframes flicker {
      0% { opacity: 0.8; }
      50% { opacity: 0.4; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(container);
  return;
}

 // don't even show overlay
       else {
        // ✅ Continue with rule-based overlay
        if (riskCount >= 1) {
          showOverlay(reasons);
        }
      }
    });
  }
}

// 👉 Overlay creation function
function showOverlay(reasons) {
  document.documentElement.innerHTML = "";
  document.body.style.margin = "0";
  document.body.style.height = "100vh";
  document.body.style.display = "flex";
  document.body.style.alignItems = "center";
  document.body.style.justifyContent = "center";
  document.body.style.backgroundColor = "#1c1b1f";
  document.body.style.color = "#fff";
  document.body.style.fontFamily = "Arial, sans-serif";

  const modal = document.createElement("div");
  modal.style.background = "#121212";
  modal.style.padding = "40px";
  modal.style.borderRadius = "12px";
  modal.style.boxShadow = "0 0 20px rgba(255,0,255,0.3)";
  modal.style.textAlign = "center";
  modal.style.width = "350px";

  const title = document.createElement("h2");
  title.textContent = window.location.hostname + " says";
  title.style.color = "#fff";
  title.style.marginBottom = "15px";
  modal.appendChild(title);

  const warning = document.createElement("p");
  warning.textContent = "⚠️ This site looks suspicious!";
  warning.style.color = "#ffcc00";
  warning.style.fontSize = "16px";
  warning.style.fontWeight = "bold";
  modal.appendChild(warning);

  const reasonTitle = document.createElement("p");
  reasonTitle.textContent = "Reasons:";
  reasonTitle.style.marginTop = "10px";
  reasonTitle.style.fontWeight = "bold";
  modal.appendChild(reasonTitle);

  reasons.forEach(r => {
    const li = document.createElement("p");
    li.textContent = "- " + r;
    li.style.margin = "0";
    modal.appendChild(li);
  });

  const ask = document.createElement("p");
  ask.textContent = "Do you want to continue?";
  ask.style.marginTop = "20px";
  modal.appendChild(ask);

  const btnContainer = document.createElement("div");
  btnContainer.style.marginTop = "25px";
  btnContainer.style.display = "flex";
  btnContainer.style.justifyContent = "center";
  btnContainer.style.gap = "20px";

  const okBtn = document.createElement("button");
  okBtn.textContent = "OK";
  okBtn.style.background = "#ff66cc";
  okBtn.style.border = "none";
  okBtn.style.color = "#000";
  okBtn.style.padding = "10px 25px";
  okBtn.style.borderRadius = "30px";
  okBtn.style.fontWeight = "bold";
  okBtn.style.cursor = "pointer";
  okBtn.onclick = () => {
    sessionStorage.setItem('phishBypass', 'true');
    location.href = window.location.href;
  };

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.background = "#5e3360";
  cancelBtn.style.border = "none";
  cancelBtn.style.color = "#fff";
  cancelBtn.style.padding = "10px 25px";
  cancelBtn.style.borderRadius = "30px";
  cancelBtn.style.fontWeight = "bold";
  cancelBtn.style.cursor = "pointer";
  cancelBtn.onclick = () => {
    window.location.href = chrome.runtime.getURL("blocked.html");
  };

  btnContainer.appendChild(okBtn);
  btnContainer.appendChild(cancelBtn);
  modal.appendChild(btnContainer);
  document.body.appendChild(modal);
}
