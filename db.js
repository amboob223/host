const POOL = require("pg").Pool
const pool = new POOL({
    connectionString:process.env.DATABASE_URL
})

module.exports = pool;