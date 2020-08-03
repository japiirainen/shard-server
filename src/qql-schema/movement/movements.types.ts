import gql from 'graphql-tag'

export default gql`
  type MovementInWo {
    _id: ID!
    movement: Movement!
    name: String!
    description: String!
    sets: String!
    duration: String!
    creator: User!
  }

  type Movement {
    _id: ID!
    name: String!
  }

  input newMovementInWo {
    name: String!
    description: String!
    sets: String!
    duration: String!
    creator: ID!
  }

  input newMovement {
    name: String
  }

  extend type Query {
    Movement(_id: ID!): Movement!
    Movements: [Movement]!
    MovementInWos: [MovementInWo]!
    MovementInWo(_id: ID!): MovementInWo!
  }

  extend type Mutation {
    newMovement(input: newMovement): Movement!
    newMovementInWo(input: newMovementInWo): MovementInWo!
  }
`
