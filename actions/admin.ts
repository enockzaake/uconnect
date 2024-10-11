"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadFile } from "./shared";

export async function getAllAppliactions() {
  // First fetch a list of users whose status is "submitted"
  // Pass in filters
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return { data: null, error: error.message };

  const { data, error: error2 } = await supabase
    .from("profiles")
    .select("id,status,first_name,last_name,email,mobile,dob,gender")
    .eq("status", "submitted");
  if (error) return { data: [], error: error2?.message };

  return { data: data, error: error };
}

export async function getUserProfile(profileID: string) {
  //Get full user profile and list of programs they chose
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return { data: null, error: error.message };

  const { data, error: error2 } = await supabase
    .from("profiles")
    .select(`*,chosen_programs(*,programs(*))`)
    .eq("id", profileID)
    .single();

  if (error) return { data: data, error: error2?.message };

  return { data: data, error: error };
}

export async function sendMessage(profileID: string) {
  //  Send internal app message and email to the applicant
}

export async function getAllPrograms() {
  const supabase = createClient();

  const { data, error } = await supabase.from("programs").select("*");
  if (error) return { programs: [], error: error.message };

  return { data: data, error: error };
}

export async function newProgram(form: FormData | any): Promise<any> {
  const supabase = createClient();
  const imageFile = form.get("image") as File;
  const name = form.get("name") as string;
  const level = form.get("level") as string;
  const institution = form.get("institution") as string;
  const duration = form.get("duration") as string;
  const fulltime = !!(form.get("fulltime") as string);
  const description = form.get("image") as string;

  let imageURL = null;
  try {
    if (imageFile) {
      const { url, error } = await uploadFile(imageFile);
      if (error) return { error: error };
      imageURL = url;
    }
    const data = {
      name: name,
      level: level,
      institution: institution,
      duration: duration,
      fulltime: fulltime,
      description: description,
      image: imageURL,
    };
    const res = await supabase.from("programs").insert(data);

    return { error: res.error?.message };
  } catch (error: any) {
    console.log("ERROR:", error.message);
    return { error: error.message };
  }
}

export async function newEvent(form: FormData) {}
export async function getEvents(form: FormData) {}
export async function updateEvent(form: FormData) {}
export async function deleteEvent(eventID: string) {}

export async function addApplicationReviewer(email: string, fullName: string) {
  // Create accounts with sub-previliges to help in application reviwing
}
