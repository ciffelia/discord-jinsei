const DiscordRPC = require('discord-rpc')
const sleep = require('./sleep')

class RPCGateway {
  constructor (clientId) {
    this._createClient()
    this.clientId = clientId
  }

  _createClient () {
    this.client = new DiscordRPC.Client({ transport: 'ipc' })
  }

  async _tryLogin () {
    try {
      await this.client.login({
        clientId: this.clientId
      })
    } catch (e) {
      this._createClient()
      return false
    }

    return true
  }

  async login () {
    while (!await this._tryLogin()) {
      await sleep(5 * 1000)
    }
  }

  destroy () {
    this.client.destroy()
  }

  updateActivity (activity) {
    return this.client.setActivity(activity)
  }

  clearActivity () {
    this.client.clearActivity()
  }
}

module.exports = RPCGateway
