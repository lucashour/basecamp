const path = require("path");
const fs = require("fs");

const {
  app,
  clipboard,
  Menu,
  MenuItem,
  shell,
} = require("electron");

const contextualMenu = new Menu();

app.allowRendererProcessReuse = true;

app.on("ready", () => {
  const window = require("./src/window");
  mainWindow = window.createBrowserWindow(app);

  mainWindow.loadURL("https://basecamp.com");

  const menu = require("./src/menu");
  const template = menu.createTemplate(app.name);
  const builtMenu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(builtMenu);

  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  contextualMenu.append(new MenuItem({
    label: 'Copy current URL to clipboard',
    click: () => {
      clipboard.writeText(mainWindow.webContents.getURL());
    },
  }));
});

app.on("web-contents-created", (...[event, webContents]) => {
  webContents.on("context-menu", (event, click) => {
    event.preventDefault();
    contextualMenu.popup(webContents);
  }, false);
});

app.on("window-all-closed", () => {
  app.quit();
});
