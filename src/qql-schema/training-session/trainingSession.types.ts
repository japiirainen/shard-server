import gql from 'graphql-tag'

export default gql`
  scalar Date

  type TrainingSession {
    user: User!
    workout: Workout!
    createdAt: Date!
  }

  type Pr {
    user: User!
    movement: Movement!
    result: String!
    createdAt: Date!
  }

  input newPr {
    user: ID!
    movement: ID!
    result: Int!
  }

  input newTrainingSession {
    user: ID!
    workout: ID!
  }

  extend type Query {
    trainingSessions: [TrainingSession]!
    trainingSessionsByUser(_id: ID!): [TrainingSession]!
  }
  extend type Mutation {
    newPr(input: newPr): Pr!
    addTrainingSession(input: newTrainingSession): TrainingSession!
  }
`
