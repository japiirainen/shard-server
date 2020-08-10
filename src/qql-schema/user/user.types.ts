import gql from 'graphql-tag'

export default gql`
  enum USER_ROLE {
    ATHLETE
    COACH
  }

  type User {
    id: ID!
    username: String!
    email: String!
    lastLoginAt: String!
    role: USER_ROLE!
    friends: [User]
    prs: [Pr]
    workoutHistory: [TrainingSession]
  }

  type AuthPayload {
    user: User
  }

  input UserInfo {
    username: String!
    password: String!
    email: String!
    role: String!
  }

  input newFriend {
    userId: ID!
    friendId: ID!
  }

  type Query {
    users: [User]
    user(_id: ID!): User!
  }

  type Mutation {
    login: AuthPayload
    logout: Boolean
    register(input: UserInfo): User!
    addFriend(input: newFriend): User
  }
`
