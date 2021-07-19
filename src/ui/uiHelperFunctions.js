const chalk = require('chalk')
const lolcatjs = require('lolcatjs')

const logError = ({ error, where }) => {
  console.error(
    chalk.white(
      '\n',
      '======',
      '\n',
      chalk.bold('Error:'),
      chalk.red.italic(error.name),
      `-${chalk.bold('>')}`,
      chalk.dim(error.message),
      '\n',
      chalk.bold('Where:'),
      chalk.underline.white(where),
      '\n',
      '======'
    )
  )
}

const renderRainbowText = ({ text }) => {
  lolcatjs.options.seed = Math.round(Math.random() * 1000)
  lolcatjs.options.colors = true
  return lolcatjs.fromString(text)
}

const render = ({ content }) => console.log(content)

module.exports = {
  render,
  renderRainbowText,
  logError
}
