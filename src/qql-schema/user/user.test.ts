import { createUser } from './user.services'
import { testConnect, closeDatabase, removeAllCollections } from '../../db/connect'

const userInfo = {
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

test('Should create a new user', async () => {
  const user = await createUser(null, { userInfo })
  expect(user.username).toContain('Joona')
  return
})

afterEach(async () => {
  await removeAllCollections()
})
