require('dotenv').config()

interface config {
  options: {
    port: any
    dbURL: any
  }
  secrets: {
    magicKey: string | undefined
  }
}

export const config: config = {
  options: {
    port: process.env.PORT,
    dbURL: process.env.DB_URL,
  },
  secrets: {
    magicKey: process.env.MAGIC_SECRET_KEY,
  },
}
