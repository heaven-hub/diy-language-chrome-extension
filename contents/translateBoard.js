// import { collectWords } from '/api/index.js';
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "translate-collect") {
        const selectedText = message.text;
        let selectData = {
            original:selectedText,
            translation:''
        }
        // 清除舊的對話框
        document.getElementById("translator-popup")?.remove();

        const popup = document.createElement("div");
        popup.id = "translator-popup";
        popup.style.cssText = `
        position: fixed;
        top: 0px;
        right: 40px;
        background: white;
        border: 1px solid #ccc;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        border-radius: 8px;
        padding: 12px;
        z-index: 99999;
        font-family: sans-serif;
        min-width: 200px;
        min-height:80px;
        max-width: 400px;
        max-height: 400px;
        overflow: auto;
      `;

        popup.innerHTML = `
        <div style="display:flex;">
            <div style="width:45%;padding:5px;border-right:1px solid #333;font-size:18px;"><strong></strong>${selectedText}</div>
            <div style="width:45%;padding:5px;padding-left: 10px;font-size:18px;" id='translated-text'><strong>${selectData.translation}</strong></div>
        </div>
        <button id="save-word" style="display: flex;align-items: center;cursor: pointer;background-color: #fff;border: 1px solid rgba(0, 0, 0, .12);border-radius: 50%;position:absolute;right:10px;top:5px;color:#f00;">
            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="TYVfy NMm5M"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"></path></svg>
        </button>
      `;
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=${encodeURIComponent(selectedText)}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const translated = data?.[0]?.map(part => part[0]).join("");
                selectData.translation = translated
                const translatedTextDom = popup.querySelector('#translated-text');
                translatedTextDom.innerText = translated || "無翻譯結果";
            })
            .catch(() => {
                // translatedTextDom.innerText = "翻譯錯誤";
            });
        document.body.appendChild(popup);

        // 點擊框外隱藏 popup 的邏輯
        function handleOutsideClick(event) {
            const popupEl = document.getElementById("translator-popup");
            if (popupEl && !popupEl.contains(event.target)) {
                popupEl.remove();
                document.removeEventListener("click", handleOutsideClick); // 清除事件監聽器
            }
        }
        // 延遲一點再加事件，避免馬上點擊觸發關閉
        setTimeout(() => {
            document.addEventListener("click", handleOutsideClick);
        }, 0);
        // 收藏按鈕點擊邏輯
        document.getElementById("save-word").addEventListener("click", () => {
            const url = `https://diy-learn-language-next-heaven-hub1s-projects.vercel.app/api/words`;
            let fetchOptions = {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            fetchOptions.body = JSON.stringify(selectData);
            fetch(url,fetchOptions);
        });
    }
});
