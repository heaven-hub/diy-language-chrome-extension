chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "my-custom-option",
        title: "🌟 執行自定義功能",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "my-custom-option") {
        // 對當前頁面注入一段代碼
        chrome.tabs.sendMessage(tab.id, {
            action: "translate",
            text: info.selectionText
        });
    }
});

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//     if (info.menuItemId === "my-custom-option") {
//       const selectedText = info.selectionText;
//       const url = `https://translate.google.com/?sl=auto&tl=zh-CN&text=${encodeURIComponent(selectedText)}&op=translate`;

//       chrome.tabs.create({ url });
//     }
//   });

// chrome.contextMenus.onClicked.addListener(async (info, tab) => {
//     if (info.menuItemId === "my-custom-option") {
//         await chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             func: (text) => {
//                 window.dispatchEvent(new CustomEvent("trigger-translation", { detail: text }));
//             },
//             args: [info.selectionText]
//         });
//     }
// });