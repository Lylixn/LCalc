// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, remote} = require('electron')
const path = require('path')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS']=true

class App {

  constructor() {

    this.listeners()

  }

  createWindow () {
    // Create the browser window.
    let mainWindow = new BrowserWindow({
      autoHideMenuBar: true,
      width: 500,
      minWidth: 500,
      height: 600,
      minHeight: 600,
      frame: false,
      icon: 'icon_lesio.png',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      }
    })

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'web/index.html'))


    return mainWindow
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
  }

  listeners(){
    app.whenReady().then(() => {
      this.mainWindow = this.createWindow()

      app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
    })

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    ipcMain.on('close', () => {
      this.mainWindow.close()
    })

    ipcMain.on('fullscreen', () => {
      if (!this.mainWindow.isMaximized()) {
        this.mainWindow.maximize();
      } else {
        this.mainWindow.unmaximize();
      }
    })

    ipcMain.on('minimize', () => {
      this.mainWindow.minimize()
    })
  }

}

new App()