let hotkeyListener = null;
let videoTimeNodeList = []
let startTime = 0
let endTime = 0
let isLooping = false
function loopVideoSegment({video, startTime = 0, endTime, repeatCount = 5,endLoop}) {
    let loopCounter = 0;
    const onTimeUpdate = () => {
        if (video.currentTime >= endTime) {
            loopCounter++;
            if (loopCounter >= repeatCount) {
                video.pause();
                video.removeEventListener("timeupdate", onTimeUpdate);
                console.log("播放完成");
                isLooping = false
            } else {
                video.currentTime = startTime;
                video.play();
            }
        }
    };
    if(endLoop){
        video.pause();
        video.removeEventListener("timeupdate", onTimeUpdate);
        console.log("播放完成");
        isLooping = false
        return
    }
    // 初始化
    video.currentTime = startTime;
    video.play();
    isLooping = true
    // 每次時間更新時檢查
    video.addEventListener("timeupdate", onTimeUpdate);
}
function start() {
    chrome.storage.sync.get("videoEnabled", (data) => {
        console.log('data',data)
        if (!data.videoEnabled) return;
        if (!hotkeyListener) {
            hotkeyListener = (e) => {
                const video = document.querySelector("video");
                console.log('ek',e)
                if(e.shiftKey && e.key.toLowerCase() === "z"){
                    let currentTime = video.currentTime
                    startTime = currentTime
                    video.play();
                }
                if (e.shiftKey && e.key.toLowerCase() === "x" && !isLooping) {
                    let currentTime = video.currentTime
                    endTime = currentTime
                    loopVideoSegment({video,startTime,endTime,repeatCount:5})
                }
                if (e.shiftKey && e.key.toLowerCase() === "c") {
                    loopVideoSegment({video,endLoop:true})
                }
            };
            window.addEventListener("keydown", hotkeyListener);
        }
    })
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    start()
});
// chrome.runtime.onMessage.addListener((message) => {
//     if (message.action) {
//         start()
//     } else {
//         if (hotkeyListener) {
//             window.removeEventListener("keydown", hotkeyListener);
//             hotkeyListener = null;
//         }
//     }
// });
start()


