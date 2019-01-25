const { Tray, Menu, app } = require('electron')

const setWindowPosition = (mainWindow, bounds = { x: 0, y: 0 }) => {
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

const toggleTasky = (mainWindow, bounds) => {
  if (mainWindow.isVisible()) {
    return mainWindow.hide()
  }

  mainWindow.setBounds(setWindowPosition(mainWindow, bounds))
  return mainWindow.show()
}

const TimerTray = (iconPath, mainWindow) => {
  const tray = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Tasky',
      click: () => toggleTasky(mainWindow)
    },
    {
      label: 'Quit',
      click: () => app.quit()
    }
  ])

  tray.setToolTip('Tasky')
  tray.setContextMenu(contextMenu)

  return tray
}

module.exports = TimerTray