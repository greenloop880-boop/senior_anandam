import { S3Client, PutObjectCommand } from 'npm:@aws-sdk/client-s3@3.370.0';
import { getSignedUrl } from 'npm:@aws-sdk/s3-request-presigner@3.370.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { fileName, fileType, folder = 'uploads' } = await req.json()

    // Read secrets from Supabase environment
    const accessKeyId = Deno.env.get('R2_ACCESS_KEY_ID')
    const secretAccessKey = Deno.env.get('R2_SECRET_ACCESS_KEY')
    const endpoint = Deno.env.get('R2_ENDPOINT')
    const bucketName = Deno.env.get('R2_BUCKET_NAME')
    const publicUrl = Deno.env.get('R2_PUBLIC_URL')

    if (!accessKeyId || !secretAccessKey || !endpoint || !bucketName) {
      throw new Error('Missing R2 configuration in Supabase Secrets')
    }

    const s3 = new S3Client({
      region: 'auto',
      endpoint: endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })

    const ext = fileName.split('.').pop()
    const uniqueKey = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueKey,
      ContentType: fileType,
    })

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 300 })

    return new Response(
      JSON.stringify({
        presignedUrl,
        publicUrl: `${publicUrl}/${uniqueKey}`,
        key: uniqueKey
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
