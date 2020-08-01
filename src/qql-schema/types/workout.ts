import gql from 'graphql-tag'

export default gql`
	type TrainingGroup {
		_id: ID!
		name: String!
		admin: User!
		members: [User]
		workouts: [Workouts]
	}

	type Query {
		trainingGroup: TrainingGroup!
		allTrainingGroups: [TrainingGroup]!
	}

	input newTrainingGroup {
		name: String!
		admin: User!
		members: [User]
		workouts: [Workout]
	}

	type Mutation {
		register(newTrainingGroup: newTrainingGroup): newTrainingGroup
	}
`
