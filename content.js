chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTabs") {
      chrome.tabs.query({ currentWindow: true }, function(tabs) {
        sendResponse(tabs);
      });
      return true; // Will respond asynchronously
    }
  });