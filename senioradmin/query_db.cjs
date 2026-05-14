const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Senior%40anandam67@db.vauisjeldrbnqwjvdmya.supabase.co:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    
    const res = await client.query(`SELECT value FROM site_settings WHERE key = 'hero_images'`);
    console.log('DB value:', res.rows[0]);
  } catch (err) {
    console.error('Error querying:', err);
  } finally {
    await client.end();
  }
}

run();
