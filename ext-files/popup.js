'use strict';

function unhide(e) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: `wnf__UNHIDE`});
  });
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var unhideBtn = document.querySelector('#unhide');
  unhideBtn.addEventListener('click', unhide);
});
