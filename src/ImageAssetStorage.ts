import pickRandom from './pickRandom'

class ImageAssetStorage {
  constructor(private readonly assetKeyList: string[]) {}

  pickOne(): string {
    return pickRandom(this.assetKeyList)
  }
}

export default ImageAssetStorage
