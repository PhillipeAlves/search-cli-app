const chalk = require('chalk')
const clear = require('clear')
const { NotFound, Header } = require('../ui')
const { logError } = require('../ui/uiHelperFunctions')
const { isValidArray } = require('../utils')
const { getDataToRender } = require('./outputHelpersFunctions')
const { showResults } = require('./showResults')

const output = ({ searchResults, searchType, searchValue, resultsPerPage, criteriaRefs, map }) => {
  clear()
  Header()

  try {
    if (isValidArray({ data: searchResults })) {
      const { dataToRender } = getDataToRender({
        searchResults,
        searchType,
        searchValue,
        criteriaRefs,
        map
      })

      showResults({ searchValue, dataToRender, resultsPerPage })
    } else {
      NotFound({
        text: `Sorry, we couldn't find any results for "${chalk.bold.white(searchValue)}"!`
      })
    }
  } catch (error) {
    logError({ error, where: 'promptUser' })
  }
}

module.exports = { output }
