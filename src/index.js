process.on('unhandledRejection', e => { throw e })

const RPCGateway = require('./RPCGateway')
const JinseiProvider = require('./JinseiProvider')
const ImageAssetManager = require('./ImageAssetManager')
const config = require('../config');

(async () => {
  const rpcGateway = new RPCGateway(config.clientId)
  await rpcGateway.login()

  const action = () => {
    const elapsed = JinseiProvider.GetElapsed()
    const [largeImageKey, largeImageText] = ImageAssetManager.PickRandomAsset()

    rpcGateway.updateActivity({
      state: elapsed.toFormat('y年Mヶ月d日経過'),
      largeImageKey,
      largeImageText
    })
  }

  setInterval(action, 1000 * 15)
  action()
})()
