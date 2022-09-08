const {Client} = require('pg')
require('dotenv').config()

// our postgres connection parameters
const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.DBPORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

module.exports = client