
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