const { isValidArray } = require('../utils')

const recursiveSearch = ({ array, target, begin, end, updateItems, property }) => {
  if (begin > end) return

  const rest = { array, target, updateItems, property }
  const middle = Math.floor((begin + end) / 2)
  const current = array[middle][property]

  if (target === current) {
    const item = array.splice(middle, 1)
    updateItems(item)
    recursiveSearch({
      begin: 0,
      end: array.length - 1,
      ...rest
    })
  } else if (target < current) {
    recursiveSearch({ begin, end: middle - 1, ...rest })
  } else {
    recursiveSearch({ end, begin: middle + 1, ...rest })
  }
}

const useBinarySearch = ({ array, target, property }) => {
  if (!isValidArray({ data: array })) return null

  const items = []
  const updateItems = item => items.push(item)

  recursiveSearch({
    array,
    target,
    begin: 0,
    end: array.length - 1,
    updateItems,
    property
  })

  return items.flat()
}

module.exports = { useBinarySearch }
