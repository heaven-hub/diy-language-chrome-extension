chrome.runtime.onMessage.addListener((message) => {
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
                chrome.storage.local.set({ savedWords: updated }, async () => {
                    let res = await fetch('http://localhost:3000/api/users');
                    console.log('res',res)
                });
            });
        });
    }
});

// window.addEventListener("trigger-translation", (e) => {
//     const text = e.detail;
//     const existing = document.querySelector("#my-translate-popup");
//     if (existing) existing.remove();

//     const range = window.getSelection().getRangeAt(0);
//     const rect = range.getBoundingClientRect();

//     const popup = document.createElement("div");
//     popup.id = "my-translate-popup";
//     popup.innerText = "載入中...";
//     popup.style.position = `fixed`;
//     popup.style.right = `0px`;
//     popup.style.top = `0px`;
//     popup.style.zIndex = `20000`;

//     document.body.appendChild(popup);

//     const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=${encodeURIComponent(text)}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             const translated = data?.[0]?.map(part => part[0]).join("");
//             popup.innerText = translated || "無翻譯結果";
//             console.log('translated',translated)

//         })
//         .catch(() => {
//             popup.innerText = "翻譯錯誤";
//         });

//     setTimeout(() => popup.remove(), 8000);
// });
