const chalk = require('chalk')
const { theme } = require('../ui')

const sortData = ({ data, property }) => {
  return data
    .filter(user => typeof user[property] !== 'undefined')
    .sort((a, b) => {
      if (typeof a[property] === 'number') {
        return a[property] - b[property]
      }
      if (typeof a[property] === 'string') {
        return a[property].localeCompare(b[property])
      }
    })
}

const highlightText = ({ text, highlight }) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
  return parts
    .map(part => {
      return part.toLowerCase() === highlight.toLowerCase() ? chalk.hex(theme.text)(part) : part
    })
    .filter(x => x)
    .join('')
}

const capitalizeText = ({ text }) =>
  text.replace(/(_|-)/g, ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase())

const isValidArray = ({ data }) => !!Array.isArray(data) && !!data && !!data.length

const isValidObject = ({ data }) =>
  typeof data === 'object' && !!data && !!Object.entries(data).length

module.exports = { sortData, highlightText, capitalizeText, isValidArray, isValidObject }
