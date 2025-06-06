export function getI18nMessage(eleId, msgName) {
    document.getElementById(eleId).innerHTML = chrome.i18n.getMessage(msgName);
}