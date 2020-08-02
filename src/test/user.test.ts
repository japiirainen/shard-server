import { createUser } from '../qql-schema/user/user.services'
import { testConnect, closeDatabase, removeAllCollections } from '../db/connect'

const userInfo = {
  username: 'Joona',
  password: '123',
  email: 'joona.piirainen@gmail.com',
  role: 'coach',
}

beforeAll(() => testConnect())
afterAll(async () => {
  await closeDatabase()
  await removeAllCollections()
})

test('Should create a new user', async () => {
  const user = await createUser(null, { userInfo })
  expect(user.username).toContain('Joona')
}, 3000)
