const { search } = require('./search')
const { getInitialData } = require('../data/dataHelperFunctions')
const { logError } = require('../ui/uiHelperFunctions')

const initializeSearch = ({ userInput }) => {
  try {
    const { searchType, match, criteria, searchValue, resultsPerPage, criteriaRefs } = userInput
    const { map, property, data } = getInitialData({ searchType })

    const { searchResults } = search({
      searchType,
      match,
      criteria,
      searchValue,
      property,
      data
    })

    return { searchResults, searchType, searchValue, resultsPerPage, criteriaRefs, map }
  } catch (error) {
    logError({ error, where: 'initializeSearch' })
  }
}

module.exports = { initializeSearch }
