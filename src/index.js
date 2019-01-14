process.on('unhandledRejection', e => { throw e })

const RPCGateway = require('./RPCGateway')
const JinseiProvider = require('./JinseiProvider')
const ImageAssetManager = require('./ImageAssetManager')
const formatDuration = require('./formatDuration')
const config = require('../config');

(async () => {
  const rpcGateway = new RPCGateway(config.clientId)
  await rpcGateway.login()

  const action = () => {
    const elapsed = JinseiProvider.GetElapsed()
    const toNextBirthday = JinseiProvider.GetDurationToNextBirthday()

    const details = `🐣${formatDuration(elapsed)}経過`
    const state = toNextBirthday.valueOf() === 0 ? `🎉今日が誕生日です！` : `🎂誕生日まで${formatDuration(toNextBirthday)}`

    const [largeImageKey, largeImageText] = ImageAssetManager.PickRandomAsset()

    rpcGateway.updateActivity({ details, state, largeImageKey, largeImageText })
  }

  setInterval(action, 1000 * 15)
  action()
})()
