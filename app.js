// #!/usr/bin/env node
const { initializeSearch } = require('./src/search')
const { prompt } = require('./src/input')
const { output } = require('./src/output')

const init = async () => {
  const input = new Promise(resolve => resolve(prompt()))
  const search = await input.then(initializeSearch)
  output(search)
}

init()
