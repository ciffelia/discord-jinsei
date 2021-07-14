const pickRandom = require('./pickRandom')

class ImageAssetStorage {
  constructor (assets) {
    this.assets = assets
  }

  pickOne () {
    return pickRandom(this.assets)
  }
}

module.exports = ImageAssetStorage
