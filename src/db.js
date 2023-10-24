// Import the 'Client' class from the 'pg' library, which is a PostgreSQL database driver.
const { Client } = require("pg");

// Import the 'DB_URI' from a configuration file that contains the database connection details.
const { DB_URI } = require("../config");

// Create a new client instance for connecting to the PostgreSQL database using the 'DB_URI'.
const client = new Client(DB_URI);

// Establish a connection to the PostgreSQL database by calling the 'connect' method on the client.
client.connect();

// Export the 'client' instance, making it available for use in other parts of the application.
module.exports = client;
