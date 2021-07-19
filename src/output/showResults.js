const inquirer = require('inquirer')
const { Header } = require('../ui')
const { render, logError } = require('../ui/uiHelperFunctions')
const { renderResults } = require('./renderResults')

const showResults = ({ searchValue, dataToRender, resultsPerPage = 5 }) => {
  try {
    const totalResults = dataToRender.length
    let results = resultsPerPage
    let index = 0

    Header()
    render({
      content: `\n   Found ${totalResults} ${
        totalResults === 1 ? 'result' : 'results'
      } for "${searchValue}" \n`
    })

    const showMoreResults = ({ results, index, totalResults }) => {
      while (index < results && index < totalResults) {
        const { data, relatedData } = dataToRender[index]

        renderResults({ data, relatedData, index, totalResults })

        if (index === results - 1 && index !== totalResults - 1) {
          inquirer
            .prompt([{ name: 'continue', message: 'SHOW MORE', type: 'confirm' }])
            .then(res => {
              if (res.continue) {
                results += resultsPerPage
                showMoreResults({ results, index, totalResults })
              } else {
                render({ content: 'The end!' })
              }
            })
          break
        }

        index++
      }
    }

    showMoreResults({ results, index, totalResults })
  } catch (error) {
    logError({ error, where: 'showResults' })
  }
}

module.exports = { showResults }
