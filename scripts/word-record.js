
function recorderStart() {
    chrome.storage.sync.get("recorderEnabled", (data) => {
        let isEnabled = data.recorderEnabled || false;
        const id = "diy-recorder-overlay";
        if (isEnabled) {
            if (document.getElementById(id)) return;

            const recorderBox = document.createElement("div");
            const recorderHandle = document.createElement("div");
            const recorderInput = document.createElement("input");
            const recorderBtn = document.createElement("div");
            recorderBox.id = id;
            recorderBox.style.cssText = `
                position: fixed;
                top: 100px;
                left: 100px;
                width: 400px;
                height: 150px;
                background: rgba(0,0,0, 0.2);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.4);
                border-radius: 8px;
                z-index: 999999;
                overflow: auto;
            `;
            recorderHandle.id = `${id}-recorderHandle`
            recorderHandle.style.cssText = `
                visibility: hidden;
                width:100%;
                height:20px;
                cursor: move;
                background: rgba(17,174,236, 0.4);
            `
            recorderInput.id = 'recorder-input';
            recorderInput.style.cssText = `
                width:100%;
                margin:10px;
                border-radius: 5px;
                outline: none;
                border: 1px solid transparent;
                padding: 5px 7px;
                width: 80%;
                overflow:hidden;
            `;
            recorderBtn.id = 'recorder-btn';
            recorderBtn.style.cssText = `
                position:absolute;
                right:10px;
                bottom:15px;
                padding:7px 10px;
                font-size:14px;
                background: rgba(17,174,236, 0.7);
                border-radius: 5px;
                color:#fff;
                cursor:pointer;
            `;
            recorderBtn.innerText =  chrome.i18n.getMessage('common_sure_btn');

            if (!document.getElementById("recorder-style")) {
                const style = document.createElement("style");
                style.id = "recorder-style";
                style.textContent = `
                    #diy-recorder-overlay:hover #diy-recorder-overlay-recorderHandle {
                        visibility: visible !important;
                    }
                    #recorder-input:focus {
                        border: 1px solid rgba(17, 174, 236, 0.6) !important;
                    }
                    #recorder-btn:active {
                        background: rgba(17,174,236, 1) !important;
                    }
                `;
                document.head.appendChild(style);
            }
            recorderBox.appendChild(recorderHandle)
            recorderBox.appendChild(recorderInput)
            recorderBox.appendChild(recorderBtn)
            document.body.appendChild(recorderBox);

            // 拖動功能
            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;

            recorderHandle.addEventListener("mousedown", (e) => {
                if (e.target !== recorderHandle) return; // 只允許拖動區域在

                isDragging = true;
                offsetX = e.clientX - recorderBox.offsetLeft;
                offsetY = e.clientY - recorderBox.offsetTop;
                e.preventDefault();
            });

            document.addEventListener("mousemove", (e) => {
                if (!isDragging) return;
                recorderBox.style.left = `${e.clientX - offsetX}px`;
                recorderBox.style.top = `${e.clientY - offsetY}px`;
            });

            document.addEventListener("mouseup", () => {
                isDragging = false;
            });
        } else {
            const recorderBox = document.getElementById(id);
            if (recorderBox) {
                recorderBox.remove();
            }
        }
    });
}
chrome.runtime.onMessage.addListener((message) => {
    if(message.type !== 'recorder') return;
    recorderStart()
});
recorderStart()

