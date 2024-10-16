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

export async function getAllPrograms(
  searchTerm?: string,
  country?: string,
  level?: string
) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  const meta_data = user.user?.user_metadata;

  let query = supabase.from("programs").select("*");

  // Apply filters based on user metadata if parameters are not provided
  if (!searchTerm && meta_data?.programs) {
    query = query.or(
      meta_data?.programs
        .map((program: string) => `name.ilike.%${program}%`)
        .join(",")
    );
  }

  if (!level && meta_data?.level) {
    query = query.eq("level", meta_data?.level);
  }

  if (country === "default" && meta_data?.countries) {
    query = query.in("country", meta_data?.countries);
  }

  // Apply filters based on provided parameters
  if (searchTerm) {
    query = query.ilike("name", `%${searchTerm}%`);
  }

  if (country && country !== "all" && country !== "default") {
    query = query.eq("country", country);
  }

  if (level) {
    query = query.eq("level", level);
  }

  const { data, error } = await query;

  if (error) return { programs: [], error: error.message };
  return { programs: data, error: null };
}

export async function getAvailableCountries() {
  const supabase = createClient();

  const { data, error } = await supabase.from("programs").select("country");

  let countries: string[] = [];

  data?.forEach((entry) => {
    //@ts-ignore
    if (entry.country && !countries.includes(entry.country)) {
      //@ts-ignore
      countries.push(entry.country);
    }
  });

  return { data: countries, error: error?.message };
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

// {
//   countries: [ 'usa', 'canada' ],
//   level: 'bachelors',
//   programs: [ 'software engineering', 'mechanical' ],
// }
