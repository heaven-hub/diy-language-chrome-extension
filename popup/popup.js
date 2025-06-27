
// 開啟視頻斷點
const videoSwitch = document.getElementById('videoSwitch')
chrome.storage.sync.get("videoEnabled", (data) => {
    videoSwitch.checked = data.videoEnabled || false;
});
videoSwitch.addEventListener("change", async () => {
    const isEnabled = videoSwitch.checked;
    chrome.storage.sync.set({ videoEnabled: isEnabled });

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, {
        type:'video',
        enabled: isEnabled
    });
});

//開啟毛玻璃遮擋
const blurGlassSwitch = document.getElementById("blurGlassSwitch");

chrome.storage.sync.get("glassEnabled", (data) => {
    blurGlassSwitch.checked = data.glassEnabled || false;
});

blurGlassSwitch.addEventListener("change", async () => {
    const isEnabled = blurGlassSwitch.checked;

    chrome.storage.sync.set({ glassEnabled: isEnabled });

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, {
        type:'glass',
        enabled: isEnabled
    });
});

//開啟單詞記錄
const recorderSwitch = document.getElementById("recorderSwitch");

chrome.storage.sync.get("recorderEnabled", (data) => {
    recorderSwitch.checked = data.recorderEnabled || false;
});

recorderSwitch.addEventListener("change", async () => {
    const isEnabled = recorderSwitch.checked;

    chrome.storage.sync.set({ recorderEnabled: isEnabled });

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, {
        type:'recorder',
        enabled: isEnabled
    });
});

//開啟跳過片頭片尾
const skipOESwitch = document.getElementById("skipOESwitch");
const skipOEItemsBox = document.getElementById("skipOEItemsBox");
let openingTimeStart = document.getElementById("openingTimeStart");
openingTimeStart.addEventListener('blur',()=>{
    console.log('openingTimeStart',openingTimeStart.value)
})
chrome.storage.sync.get("skipOEEnabled", (data) => {
    skipOESwitch.checked = data.skipOEEnabled || false;
    skipOEItemsBox.style = `
        display:${skipOESwitch.checked?'block':'none'}
    `
});

skipOESwitch.addEventListener("change", async () => {
    const isEnabled = skipOESwitch.checked;
    skipOEItemsBox.style = `
        display:${isEnabled?'block':'none'}
    `
    chrome.storage.sync.set({ skipOEEnabled: isEnabled });

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, {
        type:'skipOE',
        enabled: isEnabled
    });
});