const { logError } = require('../ui/uiHelperFunctions')
const {
  users,
  tickets,
  usersDataMap,
  ticketsDataMap,
  sortedUsersByID,
  sortedTicketsByAssignee
} = require('./data')

const getInitialData = ({ searchType }) => {
  try {
    let map,
      data,
      property = null

    if (searchType === 'users') {
      map = usersDataMap
      data = users
      property = usersDataMap.id.ref
    }
    if (searchType === 'tickets') {
      map = ticketsDataMap
      data = tickets
      property = ticketsDataMap.assigneeId.ref
    }

    return { property, data, map }
  } catch (error) {
    logError({ error, where: 'getInitialData' })
  }
}

const getMatchingParams = ({ target }) => {
  try {
    const usersMatchingParams = {
      array: Array.from(sortedUsersByID),
      target,
      property: usersDataMap.id.ref
    }
    const ticketsMatchingParams = {
      array: Array.from(sortedTicketsByAssignee),
      target,
      property: ticketsDataMap.assigneeId.ref
    }

    return { usersMatchingParams, ticketsMatchingParams }
  } catch (error) {
    logError({ error, where: 'getMatchingParams' })
  }
}

const getDataMap = ({ userInput }) => {
  try {
    return userInput.searchType === 'users' ? usersDataMap : ticketsDataMap
  } catch (error) {
    logError({ error, where: 'getDataMap' })
  }
}

module.exports = {
  getInitialData,
  getMatchingParams,
  getDataMap
}
