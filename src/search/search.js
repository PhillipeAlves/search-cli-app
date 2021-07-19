const { logError } = require('../ui/uiHelperFunctions')
const { isValidArray } = require('../utils')
const {
  filterDataByProperty,
  findRelatedData,
  getSearchPattern
} = require('./searchHelperFunctions')

const search = ({ searchType, criteria, match, searchValue, property, data }) => {
  const { pattern } = getSearchPattern({ searchValue })

  try {
    const dataFilteredByCriteria = data.filter(item =>
      filterDataByProperty({ item, searchValue, pattern, match, property: criteria })
    )

    if (isValidArray({ data: dataFilteredByCriteria })) {
      const searchResults = findRelatedData({
        data: dataFilteredByCriteria,
        searchType,
        property
      })
      return { ...searchResults }
    }

    return {}
  } catch (error) {
    logError({ error, where: 'search' })
  }
}

module.exports = { search }
