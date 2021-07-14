const { app } = require('electron')
const Jinsei = require('./Jinsei')
const ImageAssetStorage = require('./ImageAssetStorage')
const loginRPC = require('./loginRPC')
const formatDuration = require('./formatDuration')

class DiscordJinsei {
  constructor (config) {
    this.config = config
    this.rpcClient = null
    this.jinsei = new Jinsei(config.birth)
    this.assetStorage = new ImageAssetStorage(config.imageAssets)
    this.interval = null
  }

  async loginRPC () {
    this.rpcClient = await loginRPC(this.config.clientId)
  }

  async updatePresence () {
    const elapsed = this.jinsei.elapsed()
    const toNextBirthday = this.jinsei.durationToNextBirthday()

    const details = `🐣${formatDuration(elapsed)}経過`
    const state = toNextBirthday.valueOf() === 0 ? '🎉今日が誕生日です！' : `🎂誕生日まで${toNextBirthday.as('days')}日`

    const largeImageKey = this.assetStorage.pickOne()

    await this.rpcClient.setActivity({ details, state, largeImageKey, largeImageText: 'ねこ' })
  }

  async removePresence () {
    await this.rpcClient.clearActivity()
  }

  async activate () {
    if (this.interval !== null) {
      clearInterval(this.interval)
    }

    this.interval = setInterval(this.updatePresence.bind(this), 15 * 1000)
    await this.updatePresence()
  }

  async deactivate () {
    if (this.interval !== null) {
      clearInterval(this.interval)
      this.interval = null
    }

    await this.removePresence()
  }

  async quit () {
    await this.rpcClient.destroy()
    app.quit()
  }
}

module.exports = DiscordJinsei
