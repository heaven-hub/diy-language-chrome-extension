chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "custom-option-collect",
        title: chrome.i18n.getMessage('custom_contextMenu_collect'),
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "custom-option-collect") {
        // 對當前頁面注入一段代碼
        chrome.tabs.sendMessage(tab.id, {
            action: "translate-collect",
            text: info.selectionText
        });
    }
});