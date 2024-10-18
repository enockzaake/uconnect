"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { uploadFile } from "./shared";

export async function getUserProfile() {
  const supabase = createClient();
  const {
    data: { user },
    error: user_error,
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: user_error?.message };
  }
  let { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return { data: profile, error: error?.message };
}

export async function updateProfile(form: FormData) {
  const supabase = createClient();
  const {
    data: { user },
    error: user_error,
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: user_error?.message };
  }

  const entries = Object.fromEntries(form.entries());

  let updatedData = entries.jsonData
    ? convertStringNumbers(JSON.parse(entries.jsonData as string))
    : {};

  let newFileURLS: Record<string, string> = {};
  let failedUploads: Record<string, string> = {};

  const uploadPromises = Object.entries(entries).map(async ([key, value]) => {
    if (value instanceof File && value.size > 0) {
      const { url, error } = await uploadFile(value);

      if (url) {
        newFileURLS[key] = url;
      }

      if (error) {
        failedUploads[key] = error;
      }
    }
  });

  await Promise.all(uploadPromises);

  const dataToUpdate = { ...updatedData, ...newFileURLS };

  const { data, error } = await supabase
    .from("profiles")
    .update(dataToUpdate)
    .eq("id", user?.id)
    .select();

  console.log("UPDATE DATA:", data);
  console.log("UPDATE ERROR :", error);

  revalidatePath("/profile");

  return { error: error?.message };
}

export async function addProgram(programID: string) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.id) {
    return { error: error?.message };
  }

  const { error: insert_error } = await supabase
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
    .eq("id", chosenProgramID);
  revalidatePath("/dashboard");

  return { error: delete_error?.message };
}

// Get all data for the dashboard
export async function getUserChosenPrograms() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { error: error?.message };
  }

  const { data: chosen_programs, error: error2 } = await supabase
    .from("profiles")
    .select(
      `id,first_name,last_name,status,email,progress,mobile,chosen_programs(*,programs(name,institution,logo,level,country,duration))`
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

  if (searchTerm) {
    query = query.ilike("name", `%${searchTerm}%`);
  } else if (meta_data?.programs) {
    query = query.or(
      meta_data.programs.map((program: string) => `name.ilike.%${program}%`)
    );
  }

  if (level) {
    query = query.eq("level", level);
  } else if (meta_data?.level) {
    query = query.eq("level", meta_data.level);
  }

  if (country && country !== "all") {
    query = query.eq("country", country);
  } else if (country === "all") {
    query;
  } else {
    query = query.in("country", meta_data?.countries);
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

const convertStringNumbers = (obj: Record<string, any>) => {
  for (let key in obj) {
    if (!isNaN(obj[key])) {
      obj[key] = Number(obj[key]); // Convert to number
    }
  }
  return obj;
};
