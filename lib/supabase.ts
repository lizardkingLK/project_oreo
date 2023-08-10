import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

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
  pathName: string
) {
  const { data, error } = await supabaseClient.storage
    .from(bucketName)
    .upload(pathName, file);
  if (error) {
    return { error };
  } else {
    return { data };
  }
}

export function getPublicUrl(bucket: string, path: string) {
  return supabaseClient.storage.from(bucket).getPublicUrl(path);
}
