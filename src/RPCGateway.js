const DiscordRPC = require('discord-rpc')

class RPCGateway {
  constructor (clientId) {
    this.client = new DiscordRPC.Client({ transport: 'ipc' })
    this.clientId = clientId
  }

  login () {
    return this.client.login({
      clientId: this.clientId
    })
  }

  updateActivity (activity) {
    return this.client.setActivity(activity)
  }
}

module.exports = RPCGateway
