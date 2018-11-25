const config = require('../config')

class ImageAssetManager {
  static _PickRandomItemFromArray (array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  static PickRandomAsset () {
    return this._PickRandomItemFromArray(Object.entries(this.imageAssets))
  }
}

ImageAssetManager.imageAssets = config.imageAssets

module.exports = ImageAssetManager
