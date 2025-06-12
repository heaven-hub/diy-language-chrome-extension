console.log("[content] index.js loaded");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "translate") {
        const selectedText = message.text;

        // 模擬翻譯結果，可替換為實際 API
        const fakeTranslated = selectedText + "（翻譯結果）";

        // 清除舊的對話框
        document.getElementById("translator-popup")?.remove();

        const popup = document.createElement("div");
        popup.id = "translator-popup";
        popup.style.cssText = `
        position: fixed;
        top: 100px;
        right: 100px;
        background: white;
        border: 1px solid #ccc;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        border-radius: 8px;
        padding: 12px;
        z-index: 99999;
        font-family: sans-serif;
        max-width: 300px;
      `;

        popup.innerHTML = `
        <div><strong>原文：</strong>${selectedText}</div>
        <div><strong>翻譯：</strong>${fakeTranslated}</div>
        <button id="save-word" style="margin-top: 8px;">❤️ 收藏</button>
      `;

        document.body.appendChild(popup);

        // 收藏按鈕點擊邏輯（儲存到 chrome.storage）
        document.getElementById("save-word").addEventListener("click", () => {
            chrome.storage.local.get({ savedWords: [] }, (res) => {
                const updated = [...res.savedWords, { original: selectedText, translated: fakeTranslated }];
                chrome.storage.local.set({ savedWords: updated }, () => {
                    alert("已收藏！");
                });
            });
        });
    }
});
