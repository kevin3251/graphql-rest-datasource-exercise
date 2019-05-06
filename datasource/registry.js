const { RESTDataSource } = require('apollo-datasource-rest')

class Registry extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'https://registry.npmjs.org/'
    }

    async getPackage(packageName) {
        return this.get(`${packageName}`)
    }

    async getPackageByVersion(packageName, version) {
        
    }
}