import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { UpdateEvent } from "@/components/ActionBUttons";
import Image from "next/image";
export default function AllPrograms() {
  const results = [
    { id: 1, title: "Study in Germany", description: "12th Nov 2024" },
    {
      id: 2,
      title: "Study in Canada",
      description: "9  Dec 2024",
    },
    {
      id: 3,
      title: "Career guidance event",
      description: "9th October   2024",
    },
  ];
  const view: string = "grid";
  return (
    <div className="mx-4">
      <DashboardHeader title={"Manage events"} action="new-event" />

      <Suspense key={""} fallback={<div>Loading...</div>}>
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
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg border ${
                  view === "grid"
                    ? ""
                    : "flex flex-col sm:flex-row sm:items-center sm:space-x-4"
                }`}
              >
                <Image
                  src="/images/event.jpg"
                  width={200}
                  height={200}
                  className="w-full object-f rounded"
                  alt="Event image"
                />
                <div className={view === "list" ? "flex-grow" : ""}>
                  <h3 className="font-semibold">{result.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {result.description}
                  </p>
                  <UpdateEvent eventID={""} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
