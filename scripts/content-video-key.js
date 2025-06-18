let videoTimeNodeList = []
let hotkeyListener = null;
let isLooping = false;
let globalStartTime = 0
let globalEndTime = 0
let onTimeUpdateRef = null
function loopVideoSegment({video, startTime = 0, endTime, repeatCount = 5,endLoop}) {
    if(endLoop){
        if (onTimeUpdateRef) {
            video.removeEventListener("timeupdate", onTimeUpdateRef);
            onTimeUpdateRef = null;
        }
        isLooping = false
        video.currentTime = globalEndTime;
        video.play();
        return
    }
    let loopCounter = 0;
    onTimeUpdateRef = () => {
        if (video.currentTime >= endTime) {
            loopCounter++;
            if (loopCounter >= repeatCount) {
                video.pause();
                video.removeEventListener("timeupdate", onTimeUpdateRef);
                onTimeUpdateRef = null
                console.log("播放完成");
                isLooping = false
            } else {
                video.currentTime = startTime;
                video.play();
            }
        }
    };
    // 初始化
    video.currentTime = startTime;
    video.play();
    isLooping = true
    // 每次時間更新時檢查
    video.addEventListener("timeupdate", onTimeUpdateRef);
}

function videoStart() {
    const video = document.querySelector("video");
    if(!video) return;
    chrome.storage.sync.get("videoEnabled", (data) => {
        console.log('data video',data)
        if (!data.videoEnabled) return;
        if (!hotkeyListener) {
            hotkeyListener = (e) => {
                const video = document.querySelector("video");
                if(!video) return;
                console.log('ek',e)
                if(e.key.toLowerCase() === "z"){
                    let currentTime = video.currentTime
                    globalStartTime = currentTime
                    video.play();
                }
                if (e.key.toLowerCase() === "x" && !isLooping) {
                    let currentTime = video.currentTime
                    globalEndTime = currentTime
                    loopVideoSegment({video,startTime:globalStartTime,endTime:globalEndTime,repeatCount:5})
                }
                if (e.key.toLowerCase() === "c") {
                    loopVideoSegment({video,endLoop:true})
                }
            };
            window.addEventListener("keydown", hotkeyListener);
            window.addEventListener("fullscreenchange", hotkeyListener);
        }
    })
}
chrome.runtime.onMessage.addListener((message) => {
    if(message.type !== 'video') return;
    if (message.enabled) {
        console.log('video',message)
        videoStart()
    } else {
        window.removeEventListener("keydown", hotkeyListener);
        hotkeyListener = null;
    }
});
videoStart()


