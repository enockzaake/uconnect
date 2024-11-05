import { createClient } from "@/lib/supabase/client";
import { TypedSupabaseClient } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function getProfileByID(client: TypedSupabaseClient, profileID: string) {
  console.log("Fetching profile");
  return client.from("profiles").select("*").eq("id", profileID).single();
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("events").select("*");
      console.log("DATA:", data);
      return data;
    },
  });
}
