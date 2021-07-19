const chalk = require('chalk')
const boxen = require('boxen')
const { render, renderRainbowText } = require('./uiHelperFunctions')

const theme = {
  background: '#01010A',
  text: '#FF0059'
}

const styles = {
  notFound: {
    container: {
      padding: { top: 1, bottom: 0, left: 0, right: 3 },
      margin: 1,
      borderStyle: 'double',
      backgroundColor: 'black',
      dimBorder: true,
      align: 'center'
    },
    content: {
      padding: { top: 1, bottom: 1, left: 2, right: 2 },
      margin: 1,
      borderStyle: 'single',
      backgroundColor: 'black',
      dimBorder: true
    }
  },
  title: {
    padding: { left: 2, right: 2 },
    margin: 1
  },
  content: {
    padding: { top: 2, bottom: 2, left: 4, right: 2 },
    margin: 1,
    borderStyle: 'double',
    backgroundColor: 'black'
  }
}

const NotFound = ({ text }) => {
  const content = boxen(
    chalk.white(Title({ title: 'NOT FOUND' }), boxen(chalk.white(text), styles.notFound.content)),
    styles.notFound.container
  )

  return render({ content })
}

const Title = ({ title }) => boxen(chalk.hex(theme.text)(title), styles.title)

const Content = ({ content }) => {
  return boxen(
    content.join('\n\n--------------------------------------------------------\n\n'),
    styles.content
  )
}

const Header = () => {
  return renderRainbowText({
    text: `\n  | S E A R C H                  | \n  |                              |  \n  | ///////////                  |\n  |                              | \n  | Search for tickets or users. | \n`
  })
}

const Footer = ({ result, totalResults }) => {
  const content = `\n   >>> ${chalk.dim('Result')} ${result} ${chalk.dim('of')} ${totalResults}\n`

  render({ content })
}

module.exports = {
  NotFound,
  Title,
  Content,
  Header,
  Footer,
  theme
}
