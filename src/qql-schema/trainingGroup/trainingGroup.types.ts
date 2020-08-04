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
  }

  input newMember {
    userId: ID!
    groupId: ID!
  }

  input addWorkout {
    workoutId: ID!
  }

  extend type Query {
    trainingGroup(_id: ID!): TrainingGroup!
    allTrainingGroups: [TrainingGroup]!
  }

  extend type Mutation {
    newTrainingGroup(input: newTrainingGroup): TrainingGroup!
    addMemberToTrainingGroup(input: newMember): User!
    addWorkoutToTrainingGroup(input: addWorkout): TrainingGroup!
  }
`
