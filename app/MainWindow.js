const { BrowserWindow } = require('electron')

const mainWindow = (options, url) => {
  const window = new BrowserWindow(options)
  window.loadURL(url)
  window.on('blur', () => window.hide())

  return window
}

module.exports = mainWindow