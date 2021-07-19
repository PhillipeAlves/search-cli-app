const { utilsTests } = require('./data/utilsTests')
const { sortData, isValidArray, capitalizeText, isValidObject } = require('../utils')

describe('Test util functions', () => {
  it('sorts the data in ascending order', () => {
    utilsTests.sortData.forEach(({ data, toEqual, property }) => {
      expect(sortData({ data, property })).toEqual(toEqual)
    })
  })

  it('capilatizes the text', () => {
    utilsTests.capitalizeText.forEach(({ text, toEqual }) => {
      expect(capitalizeText({ text })).toEqual(toEqual)
    })
  })

  it('checks if it is an array and if it is not empty', () => {
    utilsTests.isValidArray.forEach(({ data, toBe }) => {
      expect(isValidArray({ data })).toBe(toBe)
    })
  })

  it('checks if it is an object and if it is not empty', () => {
    utilsTests.isValidObject.forEach(({ data, toBe }) => {
      expect(isValidObject({ data })).toBe(toBe)
    })
  })
})
