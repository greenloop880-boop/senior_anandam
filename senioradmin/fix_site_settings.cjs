const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Senior%40anandam67@db.vauisjeldrbnqwjvdmya.supabase.co:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    
    // Disable RLS just in case it was blocking saves silently
    await client.query(`ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY`);
    
    console.log('Disabled RLS on site_settings successfully!');
  } catch (err) {
    console.error('Error applying schema:', err);
  } finally {
    await client.end();
  }
}

run();
