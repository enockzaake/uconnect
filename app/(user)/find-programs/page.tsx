import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Grid2X2, List, SlidersHorizontal } from "lucide-react";

import { getAllPrograms } from "@/actions/user";
import { AddChosenProgramButton } from "@/components/ActionBUttons";
import Image from "next/image";
import SearchBar from "@/components/SearchAndFilters";
import Link from "next/link";

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

        <Button variant="outline" className="border-gray-700">
          <Link href="/find-programs">Clear all filters</Link>
        </Button>

        <Button
          variant="outline"
          size="icon"
          // onClick={() => setView(view === "grid" ? "list" : "grid")}
        >
          {view === "grid" ? (
            <List className="h-4 w-4" />
          ) : (
            <Grid2X2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div
          className={`overflow-y-auto flex-grow ${
            view === "grid" ? "pr-2" : "pr-4"
          }`}
        >
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }
          >
            {programs.length > 0
              ? programs.map((program, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg border ${
                      view === "grid"
                        ? ""
                        : "flex flex-col sm:flex-row sm:items-center sm:space-x-4"
                    }`}
                  >
                    <Image
                      alt="image"
                      width={200}
                      height={200}
                      className="w-full h-40 rounded"
                      style={{
                        objectFit: "cover",
                      }}
                      src="https://www.bestchoiceschools.com/wp-content/uploads/2021/12/shutterstock_1058078960-scaled.jpg"
                    />
                    <div className={view === "list" ? "flex-grow" : ""}>
                      <h3 className="font-semibold capitalize">
                        {program.name?.toLowerCase()}
                      </h3>
                      <AddChosenProgramButton
                        programID={program.id as string}
                      />
                      <p className="text-sm text-muted-foreground">
                        {/* @ts-ignore */}
                        {program.description}
                      </p>
                    </div>
                  </div>
                ))
              : "No programs found"}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
