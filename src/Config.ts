interface Config {
  clientId: string
  birth: PlainDate
  imageAssets: string[]
}

interface PlainDate {
  year: number
  month: number
  day: number
}

export { Config, PlainDate }
