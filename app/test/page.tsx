// import { getUserProfile } from "@/actions/user";
// import React from "react";

// const Page = async () => {
//   const { data, error } = await getUserProfile();

//   return (
//     <div>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default Page; 

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";

import { createClient } from "@/lib/supabase/server";
import { getProfileByID } from "@/queries/userQueries";
import Test from "@/components/Test";

export default async function ProfilePage({
  params,
}: {
  params: { id: number };
}) {
  const queryClient = new QueryClient();

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return <div className="">Profle not found</div>;
  }

  await prefetchQuery(queryClient, getProfileByID(supabase, data.user?.id));

  return (
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Test profileID={data.user?.id} />
    </HydrationBoundary>
  );
}
