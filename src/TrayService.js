const EventEmitter = require('events').EventEmitter
const path = require('path')
const { app, Menu, Tray } = require('electron')

class TrayService extends EventEmitter {
  constructor () {
    super()

    this._handleAppReady = this._handleAppReady.bind(this)
    this._handleOnClick = this._handleOnClick.bind(this)
    this._handleOffClick = this._handleOffClick.bind(this)
    this._handleQuitClick = this._handleQuitClick.bind(this)
  }

  start () {
    app.whenReady().then(() => {
      this._handleAppReady()
    })
  }

  _generateTurnedOnMenu () {
    return Menu.buildFromTemplate([
      { label: 'ON', type: 'radio', checked: true },
      { label: 'OFF', type: 'radio', click: this._handleOffClick },
      { type: 'separator' },
      { label: 'Quit', type: 'normal', click: this._handleQuitClick }
    ])
  }

  _generateTurnedOffMenu () {
    return Menu.buildFromTemplate([
      { label: 'ON', type: 'radio', click: this._handleOnClick },
      { label: 'OFF', type: 'radio', checked: true },
      { type: 'separator' },
      { label: 'Quit', type: 'normal', click: this._handleQuitClick }
    ])
  }

  _handleAppReady () {
    this.tray = new Tray(TrayService._iconPath)
    this.tray.setToolTip('discord-jinsei')
    this.tray.setContextMenu(this._generateTurnedOnMenu())
  }

  _handleOnClick () {
    this.tray.setContextMenu(this._generateTurnedOnMenu())
    this.emit('turnOn')
  }

  _handleOffClick () {
    this.tray.setContextMenu(this._generateTurnedOffMenu())
    this.emit('turnOff')
  }

  _handleQuitClick () {
    this.emit('quit')
  }
}

TrayService._iconPath = path.join(__dirname, '../assets/icon.png')

module.exports = TrayService
