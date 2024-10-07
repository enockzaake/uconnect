// "use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Menu, XCircle } from "lucide-react";
import { useSideBar } from "@/store";
import { getUserChosenPrograms } from "@/actions/user";
import {
  RemoveChosenProgramButton,
  SubmitApplicationButton,
} from "@/components/ActionBUttons";

// Mock data
const applicant = {
  name: "Jane Doe",
  id: "A12345",
  email: "jane.doe@example.com",
  overallStatus: "In Progress",
  programs: [
    {
      name: "Computer Science",
      degree: "Bachelor of Science",
      institution: "Tech University",
      location: "Silicon Valley, CA",
      status: "Accepted",
      progress: 100,
      deadline: "2023-05-15",
    },
    {
      name: "Data Science",
      degree: "Master of Science",
      institution: "Data Institute",
      location: "New York, NY",
      status: "In Review",
      progress: 50,
      deadline: "2023-06-30",
    },
    {
      name: "Electrical Engineering",
      degree: "Bachelor of Engineering",
      institution: "Engineering College",
      location: "Boston, MA",
      status: "Pending",
      progress: 25,
      deadline: "2023-07-31",
    },
  ],
};

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div
      className="bg-blue-600 h-2.5 rounded-full"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "Accepted":
      return <CheckCircle className="text-green-500" />;
    case "Rejected":
      return <XCircle className="text-red-500" />;
    default:
      return <Clock className="text-yellow-500" />;
  }
};

export default async function Dashboard() {
  // const { toggleSideBar } = useSideBar();

  const { chosen_programs, error } = await getUserChosenPrograms();
  if (error) return <div className="">{error}</div>;

  return (
    <main className="flex-1 p-6 overflow-auto">
      <Button className="md:hidden mb-4">
        {/* onClick={toggleSideBar} */}
        <Menu />
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Applicant Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-xl font-semibold">{applicant.name}</h2>
              <p className="text-sm text-gray-500">
                Applicant ID: {applicant.id}
              </p>
              <p className="text-sm text-gray-500">{applicant.email}</p>
            </div>
            <Badge
              variant={
                applicant.overallStatus === "In Progress"
                  ? "default"
                  : "secondary"
              }
              className="mt-2 md:mt-0"
            >
              {applicant.overallStatus}
            </Badge>
            <SubmitApplicationButton />
          </div>
        </CardContent>
      </Card>

      {chosen_programs?.map((program, index: number) => (
        <div key={index} className="flex items-center justify-between max-w-lg">
          {index + 1}
          {"."}
          {/* @ts-ignore */}
          {program.programs.name}
          <RemoveChosenProgramButton programID={program.id!} />
        </div>
      ))}

      <h3 className="text-lg font-semibold mb-4">Selected Programs</h3>
      <div className="space-y-4">
        {applicant.programs.map((program, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h4 className="font-medium text-lg">{program.name}</h4>
                  <p className="text-sm text-gray-500">{program.degree}</p>
                </div>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <StatusIcon status={program.status} />
                  <span className="text-sm font-medium">{program.status}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Institution</p>
                  <p className="text-sm text-gray-500">{program.institution}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-gray-500">{program.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Application Deadline</p>
                  <p className="text-sm text-gray-500">{program.deadline}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Application Progress</p>
                  <ProgressBar progress={program.progress} />
                </div>
              </div>
              <Button variant="outline" className="w-full md:w-auto">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
