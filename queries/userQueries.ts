import { TypedSupabaseClient } from "@/types";

export function getProfileByID(client: TypedSupabaseClient, profileID: string) {
  console.log("Fetching profile");
  return client.from("profiles").select("*").eq("id", profileID).single();
}

export async function getPrograms() {}
