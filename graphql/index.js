const { mergeAll, values, map } = require('ramda')
const { makeExecutableSchema, gql } = require('apollo-server')
const {
    typeDef: Package,
    resolvers: packageResolvers
} = require('./package')

const Query = gql`
    input SimpleCondition {
        name: String
        version: String
    } 
    
    input FullCondition {
        text: String
        size: Int
        from: Int
        quality: Float
        popularity: Float
        maintenance: Float
    }

    type Query {
        package(condition: SimpleCondition): [Package]
        packageWithVersion(condition: SimpleCondition): Package
        search(condition: FullCondition): [Package]
    }
`

const resolvers = {
    Query: {
        package: async (root, { condition }, { registry }) => {
            let { name } = condition
            let resp = await registry.getPackage(name)
            return values(resp.versions)
        },

        packageWithVersion: async (root, { condition }, { registry }) => {
            let { name, version = 'latest' } = condition
            let resp = await registry.getPackageByVersion(name, version)
            return resp
        },

        search: async (root, { condition }, { registry }) => {
            let resp = await registry.getSearchResult(condition)
            return map(item => item.package, resp)
        }
    }
}

exports.schema = makeExecutableSchema({
    typeDefs: [Query, Package],
    resolvers: mergeAll(resolvers, packageResolvers)
})