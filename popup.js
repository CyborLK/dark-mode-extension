document.addEventListener("DOMContentLoaded", () => {
  const toggleDarkModeCheckbox = document.getElementById("toggleDarkMode");
  const brightnessRange = document.getElementById("brightnessRange");
  const contrastRange = document.getElementById("contrastRange");

  // Initialize the UI based on stored values
  chrome.storage.sync.get(["darkMode", "brightness", "contrast"], (data) => {
    toggleDarkModeCheckbox.checked = data.darkMode || false;
    brightnessRange.value = data.brightness || 100;
    contrastRange.value = data.contrast || 100;
  });

  // Add event listener to handle the dark mode toggle action
  toggleDarkModeCheckbox.addEventListener("change", () => {
    const newDarkMode = toggleDarkModeCheckbox.checked;
    chrome.storage.sync.set({ darkMode: newDarkMode }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: toggleDarkMode,
            args: [newDarkMode]
          });
        }
      });
    });
  });

  // Add event listener to handle brightness adjustment
  brightnessRange.addEventListener("input", () => {
    const newBrightness = brightnessRange.value;
    chrome.storage.sync.set({ brightness: newBrightness }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: setBrightness,
            args: [newBrightness]
          });
        }
      });
    });
  });

  // Add event listener to handle contrast adjustment
  contrastRange.addEventListener("input", () => {
    const newContrast = contrastRange.value;
    chrome.storage.sync.set({ contrast: newContrast }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: setContrast,
            args: [newContrast]
          });
        }
      });
    });
  });
});

function toggleDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add("dark-mode");
  } else {
    document.documentElement.classList.remove("dark-mode");
  }
}

function setBrightness(brightness) {
  document.documentElement.style.filter = `brightness(${brightness}%)`;
}

function setContrast(contrast) {
  document.documentElement.style.filter = `contrast(${contrast}%)`;
}
