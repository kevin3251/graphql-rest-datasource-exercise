const registry = require('./datasource/registry')
const { ApolloServer } = require('apollo-server')
const { schema } = require('./graphql')

const server = new ApolloServer({
    schema,
    context: { registry }
})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})