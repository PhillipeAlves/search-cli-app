// #!/usr/bin/env node
const { initializeSearch } = require('./src/search')
const { prompt } = require('./src/input')
const { output } = require('./src/output')

const init = async () => {
  const input = await prompt()
  const search = await initializeSearch(input)
  output(search)
}

init()
