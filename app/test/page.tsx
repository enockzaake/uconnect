import { getUserProfile } from "@/actions/user";
import React from "react";

const Page = async () => {
  const { data, error } = await getUserProfile();
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;
