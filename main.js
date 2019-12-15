const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const os = require('os')
const { autoUpdater } = require("electron-updater")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1600,
        height: 910,
        titleBarStyle: 'hiddenInset',
        webSecurity: false,
        show: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile(`${__dirname}/dist/infowars-desktop/index.html`)

    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools()
    } else {
        console.log('Running in production');
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    win.once('ready-to-show', () => {
        win.show()
        if (process.platform === 'win32'){
            win.removeMenu();
        }
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow()
    autoUpdater.checkForUpdatesAndNotify()
})

ipcMain.on('quit-and-install', (event) => {
    autoUpdater.quitAndInstall(isSilent=true, isForceRunAfter=true)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

autoUpdater.on('update-not-available', (info) => {
    console.log('update not available')
})

autoUpdater.on('update-available', (info) => {
    win.webContents.send('update-available')
})

autoUpdater.on('update-downloaded', (info) => {
    win.webContents.send('update-downloaded')
})

autoUpdater.on('error', (err) => {
    console.log('Error in auto-updater. ' + err)
})

autoUpdater.on('download-progress', (progressObj) => {
    // let log_message = "Download speed: " + progressObj.bytesPerSecond
    // log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
    // log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
    // dispatch(log_message)

})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.