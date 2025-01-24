chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendCartItems") {
    console.log(`Cart items received from ${message.site}:`, message.items);
    console.log('Challa');
  }
});