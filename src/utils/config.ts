require('dotenv').config()

interface config {
  options: {
    port: any
    dbURL: any
  }
  secrets: {}
}

export const config: config = {
  options: {
    port: process.env.PORT,
    dbURL: process.env.DB_URL,
  },
  secrets: {},
}
