import { supabase } from './supabase';

export const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL || '';

/**
 * Upload a file to R2 securely using a Supabase Edge Function.
 * This completely removes AWS/Cloudflare secrets from the frontend bundle.
 */
export async function uploadToR2(file, folder = 'uploads') {
  try {
    // 1. Request a presigned upload URL from our secure Edge Function
    const { data, error } = await supabase.functions.invoke('get-presigned-url', {
      body: { 
        fileName: file.name, 
        fileType: file.type,
        folder 
      }
    });

    if (error || data?.error) {
      throw new Error(error?.message || data?.error || 'Failed to get upload URL');
    }

    const { presignedUrl, publicUrl } = data;

    // 2. Upload the raw file directly to Cloudflare R2
    const uploadRes = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });

    if (!uploadRes.ok) {
      const text = await uploadRes.text().catch(() => uploadRes.status);
      throw new Error(`R2 upload failed: ${text}`);
    }

    // 3. Return the public URL for saving to the DB
    return publicUrl;
  } catch (err) {
    console.error('Secure R2 upload failed:', err.message);
    throw err;
  }
}

/**
 * Delete a file from R2
 * Currently a no-op frontend function. For full security, deletes should also 
 * be routed through a secure backend edge function if required.
 */
export async function deleteFromR2(fileUrl) {
  console.warn('Delete requires a backend edge function setup. Currently skipping.');
}
