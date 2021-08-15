const { Provider } = require('../structures')

const fs = require('fs/promises')
const path = require('path')

module.exports = class NitroProvider extends Provider {
  constructor(name, config) {
    super(name, config)

    this.libraries = config.libraries.filter(source => source.enabled)
  }

  async handle() {
    const sources = new Array()

    for (const { name, ...options } of this.libraries) {
      const [text, result] = await this.fetchFile(options.map)
      fs.writeFile(path.join(this.output, options.map.split(/\//g).pop()), Buffer.from(text))

      sources.push({
        name, ...options, keys: Object.values(result)[0].map(({ lib, id }) => lib || id)
      })
    }

    return sources
  }
}
