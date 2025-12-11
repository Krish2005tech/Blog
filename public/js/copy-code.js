console.log("copy-code.js: loading");

document.addEventListener("DOMContentLoaded", () => {
  console.log("copy-code.js: DOMContentLoaded");
  document.querySelectorAll("pre").forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) return;
    if (pre.querySelector(".copy-button")) return;

    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.innerText = "Copy";

    pre.style.position = "relative";
    pre.appendChild(button);

    button.addEventListener("click", async () => {
      const text = code.innerText;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // fallback for older browsers
          const ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        button.innerText = "Copied!";
        setTimeout(() => (button.innerText = "Copy"), 1500);
      } catch (err) {
        console.error("copy-code.js: copy failed", err);
        button.innerText = "Failed";
        setTimeout(() => (button.innerText = "Copy"), 1500);
      }
    });
  });
});
