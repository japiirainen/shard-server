import gql from 'graphql-tag'

export default gql`
  type Exercise {
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

  input newExercise {
    name: String!
    description: String!
    sets: String!
    duration: String!
    creator: ID!
    movement: String
  }

  input newMovement {
    name: String
  }

  extend type Query {
    movement(_id: ID!): Movement
    movements: [Movement]
    exercise(_id: ID!): Exercise!
    exercises: [Exercise]!
  }

  extend type Mutation {
    newMovement(input: newMovement): Movement!
    newExercise(input: newExercise): Exercise!
  }
`
