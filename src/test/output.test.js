const { outputTests } = require('./data/outputTests')
const { formatSearchData, getCriteriaRefs } = require('../output/outputHelpersFunctions')

describe('Test output functions', () => {
  it('formats search results and separates data and related data', () => {
    outputTests.formatSearchData.forEach(({ result, dataMap, includeRelatedData, toEqual }) => {
      expect(formatSearchData({ result, dataMap, includeRelatedData })).toEqual(toEqual)
    })
  })

  it('gets search criteria references based on data mapping', () => {
    outputTests.getCriteriaRefs.forEach(({ value, dataMap, toEqual }) => {
      expect(getCriteriaRefs({ value, dataMap })).toEqual(toEqual)
    })
  })
})
