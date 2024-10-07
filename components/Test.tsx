"use client";
import React from "react";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getProfileByID } from "@/queries/userQueries";
import { createClient } from "@/lib/supabase/client";

export default function Test({ profileID }: { profileID: string }) {
  const supabase = createClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery(getProfileByID(supabase, profileID));

  if (error) return <div>Test</div>;

  if (isLoading) return <div>Test</div>;

  return <pre>{JSON.stringify(profile, null, 2)}</pre>;
}
