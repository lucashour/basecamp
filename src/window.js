const path = require("path");
const { BrowserWindow } = require("electron");

exports.createBrowserWindow = (app) => {
  const browserWindow = new BrowserWindow({
    icon: path.join(__dirname, "assets/icons/logo.png"),
    backgroundColor: "#fff",
    webPreferences: {
      contextIsolation: true,
      devTools: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "../preload.js"),
      webviewTag: true,
    },
  });

  browserWindow.maximize();

  return browserWindow;
};
