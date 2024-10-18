import { Suspense } from "react";

import { getAllPrograms } from "@/actions/user";

import SearchBar from "@/components/SearchAndFilters";
import SearchResults from "@/components/SearchResults";

export default async function SearchPage({
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const view: string = "grid";

  const { programs, error } = await getAllPrograms(
    searchParams.q,
    searchParams.country
  );

  if (error) return <div className="">{error}</div>;

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-grow">
          <SearchBar />
        </div>
      </div>

      <Suspense
        key={searchParams.q + searchParams.country}
        fallback={<div>Loading...</div>}
      >
        {/* @ts-ignore */}
        <SearchResults programs={programs} />
      </Suspense>
    </div>
  );
}
