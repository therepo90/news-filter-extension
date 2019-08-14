chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'UPDATE_BADGE') {
        chrome.browserAction.setBadgeText({ tabId: sender.tab.id, text: request.text }, function() {
            sendResponse({ message: request });
        });
    }
    return true;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'ENABLE_EXT') {
        chrome.browserAction.setBadgeText({ tabId: sender.tab.id, text: '' }, function() {
            sendResponse({ message: request });
        });
    }
    return true;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'DISABLE_EXT') {
        chrome.browserAction.setBadgeText({ tabId: sender.tab.id, text: 'OFF' }, function() {
            chrome.browserAction.setBadgeBackgroundColor({ color: '#898989', tabId: sender.tab.id }, function() {
                sendResponse({ message: request });
            });
        });
    }
    return true;
});
