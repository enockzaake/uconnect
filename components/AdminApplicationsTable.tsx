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

import { getAllAppliactions } from "@/actions/admin";
import Link from "next/link";

export default async function AdminApplicationsTable() {
  const { data, error } = await getAllAppliactions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
        <CardDescription>{data?.length} applications found</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">
                Phone number
              </TableHead>
              <TableHead className="hidden md:table-cell">DOB</TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead className="hidden md:table-cell">
                Academic level required
              </TableHead>
              <TableHead className="hidden md:table-cell">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length! > 0
              ? data?.map((profile, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {profile.first_name + " "} {profile.last_name}
                    </TableCell>
                    <TableCell>{profile.email}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {profile.mobile}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {" "}
                      {profile.dob}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {profile.gender}
                    </TableCell>
                    <TableCell>Bachelors</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Link
                        // target="_black"
                        href={`/application-review/${profile.id}`}
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
          applications
        </div>
      </CardFooter>
    </Card>
  );
}
