//  SETS UP THE CONNECTION POOL
const db = require("knex")(require('./knexfile').development);

// TEARS DOWN THE CONNECTION POOL
const closeConnection = () => db.destroy();

module.exports = {
  db,
  closeConnection
}