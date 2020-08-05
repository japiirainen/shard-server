import gql from 'graphql-tag'

export default gql`
  scalar Date

  type TrainingSession {
    _id: ID!
    user: User!
    workout: Workout!
    createdAt: Date!
  }

  type Pr {
    _id: ID!
    user: User!
    movement: Movement!
    result: String!
    workout: Workout!
    createdAt: Date!
    message: String
  }

  input newPr {
    user: ID!
    movement: ID!
    workout: ID!
    result: Int!
  }

  extend type Query {
    trainingSessions: [TrainingSession]!
    trainingSessionsByUser(_id: ID!): [TrainingSession]!
  }
  extend type Mutation {
    newPr(input: newPr): Pr!
  }
`
