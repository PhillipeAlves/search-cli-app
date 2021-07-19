const { searchTests } = require('./data/searchTests')
const { useBinarySearch } = require('../search/useBinarySearch')
const { search } = require('../search/search')
const {
  getSearchPattern,
  filterDataByProperty,
  findRelatedData,
  searchForRelatedData
} = require('../search/searchHelperFunctions')
const { initializeSearch } = require('../search')

describe('Test search functions', () => {
  it(`receives the user's input and returns the search result`, () => {
    searchTests.initializeSearch.forEach(({ userInput, toEqual }) => {
      expect(
        initializeSearch({
          userInput
        })
      ).toEqual(toEqual)
    })
  })

  it(`searches for data based on the user's input`, () => {
    searchTests.search.forEach(
      ({ searchType, criteria, match, searchValue, property, data, toEqual }) => {
        expect(
          search({
            searchType,
            criteria,
            match,
            searchValue,
            property,
            data
          })
        ).toEqual(toEqual)
      }
    )
  })

  it('searches for related data to the initial search results', () => {
    searchTests.searchForRelatedData.forEach(({ searchType, id, toEqual }) => {
      expect(searchForRelatedData({ searchType, id })).toEqual(toEqual)
    })
  })

  it('checks if the searched data has related data to it', () => {
    searchTests.findRelatedData.forEach(({ data, searchType, property, toEqual }) => {
      expect(findRelatedData({ data, searchType, property })).toEqual(toEqual)
    })
  })

  it('filters data based on property', () => {
    searchTests.filterDataByProperty.forEach(
      ({ item, searchValue, pattern, match, property, toBe }) => {
        expect(filterDataByProperty({ item, searchValue, pattern, match, property })).toBe(toBe)
      }
    )
  })

  it('uses binary search to find related data based on id', () => {
    searchTests.useBinarySearch.forEach(({ array, target, property, toEqual }) => {
      expect(useBinarySearch({ array, target, property })).toEqual(toEqual)
    })
  })

  it('creates regex pattern based on data type', () => {
    searchTests.getSearchPattern.forEach(({ searchValue, toEqual }) => {
      expect(getSearchPattern({ searchValue })).toEqual(toEqual)
    })
  })
})
