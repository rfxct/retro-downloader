const fastq = require('fastq')

const request = require('request')
const fetch = require('node-fetch')
const parser = require('fast-xml-parser')

const fs = require('fs')
const path = require('path')

const ora = require('ora')
const chalk = require('chalk')

module.exports = class Provider {
  constructor(name, config) {
    this.config = config
    this.name = chalk.yellow(name.toUpperCase())

    this.output = config.outputDir ?? `./output/${this.name}`
    this.threads = config.threads ?? 1
  }

  async handle() { }

  async exec() {
    const libraries = await this.handle()

    for (const { name, folder, keys } of libraries) {
      const spinner = ora({ prefixText: `[${this.name}]` }).start()
      const startedAt = Date.now()

      const queue = fastq.promise(this.worker, this.threads)
      queue.empty = () => spinner.succeed(
        `All ${name}s have been downloaded. Done in ${~~((Date.now() - startedAt)/1000)} seconds`
        )

      const output = path.join(this.output, name)
      await fs.promises.mkdir(output, { recursive: true })

      keys.forEach(async asset => {
        queue.push({ asset, folder, output })
          .then(() => spinner.text = `${queue.length()} ${name}s left`)
          .catch(err => {
            spinner.fail(chalk.red(`Error downloading asset ${asset}`))
            console.error(err)
          })
      })
    }
  }

  async worker({ asset, folder, output }) {
    const url = folder?.replace(/%asset%/g, asset)

    return new Promise((resolve, reject) => {
      request(url)
        .on('complete', resolve)
        .on('error', reject)
        .pipe(fs.createWriteStream(path.join(output, asset)))
    })
  }

  // HTTP
  async fetchFile(url, options) {
    const source = url.split(/\./g).pop().toUpperCase()
    const result = await this['fetch' + source](url, options)
    return result
  }

  async fetchTXT(url, options) {
    const response = await fetch(url, options)
    const result = await response.text()
    return result
  }

  async fetchJSON(url, options) {
    const response = await fetch(url, options)
    const text = await response.text()
    const json = JSON.parse(text)
    return [text, json]
  }

  async fetchXML(url, options) {
    const response = await fetch(url, options)
    const text = await response.text()
    const xml = parser.parse(text, { ignoreAttributes: false })
    return [text, xml]
  }
}
