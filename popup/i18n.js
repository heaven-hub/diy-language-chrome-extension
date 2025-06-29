document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('popup-title').innerHTML = chrome.i18n.getMessage('application_title');
    document.getElementById('popup-desc').innerHTML = chrome.i18n.getMessage('application_description');
    document.getElementById('video-label').innerHTML = chrome.i18n.getMessage('fun_video_label');
    document.getElementById('blocker-label').innerHTML = chrome.i18n.getMessage('subtitle_blocker');
    document.getElementById('video-shotcut-key').innerHTML = chrome.i18n.getMessage('video_shotcut_key');
    document.getElementById('video-repeat-count').innerHTML = chrome.i18n.getMessage('video_repeat_count');

    document.getElementById('recorder-label').innerHTML = chrome.i18n.getMessage('recorder_label');
    document.getElementById('opening-ending-switch-label').innerHTML = chrome.i18n.getMessage('skip_opening_ending_label');
    document.getElementById('opening-label').innerHTML = chrome.i18n.getMessage('skip_opening_label');
    document.getElementById('ending-label').innerHTML = chrome.i18n.getMessage('skip_ending_label');

});