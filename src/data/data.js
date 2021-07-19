const { sortData } = require('../utils')
const tickets = require('../../public/data/tickets.json')
const users = require('../../public/data/users.json')

const usersDataMap = {
  id: { name: 'user ID', ref: '_id', dataType: 'number' },
  name: { name: 'name', ref: 'name', dataType: 'string' },
  createdAt: { name: 'date created', ref: 'created_at', dataType: 'date' },
  verified: { name: 'verified user', ref: 'verified', dataType: 'boolean' }
}

const ticketsDataMap = {
  ticketId: { name: 'ticket ID', ref: '_id', dataType: 'string' },
  createdAt: { name: 'date created', ref: 'created_at', dataType: 'date' },
  contentType: { name: 'content type', ref: 'type', dataType: 'string' },
  subject: { name: 'subject', ref: 'subject', dataType: 'string' },
  assigneeId: { name: 'assignee ID', ref: 'assignee_id', dataType: 'number' },
  tags: { name: 'tags', ref: 'tags', dataType: 'array' }
}

const sortedUsersByID = sortData({ data: users, property: usersDataMap.id.ref })

const sortedTicketsByAssignee = sortData({
  data: tickets,
  property: ticketsDataMap.assigneeId.ref
})

module.exports = {
  users,
  tickets,
  usersDataMap,
  ticketsDataMap,
  sortedUsersByID,
  sortedTicketsByAssignee
}
