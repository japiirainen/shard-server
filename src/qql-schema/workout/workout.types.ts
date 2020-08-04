import gql from 'graphql-tag'

export default gql`
  enum PRIVACY {
    PRIVATE
    PUBLIC
  }

  type Workout {
    _id: ID!
    creator: User!
    name: String
    description: String
    exercises: [Exercise]
    duration: Int
    privacy: PRIVACY
  }

  input newWorkout {
    creator: ID!
    name: String!
    description: String!
    privacy: PRIVACY!
  }

  extend type Query {
    workouts: [Workout]!
    workout(_id: ID!): Workout!
  }

  extend type Mutation {
    newWorkout(input: newWorkout): Workout!
    addMovement(movement: ID!): Workout!
  }
`
