const { Client } = require('pg');
const connectionString = 'postgresql://postgres:Senior%40anandam67@db.vauisjeldrbnqwjvdmya.supabase.co:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    await client.query(`ALTER TABLE communities ADD COLUMN IF NOT EXISTS brochure_url TEXT`);
    console.log('Added brochure_url column successfully!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}
run();
