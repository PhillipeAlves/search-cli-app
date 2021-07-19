const { ticketsDataMap, usersDataMap } = require('../../data/data')

const outputTests = {
  formatSearchData: [
    {
      result: {
        _id: 'c6c851a6-fbe6-4736-a465-6f1859a511dd',
        created_at: '2016-05-12T04:42:00-10:00',
        type: 'question',
        subject: 'A Drama in Monaco',
        assignee_id: 73,
        tags: ['Ohio', 'Pennsylvania', 'American Samoa', 'Northern Mariana Islands']
      },
      dataMap: ticketsDataMap,
      toEqual: {
        data: {
          'assignee ID': 73,
          'content type': 'question',
          'date created': '2016-05-12T04:42:00-10:00',
          subject: 'A Drama in Monaco',
          tags: ['Ohio', 'Pennsylvania', 'American Samoa', 'Northern Mariana Islands'],
          'ticket ID': 'c6c851a6-fbe6-4736-a465-6f1859a511dd'
        }
      }
    },
    {
      result: {
        _id: 44,
        name: 'John Floyd',
        created_at: '2016-06-08T10:26:06-10:00',
        verified: false
      },
      dataMap: usersDataMap,
      includeRelatedData: true,
      toEqual: {
        data: [
          {
            'date created': '2016-06-08T10:26:06-10:00',
            name: 'John Floyd',
            'user ID': 44,
            'verified user': false
          }
        ],
        relatedData: []
      }
    }
  ],
  getCriteriaRefs: [
    {
      value: 'verified user',
      dataMap: usersDataMap,
      toEqual: [{ dataType: 'boolean', name: 'verified user', ref: 'verified' }]
    },
    {
      value: 'ticket ID',
      dataMap: ticketsDataMap,
      toEqual: [{ dataType: 'string', name: 'ticket ID', ref: '_id' }]
    },
    {
      value: '',
      dataMap: usersDataMap,
      toEqual: []
    }
  ]
}

module.exports = { outputTests }
