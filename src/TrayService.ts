import { EventEmitter } from 'events'
import path from 'path'
import { app, Menu, Tray } from 'electron'

class TrayService extends EventEmitter {
  static readonly iconPath = path.join(__dirname, '../assets/icon.png')

  private tray?: Tray

  start(): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    app.whenReady().then(() => {
      this.handleAppReady()
    })
  }

  private generateTurnedOnMenu(): Menu {
    return Menu.buildFromTemplate([
      { label: 'ON', type: 'radio', checked: true },
      { label: 'OFF', type: 'radio', click: this.handleOffClick.bind(this) },
      { type: 'separator' },
      { label: 'Quit', type: 'normal', click: this.handleQuitClick.bind(this) }
    ])
  }

  private generateTurnedOffMenu(): Menu {
    return Menu.buildFromTemplate([
      { label: 'ON', type: 'radio', click: this.handleOnClick.bind(this) },
      { label: 'OFF', type: 'radio', checked: true },
      { type: 'separator' },
      { label: 'Quit', type: 'normal', click: this.handleQuitClick.bind(this) }
    ])
  }

  private handleAppReady(): void {
    this.tray = new Tray(TrayService.iconPath)
    this.tray.setToolTip('discord-jinsei')
    this.tray.setContextMenu(this.generateTurnedOnMenu())
  }

  private handleOnClick(): void {
    this.tray?.setContextMenu(this.generateTurnedOnMenu())
    this.emit('turnOn')
  }

  private handleOffClick(): void {
    this.tray?.setContextMenu(this.generateTurnedOffMenu())
    this.emit('turnOff')
  }

  private handleQuitClick(): void {
    this.emit('quit')
  }
}

export default TrayService
