const { getMatchingParams } = require('../data/dataHelperFunctions')
const { logError } = require('../ui/uiHelperFunctions')
const { isValidArray } = require('../utils')
const { useBinarySearch } = require('./useBinarySearch')

const searchForRelatedData = ({ searchType, id: target }) => {
  try {
    const { usersMatchingParams, ticketsMatchingParams } = getMatchingParams({ target })
    let search = null
    let relatedData = null

    if (searchType === 'users') {
      search = useBinarySearch(usersMatchingParams)
      if (isValidArray({ data: search })) {
        relatedData = useBinarySearch(ticketsMatchingParams)
      }
    }
    if (searchType === 'tickets') {
      search = useBinarySearch(ticketsMatchingParams)
      if (isValidArray({ data: search })) {
        relatedData = useBinarySearch(usersMatchingParams)
      }
    }

    return { relatedData }
  } catch (error) {
    logError({ error, where: 'searchForRelatedData' })
  }
}

const findRelatedData = ({ data, searchType, property }) => {
  try {
    const searchResults = data.reduce((array, result) => {
      const { relatedData } = searchForRelatedData({ searchType, id: result[property] })
      const object = { ...result }
      object['relatedData'] = relatedData
      array.push(object)
      return array
    }, [])

    return { searchResults }
  } catch (error) {
    logError({ error, where: 'findRelatedData' })
  }
}

const filterDataByProperty = ({ item, searchValue, pattern, match, property }) => {
  try {
    if (match === 'relative match' && pattern) {
      return pattern.test(item[property])
    }
    if (isValidArray({ data: item[property] })) {
      return item[property].includes(searchValue)
    }
    return item[property] === searchValue
  } catch (error) {
    logError({ error, where: 'filterDataByProperty' })
  }
}

const getSearchPattern = ({ searchValue }) => {
  try {
    let pattern = null

    if (typeof searchValue === 'string') {
      pattern = new RegExp(`${searchValue.trim()}`, 'ig')
    }
    if (typeof searchValue === 'boolean') {
      pattern = new RegExp(`^${searchValue}$`)
    }
    if (typeof searchValue === 'number') {
      pattern = new RegExp(`${searchValue}`)
    }

    return { pattern }
  } catch (error) {
    logError({ error, where: 'getSearchPattern' })
  }
}

module.exports = {
  searchForRelatedData,
  getSearchPattern,
  findRelatedData,
  filterDataByProperty
}
