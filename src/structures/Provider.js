const fetch = require('node-fetch')
const parser = require('fast-xml-parser')

module.exports = class Provider {
    constructor(config) {
        this.config = config

        this.output = config.output || './output/nitro'
        this.threads = config.threads || 1
    }

    async handle() { }

    async worker() { }

    async #fetch(url, options = {}) {
        const result = await fetch(url, options)
        return result
    }

    async fetchJson(url, options) {
        const response = await this.#fetch(url, options)
        const result = await response.json()
        return result
    }

    async fetchXML(url, options) {
        const response = await this.#fetch(url, options)
        const raw = await response.text()
        const result = await parser.parse(raw)
        return result
    }
}