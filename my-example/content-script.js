console.log('content-script');

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log('content-script received message', message, sender);
});

// 切换域名
const { hostname } = location;
chrome.runtime.sendMessage({ type: 'switchHostName', data: { hostname } });

// 点击页面a链接
window.addEventListener('click', notifyExtension, false);
function notifyExtension(e) {
  if (e.target.tagName != 'A') {
    return;
  }
  chrome.runtime.sendMessage({ type: 'click', data: { href: e.target.href } });
}
