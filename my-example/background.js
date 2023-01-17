import { locales } from './assets/localData.js';

chrome.runtime.onInstalled.addListener(() => {
  // 创建上下文菜单
  for (let [id, title] of Object.entries(locales)) {
    chrome.contextMenus.create({
      id,
      title,
      type: 'normal',
      contexts: ['selection'],
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const { selectionText, menuItemId } = info;
  chrome.tabs.create({
    index: tab.index + 1,
    url: `https://google.${menuItemId}/search?q=${selectionText}`,
  });
});

chrome.storage.onChanged.addListener(({ enabledTlds }) => {
  if (typeof enabledTlds === 'undefined') return;

  chrome.contextMenus.removeAll();
  const { newValue = [] } = enabledTlds;

  for (let [id, title] of Object.entries(locales)) {
    if (newValue.includes(id)) {
      chrome.contextMenus.create({
        id,
        title,
        type: 'normal',
        contexts: ['selection'],
      });
    }
  }
});

////////////////////【双向通信】////////////////////////

// Fired when a message is sent from either an extension process or a content script
chrome.runtime.onMessage.addListener((message, sender) => {
  console.log('background.js', message);

  // Sends a single message to the content script(s) in the specified tab
  if (sender.tab?.id) {
    chrome.tabs.sendMessage(sender.tab.id, { data: '我已经收到了' });
  }
});
