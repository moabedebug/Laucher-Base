const { Pool } = require("pg")

module.exports = new Pool({
    user: 'Moabe',
    password: "Htinha11*",
    host: "localhost",
    port: 5432,
    database: "launchstoredb"
})