import gql from 'graphql-tag'

export default gql`
  type TrainingGroup {
    _id: ID!
    name: String!
    admin: User!
    members: [User]
    workouts: [Workout]
  }

  input newTrainingGroup {
    name: String!
    admin: ID!
    members: [ID!]
    workouts: [ID!]
  }
  extend type Query {
    trainingGroup: TrainingGroup!
    allTrainingGroups: [TrainingGroup]!
  }

  extend type Mutation {
    newTrainingGroup(input: newTrainingGroup): TrainingGroup
  }
`
