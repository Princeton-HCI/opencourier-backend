const { Pool } = require('pg')

// Environment variable should be set in the environment or through a .env file
require('dotenv').config() // Uncomment this line if you are using a .env file to manage environment variables

const dbConfig = {
  // postgres://user:password@postgres-shovel:5433/shovel
  connectionString: process.env.SHOVEL_DATABASE_CONNECTION_HOST_STRING,
  connectionTimeoutMillis: 20000,
  query_timeout: 20000,
  statement_timeout: 20000,
}

const poolConfig = {
  ...dbConfig,
  max: 8,
  idleTimeoutMillis: 60000,
}

const pool = new Pool(poolConfig)

async function getShovelLatest() {
  try {
    const result = await pool.query('SELECT num FROM shovel.latest')
    console.log('Latest Shovel Number:', result.rows[0].num)
    return Number(result.rows[0].num)
  } catch (error) {
    console.error('Failed to fetch the latest shovel number:', error)
    throw error // Rethrow or handle as needed
  } finally {
    await pool.end() // Close the pool
  }
}

getShovelLatest()
  .then((num) => {
    console.log('Shovel latest block number:', num)
  })
  .catch((err) => {
    console.error('Error running query:', err)
  })
