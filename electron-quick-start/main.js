// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')
const log = require('electron-log')
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  // and load the index.html of the app.
  mainWindow.loadFile('./dist/index.html')
  mainWindow.setFullScreen(true)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}
// use webgup
// ./node_modules/.bin/electron-rebuild -w dawn
app.commandLine.appendSwitch('enable-unsafe-webgpu')
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
app.on('render-process-gone', (e, w, d) => {
  log.error(d)
  log.error(`webcontents实例${!!w ? '还' : '不'}存在，${new Date()}渲染进程被杀死${d.reason}\n`)
  if (d.reason == 'crashed') {
    w.reload()
  } else {
    w?.reload()
    fs.appendFileSync('./log.txt', `webcontents实例${!!w ? '还' : '不'}存在，${new Date()}渲染进程被杀死${d.reason}\n`)
  }
})
app.on('child-process-gone', (e, d) => {
  log.error(d)
  log.error(`${new Date()}子进程${d.name}崩溃或被杀死,类型：${d.type},原因：${d.reason}\n`)
  fs.appendFileSync('./child-process-log.txt', `${new Date()}子进程${d.name}崩溃或被杀死,类型：${d.type},原因：${d.reason}\n`)
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
