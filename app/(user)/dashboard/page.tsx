import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Menu, XCircle } from "lucide-react";
import { getUserChosenPrograms } from "@/actions/user";
import {
  RemoveChosenProgramButton,
  SubmitApplicationButton,
} from "@/components/ActionBUttons";
import { sendMessage } from "@/actions/admin";
import Logo from "@/components/Logo";

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
  await sendMessage("");

  const { profile, error } = await getUserChosenPrograms();
  if (error) return <div className="">{error}</div>;

  return (
    <>
      <main className="flex-1  p-3 sm:p-6 overflow-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Applicant Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  {profile?.first_name + " " + profile?.last_name}
                </h2>
                <p className="text-sm text-gray-500">
                  Applicant ID: {profile?.id}
                </p>
                <p className="text-sm text-gray-500">{profile?.email}</p>
              </div>
              <Badge
                variant={
                  profile?.status === "pending" ? "default" : "secondary"
                }
                className="mt-2 md:mt-0"
              >
                {profile?.status}
              </Badge>
              <SubmitApplicationButton />
            </div>
          </CardContent>
        </Card>

        <h3 className="text-lg font-semibold mb-4">Selected Programs</h3>
        <div className="space-y-4">
          {profile?.chosen_programs.map((programData: any, index: number) => {
            const program = programData.programs;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                    <div>
                      <h4 className="font-medium text-lg">{program.name}</h4>
                      <p className="text-sm text-gray-500 capitalize">
                        {program.level}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0">
                      <StatusIcon status={profile.status!} />
                      <span className="text-sm font-medium">
                        {profile.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
                    <div>
                      <p className="text-sm font-medium">Institution</p>
                      <p className="text-sm text-gray-500">
                        {program.institution}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-gray-500">
                        {program.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-gray-500">
                        {program.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Application Deadline
                      </p>
                      <p className="text-sm text-gray-500">N/A</p>{" "}
                    </div>
                  </div>
                  {/* <Button variant="outline" className="w-full md:w-auto">
                  View Details
                </Button> */}
                  <RemoveChosenProgramButton programID={program.id} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </>
  );
}
