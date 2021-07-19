const {
  users,
  tickets,
  ticketsDataMap,
  usersDataMap,
  sortedUsersByID,
  sortedTicketsByAssignee
} = require('../../data/data')

const dataTests = {
  getInitialData: [
    {
      searchType: 'users',
      toEqual: { data: users, map: usersDataMap, property: usersDataMap.id.ref }
    },
    {
      searchType: 'tickets',
      toEqual: { data: tickets, map: ticketsDataMap, property: ticketsDataMap.assigneeId.ref }
    }
  ],
  getMatchingParams: [
    {
      target: 52,
      toEqual: {
        ticketsMatchingParams: {
          array: Array.from(sortedTicketsByAssignee),
          property: 'assignee_id',
          target: 52
        },
        usersMatchingParams: {
          array: Array.from(sortedUsersByID),
          property: '_id',
          target: 52
        }
      }
    }
  ],
  getDataMap: [
    {
      userInput: { searchType: 'users' },
      toEqual: {
        createdAt: { dataType: 'date', name: 'date created', ref: 'created_at' },
        id: { dataType: 'number', name: 'user ID', ref: '_id' },
        name: { dataType: 'string', name: 'name', ref: 'name' },
        verified: { dataType: 'boolean', name: 'verified user', ref: 'verified' }
      }
    },
    {
      userInput: { searchType: 'tickets' },
      toEqual: {
        assigneeId: { dataType: 'number', name: 'assignee ID', ref: 'assignee_id' },
        contentType: { dataType: 'string', name: 'content type', ref: 'type' },
        createdAt: { dataType: 'date', name: 'date created', ref: 'created_at' },
        subject: { dataType: 'string', name: 'subject', ref: 'subject' },
        tags: { dataType: 'array', name: 'tags', ref: 'tags' },
        ticketId: { dataType: 'string', name: 'ticket ID', ref: '_id' }
      }
    }
  ]
}

module.exports = { dataTests }
