const path = require("path");
const { BrowserWindow } = require("electron");

exports.createBrowserWindow = (app) => {
  return new BrowserWindow({
    width: 1024,
    height: 768,
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
};
