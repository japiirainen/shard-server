import { ObjectID } from 'mongodb'
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

  input UserInfo {
    username: String!
    password: String!
    email: String!
    role: String!
  }

  type Query {
    users: [User]
    user(id: String): User
  }

  type Mutation {
    register(userInfo: UserInfo): User!
    addFriend(id: String): User
  }
`

export type ObjectId = ObjectID

export interface UserInterface {
  username: string
  password: string
  email: string
  role: string
  friends?: string[]
}
