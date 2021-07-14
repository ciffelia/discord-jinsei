import loadConfig from './loadConfig'
import DiscordJinsei from './DiscordJinsei'
import TrayService from './TrayService'

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

let trayService = null

const main = async (): Promise<void> => {
  const config = await loadConfig()
  const discordJinsei = new DiscordJinsei(config)

  await discordJinsei.loginRPC()
  await discordJinsei.activate()

  trayService = new TrayService()

  trayService.on('turnOn', () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    discordJinsei.activate()
  })
  trayService.on('turnOff', () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    discordJinsei.deactivate()
  })
  trayService.on('quit', () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    discordJinsei.quit()
  })

  trayService.start()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
