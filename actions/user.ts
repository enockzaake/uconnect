"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {
  const supabase = createClient();
  let { data: profiles, error } = await supabase.from("profiles").select("*");

  return { data: profiles, error: error?.message };
}

export async function updateUserProfile() {}

export async function addProgram(programID: string) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: error?.message };
  }

  const { error: insert_error } = await supabase
    // @ts-ignore
    .from("chosen_programs")
    .insert([{ program_id: programID, user_id: user?.id }])
    .select();
  revalidatePath("/dashboard");

  if (insert_error?.code === "23505") {
    return { error: "Program already added to application list" };
  }

  return { error: insert_error?.message };
}

export async function removeProgram(chosenProgramID: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.getUser();

  if (error) {
    return { error: error?.message };
  }

  const { data, error: delete_error } = await supabase
    //@ts-ignore
    .from("chosen_programs")
    .delete()
    .eq("program_id", chosenProgramID);
  revalidatePath("/dashboard");

  return { error: delete_error?.message };
}

export async function getUserChosenPrograms() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { error: error?.message };
  }

  const { data: chosen_programs, error: error2 } = await supabase
    .from("profiles")
    .select(
      `id,first_name,last_name,status,email,chosen_programs(*,programs(*))`
    )
    .eq("id", data.user.id)
    .single();

  return { profile: chosen_programs, error: error2?.message };
}

export async function SubmitApplication() {
  const supabase = createClient();
  const {
    data: { user },
    error: user_error,
  } = await supabase.auth.getUser();

  if (user_error) return { error: user_error.message };

  const { error } = await supabase
    .from("profiles")
    .update({ status: "submitted" })
    .eq("id", user?.id!)
    .select();

  return { error: error?.message };
}

export async function getAllPrograms() {
  const supabase = createClient();

  const { data, error } = await supabase.from("programs").select("*");
  if (error) return { programs: [], error: error.message };

  return { programs: data, error: error };
}
