"use server";
import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";

export async function uploadFile(file: File) {
  const supabase = createClient();
  const path = "u_connect_docs" + randomUUID() + file.name;
  const response = await supabase.storage.from("documents").upload(path, file, {
    upsert: false,
  });

  if (!response.error) {
    const { data } = supabase.storage.from("documents").getPublicUrl(path);
    if (data.publicUrl) {
      return { url: data.publicUrl, error: null };
    }
  }

  return { url: null, error: "Failed to upload document" };
}
