process.on('unhandledRejection', e => { throw e })

const { app } = require('electron')
const RPCGateway = require('./RPCGateway')
const JinseiProvider = require('./JinseiProvider')
const ImageAssetManager = require('./ImageAssetManager')
const TrayService = require('./TrayService')
const formatDuration = require('./formatDuration')
const config = require('../config')

let trayService = null;

(async () => {
  const rpcGateway = new RPCGateway(config.clientId)
  await rpcGateway.login()

  const updatePresence = () => {
    const elapsed = JinseiProvider.GetElapsed()
    const toNextBirthday = JinseiProvider.GetDurationToNextBirthday()

    const details = `🐣${formatDuration(elapsed)}経過`
    const state = toNextBirthday.valueOf() === 0 ? '🎉今日が誕生日です！' : `🎂誕生日まで${toNextBirthday.as('days')}日`

    const [largeImageKey, largeImageText] = ImageAssetManager.PickRandomAsset()

    rpcGateway.updateActivity({ details, state, largeImageKey, largeImageText })
  }
  const removePresence = () => {
    rpcGateway.clearActivity()
  }

  let interval = null

  const activate = () => {
    if (interval) clearInterval(interval)
    interval = setInterval(updatePresence, 15 * 1000)
    updatePresence()
  }
  const deactivate = () => {
    if (interval) clearInterval(interval)
    interval = null
    removePresence()
  }
  const quit = () => {
    rpcGateway.destroy()
    app.quit()
  }

  activate()

  trayService = new TrayService()

  trayService.on('turnOn', activate)
  trayService.on('turnOff', deactivate)
  trayService.on('quit', quit)

  trayService.start()
})()
