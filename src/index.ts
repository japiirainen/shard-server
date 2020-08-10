import express from 'express'
import { SDKError as MagicSDKError } from '@magic-sdk/admin'
import { applyMiddleware } from 'graphql-middleware'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './qql-schema/schema'
import { config } from './utils/config'
import { connect } from './db/connect'
import magic from './utils/magic'
import permissions from './qql-schema/permissions'

connect()

const port = config.options.port
const app = express()

export const didTokenCheck = function (req: express.Request, res: express.Response, next: express.NextFunction) {
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
  next()
}
app.use(didTokenCheck)

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: ({ req }) => {
    const user = req.user || null
    return { user }
  },
})

server.applyMiddleware({ app })

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))
