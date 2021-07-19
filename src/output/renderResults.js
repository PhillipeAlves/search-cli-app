const { Title, Content, Footer, theme, Header } = require('../ui')
const chalk = require('chalk')
const boxen = require('boxen')
const { logError, render } = require('../ui/uiHelperFunctions')

const styles = {
  padding: { top: 1, bottom: 0, left: 0, right: 3 },
  margin: { left: 3 },
  borderStyle: 'double',
  backgroundColor: theme.background,
  align: 'center'
}

const renderResults = ({ data, relatedData, index, totalResults }) => {
  try {
    const content = boxen(
      chalk.white(
        Title({ title: 'SEARCH RESULTS' }),
        Content({ content: data }),
        relatedData ? Title({ title: 'RELATED DATA' }) : '',
        relatedData ? Content({ content: relatedData }) : ''
      ),
      styles
    )

    render({ content })
    Footer({ result: index + 1, totalResults })
  } catch (error) {
    logError({ error, where: 'renderResults' })
  }
}

module.exports = { renderResults }
