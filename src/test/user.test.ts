import { makeExecutableSchema } from 'graphql-tools'
import { graphql } from 'graphql'
import user from '../qql-schema/user/user.types'
import workout from '../qql-schema/workout/workout.types'
import movement from '../qql-schema/movement/movements.types'
import trainingGroup from '../qql-schema/trainingGroup/trainingGroup.types'
// the actual resolvers
import { resolvers } from '../qql-schema/resolvers'
// the mock service
import { allUsers } from './mocks/user.mocks'

// a nice structure for test cases
const createUserTestCase = {
  id: 'All users test case',
  query: `
  query {
    users {
      username
      role
      email
    }
  }
    `,
  variables: {},

  // injecting the mock movie service with canned responses
  context: { movieService: { allUsers } },

  // expected result
  expected: {
    data: {
      users: [
        { username: 'joona', email: 'joona.piirainen@gmail.com', role: 'ATHLETE' },
        { username: 'antti', email: 'antti.pentti@gmail.com', role: 'COACH' },
      ],
    },
  },
}

describe('My Test Cases', () => {
  // array of all test cases, just 1 for now
  const cases = [createUserTestCase]
  // reading the actual schema
  const typeDefs = [user, workout, trainingGroup, movement]
  // make the actual schema and resolvers executable
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  // running the test for each case in the cases array
  cases.forEach(obj => {
    const { id, query, variables, context, expected } = obj

    test(`query: ${id}`, async () => {
      const result = await graphql(schema, query, null, context, variables)
      return expect(result).toEqual(expected)
    })
  })
})
