const { usersDataMap, ticketsDataMap } = require('../data/data')
const chalk = require('chalk')
const { highlightText, capitalizeText, isValidArray } = require('../utils')
const { getSearchPattern } = require('../search/searchHelperFunctions')
const { theme } = require('../ui')
const { logError } = require('../ui/uiHelperFunctions')

const formatSearchData = ({ result, dataMap, includeRelatedData = false }) => {
  try {
    const relatedData = []

    const data = Object.entries(result).reduce((obj, [key, value]) => {
      if (key === 'relatedData' && !!value && includeRelatedData) {
        relatedData.push(value)
      }
      const objectKey = Object.entries(dataMap)
        .flatMap(entry => entry.filter(property => typeof property === 'object'))
        .filter(property => property.ref === key)
        .map(result => result.name)[0]

      if (objectKey) {
        obj[objectKey] = value
      }
      return obj
    }, {})

    if (includeRelatedData) {
      return { data: [data], relatedData: relatedData.flat() }
    }

    return { data }
  } catch (error) {
    logError({ error, where: 'formatSearchData' })
  }
}

const formatSearchDataToRender = ({ items, searchValue, criteriaRefs }) => {
  try {
    if (!isValidArray({ data: items })) return null

    return items.map(item => {
      const itemData = Object.entries(item).reduce((acc, [key, value]) => {
        let valueData = value
        const { pattern } = getSearchPattern({ searchValue })

        if (key === 'user ID' || key === 'assignee ID') {
          valueData = chalk.hex(theme.text)(value)
        }

        if (
          pattern.test(value) &&
          typeof value !== 'number' &&
          criteriaRefs &&
          criteriaRefs.name === key
        ) {
          valueData = highlightText({
            text: value.toString(),
            highlight: searchValue.toString()
          })
        }

        const string = `${chalk.bold(capitalizeText({ text: key }))} -${chalk.bold(
          '>'
        )} ${valueData}`
        acc.push(string)
        return acc
      }, [])
      return itemData.join('\n')
    })
  } catch (error) {
    logError({ error, where: 'formatSearchDataToRender' })
  }
}

const getDataToRender = ({ searchResults, searchType, searchValue, criteriaRefs, map }) => {
  try {
    const relatedMap = searchType === 'users' ? ticketsDataMap : usersDataMap

    const dataToRender = searchResults.flatMap(result => {
      let parsedRelatedData = []
      const { data, relatedData } = formatSearchData({
        result,
        dataMap: map,
        includeRelatedData: true
      })

      if (isValidArray({ data: relatedData })) {
        parsedRelatedData = relatedData.flat().map(relatedDataResult => {
          const { data } = formatSearchData({ result: relatedDataResult, dataMap: relatedMap })
          return data
        })
      }

      return [
        {
          data: formatSearchDataToRender({ items: data, searchValue, criteriaRefs }),
          relatedData: formatSearchDataToRender({ items: parsedRelatedData, searchValue })
        }
      ]
    })

    if (isValidArray({ data: dataToRender })) {
      return { dataToRender }
    }

    return []
  } catch (error) {
    logError({ error, where: 'getDataToRender' })
  }
}

const getCriteriaRefs = ({ value, dataMap }) => {
  return Object.entries(dataMap).flatMap(entry => entry.filter(property => property.name === value))
}

module.exports = { formatSearchData, formatSearchDataToRender, getDataToRender, getCriteriaRefs }
