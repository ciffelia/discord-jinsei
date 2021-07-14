import { app } from 'electron'
import DiscordRPC from 'discord-rpc'
import Jinsei from './Jinsei'
import ImageAssetStorage from './ImageAssetStorage'
import { Config } from './Config'
import loginRPC from './loginRPC'
import formatDuration from './formatDuration'

class DiscordJinsei {
  private rpcClient: DiscordRPC.Client | null
  private readonly jinsei: Jinsei
  private readonly assetStorage: ImageAssetStorage
  private interval: NodeJS.Timeout | null

  constructor (private readonly config: Config) {
    this.rpcClient = null
    this.jinsei = new Jinsei(config.birth)
    this.assetStorage = new ImageAssetStorage(config.imageAssets)
    this.interval = null
  }

  async loginRPC (): Promise<void> {
    this.rpcClient = await loginRPC(this.config.clientId)
  }

  async updatePresence (): Promise<void> {
    if (this.rpcClient === null) {
      throw new Error('Not logged in')
    }

    const elapsed = this.jinsei.elapsed()
    const toNextBirthday = this.jinsei.durationToNextBirthday()

    const details = `🐣${formatDuration(elapsed)}経過`
    const state = toNextBirthday.valueOf() === 0 ? '🎉今日が誕生日です！' : `🎂誕生日まで${toNextBirthday.as('days')}日`

    const largeImageKey = this.assetStorage.pickOne()

    await this.rpcClient.setActivity({ details, state, largeImageKey, largeImageText: 'ねこ' })
  }

  async removePresence (): Promise<void> {
    if (this.rpcClient === null) {
      throw new Error('Not logged in')
    }

    await this.rpcClient?.clearActivity()
  }

  async activate (): Promise<void> {
    if (this.rpcClient === null) {
      throw new Error('Not logged in')
    }

    if (this.interval !== null) {
      clearInterval(this.interval)
    }

    this.interval = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.updatePresence()
    }, 15 * 1000)
    await this.updatePresence()
  }

  async deactivate (): Promise<void> {
    if (this.rpcClient === null) {
      throw new Error('Not logged in')
    }

    if (this.interval !== null) {
      clearInterval(this.interval)
      this.interval = null
    }

    await this.removePresence()
  }

  async quit (): Promise<void> {
    await this.rpcClient?.destroy()
    app.quit()
  }
}

export default DiscordJinsei
