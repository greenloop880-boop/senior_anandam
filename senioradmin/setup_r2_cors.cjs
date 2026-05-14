/**
 * Run this ONCE to configure CORS on your Cloudflare R2 bucket.
 * After running, the admin panel can upload images directly from the browser.
 *
 * Usage:  node setup_r2_cors.cjs
 */

const { S3Client, PutBucketCorsCommand, GetBucketCorsCommand } = require('@aws-sdk/client-s3');

// ── Config (matches your .env) ──────────────────────────────────────────────
const ACCOUNT_ID  = '6a67c43484755e70c286f47267a39e1e';
const ACCESS_KEY  = 'dc69f593762f937798c1af31b2600fd8';
const SECRET_KEY  = '7ce5010dca24077d453fd3e1b84c6f340e155b68f04a9c830656dc718d76c6da';
const BUCKET      = 'storage';
const ENDPOINT    = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

const s3 = new S3Client({
  region: 'auto',
  endpoint: ENDPOINT,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
});

const CORS_RULES = {
  Bucket: BUCKET,
  CORSConfiguration: {
    CORSRules: [
      {
        AllowedOrigins: ['*'],                                           // Allow all origins (lock down to your domain in prod)
        AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
        AllowedHeaders: ['*'],
        ExposeHeaders:  ['ETag', 'Content-Length'],
        MaxAgeSeconds:  3600,
      },
    ],
  },
};

async function run() {
  try {
    console.log('Setting CORS policy on R2 bucket:', BUCKET);
    await s3.send(new PutBucketCorsCommand(CORS_RULES));
    console.log('✅  CORS set successfully!\n');

    // Verify
    const { CORSRules } = await s3.send(new GetBucketCorsCommand({ Bucket: BUCKET }));
    console.log('Verified CORS rules:', JSON.stringify(CORSRules, null, 2));
  } catch (err) {
    console.error('❌  Failed to set CORS:', err.message);
    process.exit(1);
  }
}

run();
