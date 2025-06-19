
function collectStart() {
    chrome.storage.sync.get("collectEnabled", (data) => {
        let isEnabled = data.collectEnabled || false;
        const id = "diy-collect-overlay";
        if (isEnabled) {
            if (document.getElementById(id)) return;

            const collectBox = document.createElement("div");
            const collectHandle = document.createElement("div");
            collectBox.id = id;
            collectBox.style.cssText = `
                        position: fixed;
                        top: 100px;
                        left: 100px;
                        width: 200px;
                        height: 150px;
                        background: rgba(0,0,0, 0.2);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.4);
                        border-radius: 8px;
                        z-index: 999999;
                        resize: both;
                        overflow: auto;
                    `;
            collectHandle.id = `${id}-collectHandle`
            collectHandle.style.cssText = `
                        display:none;
                        width:100%;
                        height:20px;
                        cursor: move;
                        background: rgba(17,174,236, 0.4);
                    `

            if (!document.getElementById("collect-style")) {
                const style = document.createElement("style");
                style.id = "collect-style";
                style.textContent = `
                            #diy-collect-overlay:hover #diy-collect-overlay-collectHandle {
                                display:block !important;
                            }
                        `;
                document.head.appendChild(style);
            }
            collectBox.appendChild(collectHandle)
            document.body.appendChild(collectBox);

            // 拖動功能
            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;

            collectHandle.addEventListener("mousedown", (e) => {
                if (e.target !== collectHandle) return; // 只允許拖動區域在

                isDragging = true;
                offsetX = e.clientX - collectBox.offsetLeft;
                offsetY = e.clientY - collectBox.offsetTop;
                e.preventDefault();
            });

            document.addEventListener("mousemove", (e) => {
                if (!isDragging) return;
                collectBox.style.left = `${e.clientX - offsetX}px`;
                collectBox.style.top = `${e.clientY - offsetY}px`;
            });

            document.addEventListener("mouseup", () => {
                isDragging = false;
            });
        } else {
            const collectBox = document.getElementById(id);
            if (collectBox) {
                collectBox.remove();
            }
        }
    });
}
chrome.runtime.onMessage.addListener((message) => {
    if(message.type !== 'collect') return;
    console.log('collect',message)
    collectStart()
});
collectStart()