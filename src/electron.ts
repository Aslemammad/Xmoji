/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, Menu, globalShortcut, Tray } = require('electron');
const path = require('path');
const robotjs = require('robotjs');
const isDev = process.env.ELECTRON_ENV === 'development';
isDev && require('electron-reload')(__dirname);
const createWindow = (emoji: boolean, x: number, y: number) => {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    height: emoji ? 480 : 500, // to check if it is a shortcut
    width: emoji ? 450 : 500,
    webPreferences: {
      // preload : path.join(__dirname, '/js/preload.js')
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true,
    },
    resizable: isDev ? true : false,
    frame: !emoji ? true : false,
    icon: path.join(__dirname, '../build/icon.png'),
  });

  emoji && mainWindow.setPosition(x, y);

  // and load the index.html of the app.
  const route = emoji ? '#/tab' : '';
  mainWindow.loadURL(
    isDev ? `http://localhost:5006${route}` : `file://${path.join(__dirname, '../build/index.html')}${route}`,
  );
  route && mainWindow.on('blur', () => mainWindow.close());

  // Open the DevTools.
  // isDev &&
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

let appTray;

app.allowRendererProcessReuse = false;

app.on('ready', () => {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => {
        createWindow(false, 0, 0);
      },
    },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      },
    },
  ]);
  appTray = new Tray(`${path.join(__dirname, 'icon.png')}`);
  appTray.setContextMenu(contextMenu);

  const emojiShortcut = globalShortcut.register('Control+Command+Space', () => {
    const mousePosition = robotjs.getMousePos();
    createWindow(true, Math.floor(mousePosition.x), Math.floor(mousePosition.y));
  });

  Menu.setApplicationMenu(null);
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow(false, 0, 0);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
  }
});

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('Control+Command+Space');
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
export {};
