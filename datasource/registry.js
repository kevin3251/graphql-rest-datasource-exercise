const axios = require('axios')
const registry = {
    baseURL: 'https://registry.npmjs.org/',

    async getPackage(packageName) {
        let resp = await axios.get(`${this.baseURL}/${packageName}`)
        return resp.data
    },

    async getPackageByVersion(packageName, version) {
        let resp = await axios.get(`${this.baseURL}/${packageName}/${version}`)
        return resp.data
    },

    async getSearchResult({
        text, size, from, quality, popularity, maintenance
    } = {}) {
        const url = `${this.baseURL}/text=${text}&size=${size}&from=${from}&quality=${quality}&popularity=${popularity}&maintenanc=${maintenance}`
        let resp = await axios.get(url)
        return resp.data
    }
}

module.exports = registry

