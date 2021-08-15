const { Provider } = require('../structures')

module.exports = class NitroProvider extends Provider {
  constructor(name, config) {
    super(name, config)

    this.libraries = config.libraries.filter(source => source.enabled)
  }

  async handle() {
    await super.handle()
    const sources = new Array()

    for (const { name, ...options } of this.libraries) {
      const result = await this.fetchFile(options.map)

      sources.push({
        name, ...options, keys: Object.values(result)[0].map(({ lib, id }) => lib || id)
      })
    }

    return sources
  }
}
