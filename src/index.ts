import express from 'express'
import { SDKError as MagicSDKError } from '@magic-sdk/admin'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './qql-schema/schema'
import { config } from './utils/config'
import { connect } from './db/connect'
import magic from './utils/magic'

connect()

const port = config.options.port
const app = express()
//@ts-ignore
app.set('views')
app.set('view engine', 'ejs')

app.get('/login', function (req, res) {
  res.render('login', {
    MAGIC_PUBLISHABLE_KEY: process.env.MAGIC_PUBLISHABLE_KEY,
  })
})

const didTokenCheck = function (req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!!req.headers.authorization) {
    try {
      const didToken = magic.utils.parseAuthorizationHeader(req.headers.authorization)
      magic.token.validate(didToken)

      req.user = {
        issuer: magic.token.getIssuer(didToken),
        publicAddress: magic.token.getPublicAddress(didToken),
        claim: magic.token.decode(didToken)[1],
      }
    } catch (error) {
      res.status(401).send()

      return error instanceof MagicSDKError ? next(error) : next({ message: 'Invalid DID token' })
    }
  }
}
app.use(didTokenCheck)

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const user = req.user || null
    return { user }
  },
})

server.applyMiddleware({ app })

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))
