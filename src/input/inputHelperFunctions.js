const inquirer = require('inquirer')
const { logError } = require('../ui/uiHelperFunctions')

const getUserInput = ({ name, message, type, choices, validate, updateUserInput }) => {
  try {
    return inquirer
      .prompt([{ name, message, type, validate, choices }])
      .then(async res => await updateUserInput({ key: name, value: res[name] }))
  } catch (error) {
    logError({ error, where: 'getUserInput' })
  }
}

module.exports = { getUserInput }
