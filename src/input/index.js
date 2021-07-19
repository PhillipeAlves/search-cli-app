const { getUserInput } = require('./inputHelperFunctions')
const { getDataMap } = require('../data/dataHelperFunctions')
const { logError } = require('../ui/uiHelperFunctions')
const { getCriteriaRefs } = require('../output/outputHelpersFunctions')
const { isValidArray } = require('../utils')

const prompt = async () => {
  const userInput = {
    searchType: '',
    match: '',
    criteria: '',
    resultsPerPage: '',
    searchValue: '',
    criteriaRefs: ''
  }
  let dataType = ''

  const updateUserInput = ({ key, value }) => {
    const criteriaRefs = getCriteriaRefs({ value, dataMap: getDataMap({ userInput }) })

    if (userInput.searchType && isValidArray({ data: criteriaRefs })) {
      userInput['criteriaRefs'] = criteriaRefs[0]
      userInput[key] = criteriaRefs[0].ref
      dataType = criteriaRefs[0].dataType
      return
    }
    if (dataType === 'number') {
      userInput[key] = parseInt(value)
      return
    }

    userInput[key] = value
  }

  try {
    await getUserInput({
      name: 'searchType',
      message: `I am searching for... \n`,
      type: 'list',
      choices: ['tickets', 'users'],
      updateUserInput
    })

    await getUserInput({
      name: 'match',
      message: 'using \n',
      type: 'list',
      choices: ['relative match', 'exact match'],
      updateUserInput
    })

    await getUserInput({
      name: 'criteria',
      message: 'by... \n',
      type: 'list',
      choices: Object.values(getDataMap({ userInput })).map(value => value.name),
      updateUserInput
    })

    await getUserInput({
      name: 'resultsPerPage',
      message: 'Results per page \n',
      type: 'list',
      choices: [1, 5, 10, 15, 20],
      updateUserInput
    })

    dataType === 'boolean'
      ? await getUserInput({
          name: 'searchValue',
          message: `Are you looking for a ${userInput.criteriaRefs.name}? \n`,
          type: 'confirm',
          updateUserInput
        })
      : await getUserInput({
          name: 'searchValue',
          message: 'Type your search here \n',
          type: 'input',
          validate: answer => {
            if (!!answer) {
              if (dataType === 'number' && isNaN(answer)) {
                return 'The value provided must be a number'
              }
              return true
            } else {
              return 'please enter a value'
            }
          },
          updateUserInput
        })
  } catch (error) {
    logError({ error, where: 'prompt' })
  }

  return { userInput }
}

module.exports = { prompt }
