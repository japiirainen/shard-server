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

  extends type Query {
      trainingSessions: [TrainingSessions]!
      trainingSessionsByUser(_id: ID!): [TrainingSessions]!
  }
`
