
const path = require('path');
const {app, BrowserWindow} = require('electron');
const os = require('os');
const fs = require('fs');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwinn';

let mainWindow;

function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'Goal Forge',
        width: /*isDev ? 1000 :*/ 500,
        height: 500,
        'minWidth': 500,
        'minHeight': 500,
        'maxWidth': 500,
        'maxHeight': 500,
        
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            //preload: path.join(__dirname, 'preload.js')
        }
    });
    // open dev tool if in dev env
    if (isDev) {
        //mainWindow.webContents.openDevTools();
    }
    // Load front end into this window
    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
    // disable default menu
    mainWindow.setMenu(null);
}

// Create mainWindow when ready
app.whenReady().then(() => {
    createMainWindow();

    // Remove mainWindow from memory on close
    mainWindow.on('close', () => (mainWindow = null));

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
        })
});



app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
});