const { users, tickets, sortedUsersByID, sortedTicketsByAssignee } = require('../../data/data')

const searchTests = {
  initializeSearch: [
    {
      userInput: {
        searchType: 'users',
        match: 'full match',
        criteria: '_id',
        searchValue: 3,
        resultsPerPage: 1,
        criteriaRefs: { name: 'user ID', ref: '_id', dataType: 'number' }
      },
      toEqual: {
        criteriaRefs: { dataType: 'number', name: 'user ID', ref: '_id' },
        map: {
          createdAt: { dataType: 'date', name: 'date created', ref: 'created_at' },
          id: { dataType: 'number', name: 'user ID', ref: '_id' },
          name: { dataType: 'string', name: 'name', ref: 'name' },
          verified: { dataType: 'boolean', name: 'verified user', ref: 'verified' }
        },
        resultsPerPage: 1,
        searchResults: [
          {
            _id: 3,
            created_at: '2016-07-28T05:29:25-10:00',
            name: 'Ingrid Wagner',
            relatedData: [
              {
                _id: 'e75e6904-6536-43ea-9081-1c9f787f8682',
                assignee_id: 3,
                created_at: '2016-03-01T03:50:31-11:00',
                subject: 'A Problem in French Southern Territories',
                tags: ['Kentucky', 'North Carolina', 'South Carolina', 'Indiana'],
                type: 'task'
              },
              {
                _id: '95870a6c-22bd-45c3-8d8e-b7f2c7d46b76',
                assignee_id: 3,
                created_at: '2016-06-26T12:12:53-10:00',
                subject: 'A Nuisance in Equatorial Guinea',
                tags: ['Alaska', 'Maryland', 'Iowa', 'North Dakota'],
                type: 'question'
              }
            ],
            verified: false
          }
        ],
        searchType: 'users',
        searchValue: 3
      }
    },
    {
      userInput: {
        searchType: 'tickets',
        match: 'full match',
        criteria: 'subject',
        searchValue: 'A Nuisance in Kiribati',
        resultsPerPage: 5,
        criteriaRefs: { name: 'subject', ref: 'subject', dataType: 'string' }
      },
      toEqual: {
        criteriaRefs: { dataType: 'string', name: 'subject', ref: 'subject' },
        map: {
          assigneeId: { dataType: 'number', name: 'assignee ID', ref: 'assignee_id' },
          contentType: { dataType: 'string', name: 'content type', ref: 'type' },
          createdAt: { dataType: 'date', name: 'date created', ref: 'created_at' },
          subject: { dataType: 'string', name: 'subject', ref: 'subject' },
          tags: { dataType: 'array', name: 'tags', ref: 'tags' },
          ticketId: { dataType: 'string', name: 'ticket ID', ref: '_id' }
        },
        resultsPerPage: 5,
        searchResults: [
          {
            _id: 'fc5a8a70-3814-4b17-a6e9-583936fca909',
            assignee_id: 19,
            created_at: '2016-07-08T07:57:15-10:00',
            relatedData: [
              {
                _id: 19,
                created_at: '2016-05-05T01:56:24-10:00',
                name: 'Francis Rodrigüez',
                verified: false
              }
            ],
            subject: 'A Nuisance in Kiribati',
            tags: ['Minnesota', 'New Jersey', 'Texas', 'Nevada'],
            type: 'problem'
          }
        ],
        searchType: 'tickets',
        searchValue: 'A Nuisance in Kiribati'
      }
    }
  ],
  search: [
    {
      searchType: 'users',
      match: 'full match',
      criteria: '_id',
      searchValue: 9,
      data: users,
      toEqual: {
        searchResults: [
          {
            _id: 9,
            created_at: '2016-03-26T04:11:05-11:00',
            name: 'Josefa Mcfadden',
            relatedData: null,
            verified: false
          }
        ]
      }
    },
    {
      searchType: 'tickets',
      match: 'full match',
      criteria: '_id',
      searchValue: '1a227508-9f39-427c-8f57-1b72f3fab87c',
      data: tickets,
      toEqual: {
        searchResults: [
          {
            _id: '1a227508-9f39-427c-8f57-1b72f3fab87c',
            assignee_id: 38,
            created_at: '2016-04-14T08:32:31-10:00',
            relatedData: null,
            subject: 'A Catastrophe in Micronesia',
            tags: ['Puerto Rico', 'Idaho', 'Oklahoma', 'Louisiana'],
            type: 'incident'
          }
        ]
      }
    }
  ],
  useBinarySearch: [
    {
      array: sortedUsersByID,
      target: 19,
      property: '_id',
      toEqual: [
        {
          _id: 19,
          created_at: '2016-05-05T01:56:24-10:00',
          name: 'Francis Rodrigüez',
          verified: false
        }
      ]
    },
    {
      array: sortedTicketsByAssignee,
      target: 46,
      property: 'assignee_id',
      toEqual: [
        {
          _id: 'c702e937-5f2d-4d34-878a-fcb7d1ddf6aa',
          assignee_id: 46,
          created_at: '2016-05-25T12:48:45-10:00',
          subject: 'A Drama in Zimbabwe',
          tags: ['Oklahoma', 'Louisiana', 'Massachusetts', 'New York'],
          type: 'question'
        },
        {
          _id: '4af3bbbd-661f-4348-be25-47c6f7d36009',
          assignee_id: 46,
          created_at: '2016-01-31T05:08:27-11:00',
          subject: 'A Catastrophe in Yugoslavia',
          tags: ['Ohio', 'Pennsylvania', 'American Samoa', 'Northern Mariana Islands'],
          type: 'question'
        },
        {
          _id: '4cd61a2d-22bf-467c-9db0-a082b1125394',
          assignee_id: 46,
          created_at: '2016-07-05T09:21:49-10:00',
          subject: 'A Drama in Nigeria',
          tags: ['Missouri', 'Alabama', 'Virginia', 'Virgin Islands'],
          type: 'problem'
        }
      ]
    }
  ],
  getSearchPattern: [
    { searchValue: 'dw', toEqual: { pattern: /dw/gi } },
    { searchValue: 2, toEqual: { pattern: /2/ } },
    { searchValue: true, toEqual: { pattern: /^true$/ } }
  ],
  filterDataByProperty: [
    {
      item: { subject: 'A Catastrophe in Korea (North)' },
      match: 'relative match',
      property: 'subject',
      searchValue: 'Korea',
      pattern: /korea/gi,
      toBe: true
    },
    {
      item: { name: 'Francisca Rasmussen' },
      match: 'relative match',
      property: 'name',
      searchValue: 2,
      pattern: /2/,
      toBe: false
    },
    {
      item: { type: 'incident' },
      match: 'full match',
      property: 'type',
      searchValue: 'incident',
      pattern: /incident/gi,
      toBe: true
    }
  ],
  findRelatedData: [
    {
      data: [
        {
          _id: '436bf9b0-1147-4c0a-8439-6f79833bff5b',
          created_at: '2016-04-28T11:19:34-10:00',
          type: 'incident',
          subject: 'A Catastrophe in Korea (North)',
          assignee_id: 24,
          tags: ['Ohio', 'Pennsylvania', 'American Samoa', 'Northern Mariana Islands']
        }
      ],
      searchType: 'tickets',
      property: 'assignee_id',
      toEqual: {
        searchResults: [
          {
            _id: '436bf9b0-1147-4c0a-8439-6f79833bff5b',
            assignee_id: 24,
            created_at: '2016-04-28T11:19:34-10:00',
            relatedData: [
              {
                _id: 24,
                created_at: '2016-03-02T03:35:41-11:00',
                name: 'Harris Côpeland',
                verified: false
              }
            ],
            subject: 'A Catastrophe in Korea (North)',
            tags: ['Ohio', 'Pennsylvania', 'American Samoa', 'Northern Mariana Islands'],
            type: 'incident'
          }
        ]
      }
    },
    {
      data: [
        {
          _id: 13,
          name: 'Wade Moore',
          created_at: '2016-06-02T01:11:48-10:00',
          verified: true
        }
      ],
      searchType: 'users',
      property: '_id',
      toEqual: {
        searchResults: [
          {
            _id: 13,
            created_at: '2016-06-02T01:11:48-10:00',
            name: 'Wade Moore',
            relatedData: [],
            verified: true
          }
        ]
      }
    }
  ],
  searchForRelatedData: [
    {
      searchType: 'tickets',
      id: 3,
      toEqual: {
        relatedData: [
          {
            _id: 3,
            created_at: '2016-07-28T05:29:25-10:00',
            name: 'Ingrid Wagner',
            verified: false
          }
        ]
      }
    },
    {
      searchType: 'user',
      id: 13,
      toEqual: { relatedData: null }
    }
  ]
}

module.exports = { searchTests }
