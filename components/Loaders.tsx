import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const Spinner = () => {
  return (
    <div
      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export function TableLoadingSkeleton() {
  return (
    <div className="flex flex-col space-y-1 mx-2">
      {[1, 2, 3, 4, 5].map((index: number) => (
        <div key={index} className="flex gap-1">
          <Skeleton className="h-[50px] w-[250px]" />
          <Skeleton className="h-[50px] w-[250px]" />
          <Skeleton className="h-[50px] w-[250px]" />
          <Skeleton className="h-[50px] w-[250px]" />
          <Skeleton className="h-[50px] w-[250px]" />
          <Skeleton className="h-[50px] w-[250px]" />
        </div>
      ))}
    </div>
  );
}
