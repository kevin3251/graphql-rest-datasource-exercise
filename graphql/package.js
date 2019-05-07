const { gql } = require('apollo-server')

exports.typeDef =  gql`

    type Repository {
        type: String
        url: String
    }

    type Bugs {
        url: String
        email: String
    }

    type Contributor {
        name: String
        email: String
        url: String
    }

    type Package {
        name: String,
        version: String
        author: String
        description: String
        keywords: [String]
        repository: Repository
        license: String
        bugs: Bugs
        contributors: [Contributor]
    }
`

exports.resolvers = {
    Package: {
        repository: () => {},
        bugs: () => {},
        contributors: () => {}
    }
}