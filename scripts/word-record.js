function handleRecord(originalInput,translationInput,recorderBtn){
    originalInput.addEventListener('keyup',(e)=>{
        if(e.keyCode === 13){
            originalInput.blur()
            translationInput.focus()
        }
    })
    translationInput.addEventListener('keyup',async (e)=>{
        if(e.keyCode === 13){
            let data = {
                original:originalInput.value,
                translation:translationInput.value || ''
            }
            sendDataToApi(data)
            originalInput.value = ''
            translationInput.value = ''
        }
    })
    recorderBtn.addEventListener('click',async ()=>{
        let data = {
            original:originalInput.value,
            translation:translationInput.value || ''
        }
        sendDataToApi(data)
        originalInput.value = ''
        translationInput.value = ''
    })
}
function sendDataToApi({original,translation}){
    const url = `https://diy-learn-language-next-heaven-hub1s-projects.vercel.app/api/words`;
    let inputData = {
        original,
        translation
    }
    let fetchOptions = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetchOptions.body = JSON.stringify(inputData);
    return fetch(url,fetchOptions);
}
function recorderStart() {
    chrome.storage.sync.get("recorderEnabled", (data) => {
        let isEnabled = data.recorderEnabled || false;
        const id = "diy-recorder-overlay";
        if (isEnabled) {
            if (document.getElementById(id)) return;
            const recorderBox = document.createElement("div");
            const recorderHandle = document.createElement("div");
            const originalInput = document.createElement("input");
            const translationInput = document.createElement("input");
            const recorderBtn = document.createElement("div");
            originalInput.autocomplete = 'off';
            translationInput.autocomplete = 'off';
            originalInput.placeholder = chrome.i18n.getMessage('record_original_input_ph');
            translationInput.placeholder = chrome.i18n.getMessage('record_translation_input_ph');
            recorderBox.id = id;
            recorderBox.style.cssText = `
                position: fixed;
                top: 100px;
                left: 100px;
                width: 400px;
                min-height: 150px;
                background: rgba(0,0,0, 0.2);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.4);
                border-radius: 8px;
                z-index: 999999;
                overflow: auto;
                display:flex;
                flex-direction:column;
            `;
            recorderHandle.id = `${id}-recorderHandle`
            recorderHandle.style.cssText = `
                visibility: hidden;
                width:100%;
                height:20px;
                cursor: move;
                background: rgba(17,174,236, 0.4);
            `
            let inputStyle = `
                width:100%;
                margin:10px;
                border-radius: 5px;
                outline: none;
                border: 1px solid transparent;
                padding: 5px 7px;
                width: 80%;
                overflow:hidden;
                background:#fff;
            `;
            originalInput.id = 'original-input';
            originalInput.style.cssText = inputStyle;
            translationInput.id = 'translation-input';
            translationInput.style.cssText = inputStyle;
            recorderBtn.id = 'recorder-btn';
            recorderBtn.style.cssText = `
                align-self: flex-end;
                padding:7px 10px;
                font-size:14px;
                background: rgba(17,174,236, 0.7);
                border-radius: 5px;
                color:#fff;
                cursor:pointer;
                margin:10px;
            `;
            recorderBtn.innerText =  chrome.i18n.getMessage('common_sure_btn');

            if (!document.getElementById("recorder-style")) {
                const style = document.createElement("style");
                style.id = "recorder-style";
                style.textContent = `
                    #diy-recorder-overlay:hover #diy-recorder-overlay-recorderHandle {
                        visibility: visible !important;
                    }
                    #original-input:focus,#translation-input:focus {
                        border: 1px solid rgba(17, 174, 236, 0.6) !important;
                    }
                    #recorder-btn:active {
                        background: rgba(17,174,236, 1) !important;
                    }
                `;
                document.head.appendChild(style);
            }
            recorderBox.appendChild(recorderHandle)
            recorderBox.appendChild(originalInput)
            recorderBox.appendChild(translationInput)
            recorderBox.appendChild(recorderBtn)
            document.body.appendChild(recorderBox);
            handleRecord(originalInput,translationInput,recorderBtn)
            // recorderBtn.addEventListener('click',()=>{
            //     sendDataToApi({original:originalInput.value,translation:translationInput.value || ''})
            // })
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

