"use server";
import { createClient } from "@/lib/supabase/server";

export async function getUserProfile() {
  const supabase = createClient();
  let { data: profiles, error } = await supabase.from("profiles").select("*");

  return { data: profiles, error: error?.message };
}

export async function updateUserProfile() {}

export async function addProgram() {}
export async function removeProgram() {}
