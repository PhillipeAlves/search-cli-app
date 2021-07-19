// #!/usr/bin/env node
const clear = require('clear')
const { initializeSearch } = require('./src/search')
const { prompt } = require('./src/input')
const { Header } = require('./src/ui')
const { output } = require('./src/output')

clear()

const init = async () => {
  Header()
  const input = new Promise(resolve => resolve(prompt()))
  const search = await input.then(initializeSearch)
  output(search)
}

init()
