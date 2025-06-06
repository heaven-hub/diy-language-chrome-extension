chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "my-custom-option",
        title: "🌟 執行自定義功能",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "my-custom-option") {
        // 對當前頁面注入一段代碼
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                alert("你點了自定義右鍵功能！");
            }
        });
    }
});
