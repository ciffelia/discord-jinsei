const DiscordRPC = require('discord-rpc')
const sleep = require('./sleep')

const createRPCClient = () =>{
  return new DiscordRPC.Client({ transport: 'ipc' })
}

const tryLoginRPC = async (clientId) => {
  const client = createRPCClient()
  try {
    return await client.login({ clientId })
  } catch (err) {
    console.warn(err)
    return null
  }
}

const loginRPC = async (clientId) => {
  while (true) {
    const client = await tryLoginRPC(clientId)

    if (client !== null) {
      return client
    } else {
      await sleep(5 * 1000)
    }
  }
}

module.exports = loginRPC
