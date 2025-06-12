
function blockerStart() {
    chrome.storage.sync.get("glassEnabled", (data) => {
        let isEnabled = data.glassEnabled || false;
        const id = "diy-glass-overlay";
        if (isEnabled) {
            if (document.getElementById(id)) return;

            const glassBox = document.createElement("div");
            const glassHandle = document.createElement("div");
            glassBox.id = id;
            glassBox.style.cssText = `
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
            glassHandle.id = `${id}-glassHandle`
            glassHandle.style.cssText = `
                        display:none;
                        width:100%;
                        height:20px;
                        cursor: move;
                        background: rgba(17,174,236, 0.4);
                    `
            if (!document.getElementById("glass-style")) {
                const style = document.createElement("style");
                style.id = "glass-style";
                style.textContent = `
                            #diy-glass-overlay:hover #diy-glass-overlay-glassHandle {
                                display:block !important;
                            }
                        `;
                document.head.appendChild(style);
            }
            glassBox.appendChild(glassHandle)
            document.body.appendChild(glassBox);

            // 拖動功能
            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;

            glassHandle.addEventListener("mousedown", (e) => {
                if (e.target !== glassHandle) return; // 只允許拖動區域在

                isDragging = true;
                offsetX = e.clientX - glassBox.offsetLeft;
                offsetY = e.clientY - glassBox.offsetTop;
                e.preventDefault();
            });

            document.addEventListener("mousemove", (e) => {
                if (!isDragging) return;
                glassBox.style.left = `${e.clientX - offsetX}px`;
                glassBox.style.top = `${e.clientY - offsetY}px`;
            });

            document.addEventListener("mouseup", () => {
                isDragging = false;
            });
        } else {
            const glassBox = document.getElementById(id);
            if (glassBox) {
                glassBox.remove();
            }
        }
    });
}
chrome.runtime.onMessage.addListener((message) => {
    if(message.type !== 'glass') return;
    console.log('glass',message)
    blockerStart()
});
blockerStart()

