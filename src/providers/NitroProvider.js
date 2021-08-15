const request = require('request')
const fastq = require('fastq')
const chalk = require('chalk')
const fs = require('fs')

const { Provider } = require('../structures')

module.exports = class NitroProvider extends Provider {
    constructor(config) {
        super(config)

        this.libraries = config.libraries || {}
        this.figure = this.libraries.figure
        this.effect = this.libraries.effect
    }

    async handle() {
        const figureData = await this.fetchJson(this.figure.data)
        const effectData = await this.fetchJson(this.effect.data)

        return {
            figure: { ...this.figure, data: figureData.libraries.map(({ id }) => id) },
            effect: { ...this.effect, data: effectData.effects.map(({ lib }) => lib) },
        }
    }

    async worker({ assetId, baseURL, output }) {
        const downloadURL = baseURL.replace(/%asset%/g, assetId)

        return new Promise((resolve, reject) => {
            request(downloadURL)
                .on('complete', () => resolve(assetId))
                .on('error', err => reject(err))
                .pipe(fs.createWriteStream(`${output}/${assetId}`))
        })
    }

    async exec() {
        const libraries = await this.handle().then(Object.entries)

        for (const [libName, options] of libraries) {
            const queue = fastq.promise(this.worker, this.threads)
            const output = `${this.output}/${libName}`

            await fs.promises.mkdir(output, { recursive: true })

            options.data.forEach(async (assetId) => {
                queue.push({ assetId, baseURL: options.folder, output })
                    .then(assetName => {
                        console.log(chalk.green(`Downloaded: ${assetName}`))
                    })
                    .catch(err => {
                        console.log(chalk.red(`Error on asset: ${assetId}`), err)
                    })
            })
        }
    }
}