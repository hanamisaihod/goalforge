
const path = require('path');
const {app, BrowserWindow, ipcMain, shell} = require('electron');
const os = require('os');
const fs = require('fs');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwinn';

let mainWindow;


function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'Goal Forge',
        width: isDev ? 1500 : 500,
        height: 500,
        'minWidth': 1500,
        'minHeight': 500,
        'maxWidth': 500,
        'maxHeight': 500,
        
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // open dev tool if in dev env
    if (isDev) {
        mainWindow.webContents.openDevTools();
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

// Listen form data from renderer
ipcMain.on('addQuest', (event, formData) => {
    //console.log('Form data received', formData);


    // %APPDATA%/{YourAppName}/file.json
    const filePath = path.join(app.getPath('userData'), 'questData.json');

    //console.log('Form data received', formData);
    //console.log('File path: ', filePath);
     // Read existing data
     let previousQuestData = [];
     try {
        previousQuestData = JSON.parse(fs.readFileSync(filePath));
     } catch (error) {
         console.error('Error reading file:', error);
     }
 
     // Add new entry
     previousQuestData.push(formData);
 
     // Write updated data back to file
     fs.writeFileSync(filePath, JSON.stringify(previousQuestData, null, 4));

 
     //event.sender.send('formSaved');
     
     //shell.openPath(filePath);
});

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
});