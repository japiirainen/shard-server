import { createUser } from '../qql-schema/user/user.services'
import { testConnect } from './db'

beforeAll(async () => await testConnect())
//afterAll(async () => await dropDb())

describe('UserModel test suite', () => {
  const input = {
    username: 'Joona',
    email: 'joona.piirainen@gmail.com',
    role: 'COACH',
    password: '123',
  }

  test('should create a user', async () => {
    const doc = await createUser(null, { input })
    expect(doc.username).toBe('Joona')
  })
})
