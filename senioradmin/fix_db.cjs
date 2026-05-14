const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Senior%40anandam67@db.vauisjeldrbnqwjvdmya.supabase.co:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    
    // 1. Add Address column
    await client.query(`ALTER TABLE communities ADD COLUMN IF NOT EXISTS address JSONB DEFAULT '{}'::jsonb`);
    console.log('Added address column.');

    // 2. Setup Storage bucket for images
    await client.query(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('senior_storage', 'senior_storage', true) 
      ON CONFLICT (id) DO UPDATE SET public = true;
    `);
    
    // Drop existing policies if they exist so we can recreate them
    await client.query(`DROP POLICY IF EXISTS "Public Access" ON storage.objects;`);
    await client.query(`DROP POLICY IF EXISTS "Auth Insert" ON storage.objects;`);
    await client.query(`DROP POLICY IF EXISTS "Auth Update" ON storage.objects;`);
    await client.query(`DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;`);

    // Create policies for the bucket
    await client.query(`
      CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'senior_storage');
      CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'senior_storage');
      CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING (bucket_id = 'senior_storage');
      CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING (bucket_id = 'senior_storage');
    `);
    console.log('Supabase storage configured successfully.');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
