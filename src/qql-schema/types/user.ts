import gql from 'graphql-tag'

export default gql`
    type Query {
        hello: String!
        users: [User!]!
    }
    type User {
        _id: String!
        username: String!
        email: String!
        role: UserRole!
        friends: [User]
    }

    enum UserRole {
        athlete
        coach
    }
    type Mutation {
        createUser(name: String!): User!
    }
`
