module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['standard-with-typescript', 'prettier'],
  parserOptions: {
    project: './tsconfig.json'
  }
}
