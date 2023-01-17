console.log('content-script');

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log('chrome.runtime.onMessage', message, sender);
});

const { hostname } = location;
chrome.runtime.sendMessage({ type: 'switchHostName', hostname });
