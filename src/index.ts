import express from 'express'
import { applyMiddleware } from 'graphql-middleware'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './qql-schema/schema'
import { config } from './utils/config'
import { connect } from './db/connect'
import { didTokenCheck } from './utils/magic'
import permissions from './qql-schema/permissions'

connect()

const port = config.options.port
const app = express()

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
