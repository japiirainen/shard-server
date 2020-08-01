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
    
    input Id {
        _id: ID!
    }

    type Query {
		users: [User]
        user: User(id: Id)
	}

	type Mutation {
		register(userInfo: UserInfo): User!
	}
`
