const utilsTests = {
  sortData: [
    {
      data: [{ id: 3 }, { id: 54 }, { id: 20 }],
      toEqual: [{ id: 3 }, { id: 20 }, { id: 54 }],
      property: 'id'
    },
    {
      data: [{ name: 'Paul' }, { name: 'Anna' }, { name: 'Karmjeet' }],
      toEqual: [{ name: 'Anna' }, { name: 'Karmjeet' }, { name: 'Paul' }],
      property: 'name'
    }
  ],
  capitalizeText: [
    { text: 'wow', toEqual: 'Wow' },
    { text: 'Capitalize', toEqual: 'Capitalize' }
  ],
  isValidArray: [
    { data: [], toBe: false },
    { data: ['test'], toBe: true }
  ],
  isValidObject: [
    { data: {}, toBe: false },
    { data: { test: 'test' }, toBe: true }
  ]
}

module.exports = { utilsTests }
