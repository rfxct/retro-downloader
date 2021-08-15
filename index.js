const config = require('./config')

const NitroProvider = require('./src/providers/NitroProvider')

const provider = new NitroProvider(config.nitro)
provider.exec().then(()=>console.log(0))