const path = require("path");
const fs = require("fs");
const {
  app,
  clipboard,
  Menu,
  MenuItem,
  shell,
  Tray,
} = require("electron");

const contextualMenu = new Menu();

let isQuiting;
let tray;

app.allowRendererProcessReuse = true;

const setupWindow = (app) => {
  const window = require("./src/window");
  const mainWindow = window.createBrowserWindow(app);

  mainWindow.loadURL("https://basecamp.com");

  const menu = require("./src/menu");
  const template = menu.createTemplate(app.name);
  const builtMenu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(builtMenu);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) {
      shell.openExternal(url);
    }

    return { action: "deny" };
  });

  mainWindow.on("close",(event) => {
    if (!isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      event.returnValue = false;
    }
  });

  contextualMenu.append(new MenuItem({
    label: "Copy current URL to clipboard",
    click: () => {
      clipboard.writeText(mainWindow.webContents.getURL());
    },
  }));

  return mainWindow;
};

const setupTray = (app, mainWindow) => {
  tray = new Tray(path.join(__dirname, "/assets/icons/tray.png"));

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: "Open", click: () => {
        debugger;
        mainWindow.show();
      }
    },
    {
      label: "Quit", click: () => {
        isQuiting = true;
        app.quit();
      }
    },
  ]));
};

app.on("ready", () => {
  const mainWindow = setupWindow(app);

  setupTray(app, mainWindow);
});

app.on("web-contents-created", (...[event, webContents]) => {
  webContents.on("context-menu", (event, click) => {
    event.preventDefault();
    contextualMenu.popup(webContents);
  }, false);
});

app.on("before-quit", () => {
  isQuiting = true;
});

