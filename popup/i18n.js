document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('popup-title').innerHTML = chrome.i18n.getMessage('application_title');
    document.getElementById('popup-desc').innerHTML = chrome.i18n.getMessage('application_description');
    document.getElementById('video-label').innerHTML = chrome.i18n.getMessage('fun_video_label');
    document.getElementById('blocker-label').innerHTML = chrome.i18n.getMessage('subtitle_blocker');
    document.getElementById('video-shotcut-key').innerHTML = chrome.i18n.getMessage('video_shotcut_key');
    document.getElementById('video-repeat-count').innerHTML = chrome.i18n.getMessage('video_repeat_count');

});