const path = require('path')
const { app, BrowserWindow, Tray, Menu } = require('electron')

let mainWindow
let tray

const setWindowPosition = bounds => {
  const { x, y } = bounds
  const { height, width } = mainWindow.getBounds()

  switch (process.platform) {
    case 'darwin':
      return { x: x - width/2, y, height, width }
    case 'win-32':
      return { x: x - width/2, y: y - height, height, width }
    default:
      return { x: 900, y: 0, height, width }
  }
}

const toggleTasky = (isWindowsVisible, bounds) => {
  if (isWindowsVisible) {
    return mainWindow.hide()
  }

  mainWindow.setBounds(setWindowPosition(bounds))
  return mainWindow.show()
}

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
  tray = new Tray(iconPath)

  tray.on('click', (event, bounds) => {
    toggleTasky(mainWindow.isVisible(), bounds)
  })
})