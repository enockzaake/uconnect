import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  School,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  User,
  Mail,
  Phone,
  LoaderPinwheel,
  EllipsisVertical,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserChosenPrograms } from "@/actions/user";
import {
  RemoveChosenProgramButton,
  SubmitApplicationButton,
} from "@/components/ActionBUttons";

export default async function StudentDashboard() {
  const { profile } = await getUserChosenPrograms();
  const chosen_programs = profile?.chosen_programs;

  const student = {
    name: "Alex Johnson",
    email: "alex.johnson@gmail.com",
    phone: "+256708112344",
    id: "STU-2023-001",
    avatar: "/placeholder.svg?height=128&width=128",
  };

  const applications = [
    {
      id: "1",
      program: "Computer Science",
      institution: "Havard University",
      status: "Accepted",
      deadline: "2023-05-15",
      logo: "/images/harvard.jpg",
    },
    {
      id: "1",
      program: "Business Administration",
      institution: "Cambridge University",
      status: "Interview Scheduled",
      deadline: "2023-06-30",
      logo: "/images/cambridge.png",
    },
    {
      id: "1",
      program: "Graphic Design",
      institution: "Art Institute",
      status: "Accepted",
      deadline: "2023-04-01",
      logo: "/images/mit.jpg",
    },
    {
      id: "1",
      program: "Artificial Intelligence",
      institution: "Stanford University",
      status: "Under Review",
      deadline: "2023-07-15",
      logo: "/images/stanford.png",
    },
  ];

  const totalApplications = chosen_programs?.length;
  const acceptedApplications = chosen_programs?.filter(
    (app) => app.status === "accepted"
  ).length;

  const pendingApplications = chosen_programs?.filter((app) => {
    console.log(app.status);
    return ["pending", "submitted"].includes(app.status!);
  }).length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-gray-500" />;
      case "review":
        return <Eye className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <ScrollArea>
      <div className="min-h-screen p-2 flex flex-col ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Dashboard
          </h1>
          <Card className="w-full md:w-auto">
            <CardContent className="flex items-center p-4">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>
                  {profile?.first_name?.[0].toUpperCase() +
                    " " +
                    profile?.last_name?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <Mail className="h-4 w-4 mr-1" /> {profile?.email}
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                  <Phone className="h-4 w-4 mr-1" /> {profile?.mobile}
                </p>
                <p className="text-sm text-gray-500 flex items-center"></p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
              <School className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">
                {totalApplications}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-2">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {acceptedApplications}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {pendingApplications}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-4">
          <CardHeader className="py-1 ">
            <CardTitle className="text-sm">Application Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Progress value={profile?.progress} className="w-full h-3" />
            <SubmitApplicationButton progress={profile?.progress!} />
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Your Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto pb-6">
          {chosen_programs?.map((program, index) => (
            <Card
              key={index}
              className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="py-4 flex flex-row items-center justify-between space-x-4">
                <div className="flex w-full gap-2">
                  <Image
                    src={program.programs?.logo || "/images/mit.jpg"}
                    alt={`${program.programs?.institution} logo`}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-lg font-medium">
                      {program.programs?.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {program.programs?.institution}
                    </p>
                  </div>
                </div>
                <RemoveChosenProgramButton programID={program.id} />
              </CardHeader>
              <CardContent className="py-2 flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <Badge
                    variant="outline"
                    className={`flex items-center justify-center text-xs px-1 ${
                      program.status === "accepted"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : program.status === "Rejected"
                        ? "bg-red-100 text-red-800 border-red-300"
                        : program.status === "Interview Scheduled"
                        ? "bg-blue-100 text-blue-800 border-blue-300"
                        : "bg-yellow-100 text-yellow-800 border-yellow-300"
                    }`}
                  >
                    <span className="mr-1">
                      {getStatusIcon(program.status!)}
                    </span>
                    {program.status}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-1 h-4 w-4" />
                    {program.created_at}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
