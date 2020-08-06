import { createUser } from '../qql-schema/user/user.services'
import { testConnect, dropDb } from './db'

testConnect()
afterAll(async () => await dropDb())

describe('UserModel test suite', () => {
  const input = {
    username: 'Joona',
    email: 'joona.piirainen1@gmail.com',
    role: 'COACH',
    password: '123',
  }

  test('should create a user', async () => {
    const doc = await createUser(null, { input })
    expect(doc.username).toBe('Joona')
    expect(doc.email).toBe('joona.piirainen1@gmail.com')
    expect(doc.role).toBe('COACH')
  })
})
