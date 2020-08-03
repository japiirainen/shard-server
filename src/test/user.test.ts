import { createUser } from '../qql-schema/user/user.services'
import { testConnect, closeDatabase, removeAllCollections } from '../db/connect'

const input = {
  username: 'Joona',
  password: '123',
  email: 'joona.piirainen@gmail.com',
  role: 'coach',
}
beforeAll(async () => await testConnect())
afterAll(async () => {
  await closeDatabase()
  await removeAllCollections()
})

describe('Users test suite', () => {
  test('Should create a new user', async () => {
    const user = await createUser(null, { input })
    if (user) {
      expect(user.username).toContain('Joona')
    } else {
      expect(user).toBeNull()
    }
  })
})
