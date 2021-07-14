import path from 'path'
import { promises as fs } from 'fs'
import { Config } from './Config'

const loadConfig = async (): Promise<Config> => {
  const configPath = path.join(__dirname, '../config.json')
  const configText = await fs.readFile(configPath, 'utf8')
  return JSON.parse(configText)
}

export default loadConfig
