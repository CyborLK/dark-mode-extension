chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ darkMode: false });
  console.log("Dark Mode extension installed");
});
