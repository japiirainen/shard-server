import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import apiSchema from './qql-schema/schema'
import { config } from './utils/config'
import { connect } from './db/connect'

connect()

const server = new ApolloServer({
  ...apiSchema,
  context: ({ req, res }) => ({ req, res }),
})

const app = express()

server.applyMiddleware({ app })

const port = config.options.port

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))
