const config = require('./config')

const NitroProvider = require('./src/providers/NitroProvider')

const provider = new NitroProvider('nitro', config.nitro)
provider.exec()
