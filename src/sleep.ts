// eslint-disable-next-line @typescript-eslint/promise-function-async
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

export default sleep
