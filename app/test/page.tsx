import AdvancedSearchComponent from "@/components/search-component";
import React, { Suspense } from "react";

const Page = async () => {
  return (
    <Suspense>
      <AdvancedSearchComponent />;
    </Suspense>
  );
};

export default Page;

// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from "@tanstack/react-query";
// import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";

// import { createClient } from "@/lib/supabase/server";
// import { getProfileByID } from "@/queries/userQueries";
// import Test from "@/components/Test";

// export default async function ProfilePage({
//   params,
// }: {
//   params: { id: number };
// }) {
//   const queryClient = new QueryClient();

//   const supabase = createClient();
//   const { data, error } = await supabase.auth.getUser();

//   if (error) {
//     return <div className="">Profle not found</div>;
//   }

//   await prefetchQuery(queryClient, getProfileByID(supabase, data.user?.id));

//   return (
//     // HydrationBoundary is a Client Component, so hydration will happen there.
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Test profileID={data.user?.id} />
//     </HydrationBoundary>
//   );
// }
