process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

const DiscordJinsei = require('./DiscordJinsei')
const TrayService = require('./TrayService')
const config = require('../config')

let trayService = null;

(async () => {
  const discordJinsei = new DiscordJinsei(config)

  await discordJinsei.loginRPC()
  await discordJinsei.activate()

  trayService = new TrayService()

  trayService.on('turnOn', discordJinsei.activate.bind(discordJinsei))
  trayService.on('turnOff', discordJinsei.deactivate.bind(discordJinsei))
  trayService.on('quit', discordJinsei.quit.bind(discordJinsei))

  trayService.start()
})()
