const path = require('path')
const { app, BrowserWindow } = require('electron')
const Tray = require('./app/TimerTray')

let mainWindow
let tray

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    frame: false,
    resizable: false,
    show: false
  })
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

  const iconName = process.platform === 'darwin' ? 'iconTemplate.png' : 'windows-icon.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
  tray = Tray(iconPath, mainWindow)
})