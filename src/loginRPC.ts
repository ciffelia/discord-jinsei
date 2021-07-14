import DiscordRPC from 'discord-rpc'
import sleep from './sleep'

const createRPCClient = (): DiscordRPC.Client => {
  return new DiscordRPC.Client({ transport: 'ipc' })
}

const tryLoginRPC = async (
  clientId: string
): Promise<DiscordRPC.Client | null> => {
  const client = createRPCClient()
  try {
    return await client.login({ clientId })
  } catch (err) {
    console.warn(err)
    return null
  }
}

const loginRPC = async (clientId: string): Promise<DiscordRPC.Client> => {
  while (true) {
    const client = await tryLoginRPC(clientId)

    if (client !== null) {
      return client
    } else {
      await sleep(5 * 1000)
    }
  }
}

export default loginRPC
