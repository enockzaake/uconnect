"use server";

import { supabaseAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (email: string, password: string) => {
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  // Get extra details for personalization eg country , programs etc and add to meta data

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // emailRedirectTo: `${origin}/auth/callback`,
      data: {
        countries: [],
        programs: [],
        level: "",
      },
    },
  });

  if (error) {
    return { error: error?.message };
  } else {
    const newProfile = await supabase
      .from("profiles")
      // @ts-ignore
      .insert([{ id: data.user?.id }]);

    if (newProfile.error) return { error: newProfile.error.message };
    // return { error: null };
    redirect("/dashboard");
  }
};

export const signInAction = async (email: string, password: string) => {
  const supabase = createClient();

  if (!email || !password) {
    return { error: "Missing email or password" };
  }

  //@ts-ignore
  const res = await supabaseAdminClient.rpc("get_user_by_email", { email });

  if (res.error) {
    return { error: "User not found" };
  }

  //@ts-ignore
  const isAdmin = res.data[0]?.raw_app_meta_data?.admin;
  if (isAdmin) {
    return { error: "Admins cannot log in through this portal" };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // return { error: null };

  redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

// -----------------------------------------------------------
// ADMIN AUTH

export const AdminSignInAction = async (email: string, password: string) => {
  const supabase = createClient();

  //@ts-ignore
  const res = await supabaseAdminClient.rpc("get_user_by_email", {
    email: email,
  });

  //@ts-ignore
  const isAdmin = res.data[0].raw_app_meta_data.admin;
  if (!isAdmin) return { error: "Invalid credentials" };

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!email || !password) {
    return { error: "Missing email or password" };
  }

  if (error) {
    return { error: error.message };
  }

  return redirect("/admin-dashboard");
};

const x = {
  countries: ["usa", "canada"],
  programs: ["software engineering", "mechanical"],
  level: "bachelors",
};
