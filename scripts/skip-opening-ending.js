
function skipOEStart() {
    chrome.storage.sync.get("skipOEEnabled", (data) => {
        let isEnabled = data.skipOEEnabled || false;
        if(isEnabled){
           let openingTimeStart = document.getElementById("openingTimeStart");
           console.log('openingTimeStart',openingTimeStart)
        }
    });
}
chrome.runtime.onMessage.addListener((message) => {
    if (message.type !== 'skipOE') return;
    skipOEStart()
});
skipOEStart()