const path = require('path')
const { app, ipcMain } = require('electron')
const Tray = require('./app/TimerTray')
const MainWindow = require('./app/MainWindow')

let mainWindow
let tray

app.on('ready', () => {
  app.dock && app.dock.hide()

  const mainWindowConfig = {
    width: 300,
    height: 500,
    frame: false,
    resizable: false,
    show: false
  }
  const mainWindowUrl = `file://${__dirname}/src/index.html`

  mainWindow = MainWindow(mainWindowConfig, mainWindowUrl)

  const iconName = process.platform === 'darwin' ? 'iconTemplate.png' : 'windows-icon.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
  tray = Tray(iconPath, mainWindow)
})