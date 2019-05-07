const { mergeAll } = require('ramda')
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
    
    # input FullCondition {

    # }

    type Query {
        package(condition: SimpleCondition): [Package]
        # packageWithVersion(condition: SimpleCondition): Package
    }
`

const resolvers =  {
    Query: {
        package: async (root, { condition }, { registry }) => {
            let { name } = condition
            let result = await registry.getPackage(name)
            return result
        }
    }
}

exports.schema = makeExecutableSchema({
    typeDefs: [Query, Package],
    resolvers: mergeAll(resolvers, packageResolvers)
})