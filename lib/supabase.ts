import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export async function uploadFile(
  file:
    | string
    | ArrayBuffer
    | ArrayBufferView
    | Blob
    | Buffer
    | File
    | FormData
    | NodeJS.ReadableStream
    | ReadableStream<Uint8Array>
    | URLSearchParams,
  bucketName: string,
  filePath: string
) {
  return await supabaseClient.storage.from(bucketName).upload(filePath, file);
}

export function getPublicUrl(bucketName: string, filePath: string) {
  return supabaseClient.storage.from(bucketName).getPublicUrl(filePath);
}
