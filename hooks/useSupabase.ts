import { useMemo } from "react";
import { createClient } from "@/lib/supabase/client";

export function useSupabaseBrowser() {
  return useMemo(createClient, []);
}
