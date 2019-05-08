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

    async getSearchResult(params) {
        let url = `${this.baseURL}/-/v1/search`
        let resp = await axios.get(url, { params })
        return resp.data.objects
    }
}

module.exports = registry

