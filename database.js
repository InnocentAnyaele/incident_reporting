const {Client} = require('pg')
require('dotenv').config()

let local_postgres_string = {   
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.DBPORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

// our postgres connection parameters
const client = new Client(local_postgres_string)

module.exports = client