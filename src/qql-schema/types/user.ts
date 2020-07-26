import gql from 'graphql-tag'

export default gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        role: UserRole!
        friends: [User]
    }

    enum UserRole {
        athlete
        coach
    }
    type Query {
        hello: String!
        users: [User!]!
    }
    input UserInfo {
        username: String!
        password: String!
        email: String!
        role: String!
    }
    type Mutation {
        register(userInfo: UserInfo): User!
    }
`
