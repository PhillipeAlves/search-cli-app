const { dataTests } = require('./data/dataTests')
const { getInitialData, getMatchingParams, getDataMap } = require('../data/dataHelperFunctions')

describe('Test data functions', () => {
  it(`gets the data to be searched and it's relative map`, () => {
    dataTests.getInitialData.forEach(({ searchType, toEqual }) => {
      expect(getInitialData({ searchType })).toEqual(toEqual)
    })
  })

  it(`gets matching params for binary search`, () => {
    dataTests.getMatchingParams.forEach(({ target, toEqual }) => {
      expect(getMatchingParams({ target })).toEqual(toEqual)
    })
  })

  it(`gets mapping of data`, () => {
    dataTests.getDataMap.forEach(({ userInput, toEqual }) => {
      expect(getDataMap({ userInput })).toEqual(toEqual)
    })
  })
})
