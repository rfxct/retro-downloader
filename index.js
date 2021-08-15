const config = require('./config')

const Providers = require('./src/providers')
const sources = Object.entries(config).filter(([, o]) => o.enabled)

for (const [name, config] of sources) {
  const Provider = new Providers[name](name, config)
  Provider.exec()
}
