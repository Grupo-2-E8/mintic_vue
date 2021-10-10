import { camelCase } from 'lodash'

const requireContext = require.context('.', false, /.*\.js$/)

export default requireContext.keys()
  .filter(filter => !filter.includes('index'))
  .map(file =>
    [
      camelCase(file.replace(/(^.\/)|(\.js$)/g, '')),
      requireContext(file).default
    ]
  )
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true
    }

    return { ...modules, [name]: module }
  }, {})
