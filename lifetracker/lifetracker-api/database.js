require('dotenv').config()
const {Pool} = require('pg')

const pool = new Pool ({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT,
    url: process.env.DATABASE_URL
})

module.exports = pool