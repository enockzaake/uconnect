import DashboardHeader from "@/components/DashboardHeader";
import { TableLoadingSkeleton } from "@/components/Loaders";
import React, { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getAllPrograms } from "@/actions/admin";
import Link from "next/link";

export default async function AllPrograms() {
  const { data, error } = await getAllPrograms();

  return (
    <div className="mx-4">
      <DashboardHeader title={"All programs"} action="new-program" />{" "}
      <Suspense key={""} fallback={<TableLoadingSkeleton />}>
        <Card className="flex flex-col overflow-y-auto flex-grow">
          <CardHeader>
            <CardTitle>All programs</CardTitle>
            <CardDescription>{data?.length} programs found</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Level</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Institution
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Date added
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Duration
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Full-time/Part-time
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length! > 0
                  ? data?.map((program: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium capitalize">
                          {program.level}
                        </TableCell>
                        <TableCell className="capitalize">
                          {program.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {program.institution || "institution name"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {program.created_at}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {program.duration}
                        </TableCell>
                        <TableCell>
                          {program.fulltime ? "Full time" : "Part time"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Link
                            // target="_black"
                            href={`/application-review/${program.id}`}
                            className="text-blue-700"
                          >
                            View
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  : "No applications found"}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>{data?.length}</strong>{" "}
              programs
            </div>
          </CardFooter>
        </Card>
      </Suspense>
    </div>
  );
}
