import { MSG_DISABLE_EXT, MSG_ENABLE_EXT, MSG_UPDATE_BADGE } from './app/constants';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === MSG_UPDATE_BADGE) {
        chrome.browserAction.setBadgeText({ tabId: sender.tab.id, text: request.text }, function() {
            sendResponse({ message: request });
        });
    }
    return true;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === MSG_ENABLE_EXT) {
        chrome.browserAction.setBadgeText({ tabId: sender.tab.id, text: '' }, function() {
            sendResponse({ message: request });
        });
    }
    return true;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === MSG_DISABLE_EXT) {
        chrome.browserAction.setBadgeText({ tabId: sender.tab.id, text: 'OFF' }, function() {
            chrome.browserAction.setBadgeBackgroundColor({ color: '#898989', tabId: sender.tab.id }, function() {
                sendResponse({ message: request });
            });
        });
    }
    return true;
});
