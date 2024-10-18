import React from "react";
import { Suspense } from "react";
import StudentProfileForm from "@/components/StudentProfileForm";
import { getUserProfile } from "@/actions/user";

export default async function Profile() {
  const { data } = await getUserProfile();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* @ts-ignore */}
      <StudentProfileForm profile={data} />
    </Suspense>
  );
}
