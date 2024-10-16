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
} from "lucide-react";
import Image from "next/image";

export default function StudentDashboard() {
  const student = {
    name: "Alex Johnson",
    email: "alex.johnson@gmail.com",
    phone: "+256708112344",
    id: "STU-2023-001",
    avatar: "/placeholder.svg?height=128&width=128",
  };

  const applications = [
    {
      program: "Computer Science",
      institution: "Havard University",
      status: "Accepted",
      deadline: "2023-05-15",
      logo: "/images/harvard.jpg",
    },
    {
      program: "Business Administration",
      institution: "Cambridge University",
      status: "Interview Scheduled",
      deadline: "2023-06-30",
      logo: "/images/cambridge.png",
    },
    {
      program: "Graphic Design",
      institution: "Art Institute",
      status: "Accepted",
      deadline: "2023-04-01",
      logo: "/images/mit.jpg",
    },
    {
      program: "Artificial Intelligence",
      institution: "Stanford University",
      status: "Under Review",
      deadline: "2023-07-15",
      logo: "/images/stanford.png",
    },
  ];

  const totalApplications = applications.length;
  const acceptedApplications = applications.filter(
    (app) => app.status === "Accepted"
  ).length;
  const pendingApplications = applications.filter((app) =>
    ["Interview Scheduled", "Under Review"].includes(app.status)
  ).length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "Interview Scheduled":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "Under Review":
        return <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white p-2 flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Student Dashboard
        </h1>
        <Card className="w-full md:w-auto">
          <CardContent className="flex items-center p-4">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback>
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{student.name}</h2>
              <p className="text-sm text-gray-500 flex items-center">
                <Mail className="h-4 w-4 mr-1" /> {student.email}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <Phone className="h-4 w-4 mr-1" /> {student.phone}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <User className="h-4 w-4 mr-1" /> ID: {student.id}
              </p>
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
        <CardHeader className="py-2">
          <CardTitle className="text-sm">Application Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={(acceptedApplications / totalApplications) * 100}
            className="w-full h-3"
          />
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Your Applications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto pb-6">
        {applications.map((app, index) => (
          <Card
            key={index}
            className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="py-4 flex flex-row items-center space-x-4">
              <Image
                src={app.logo}
                alt={`${app.institution} logo`}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <CardTitle className="text-lg font-medium">
                  {app.program}
                </CardTitle>
                <p className="text-sm text-gray-600">{app.institution}</p>
              </div>
            </CardHeader>
            <CardContent className="py-4 flex-grow flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <Badge
                  variant="outline"
                  className={`text-sm px-3 py-1 ${
                    app.status === "Accepted"
                      ? "bg-green-100 text-green-800 border-green-300"
                      : app.status === "Rejected"
                      ? "bg-red-100 text-red-800 border-red-300"
                      : app.status === "Interview Scheduled"
                      ? "bg-blue-100 text-blue-800 border-blue-300"
                      : "bg-yellow-100 text-yellow-800 border-yellow-300"
                  }`}
                >
                  <span className="mr-2">{getStatusIcon(app.status)}</span>
                  {app.status}
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-1 h-4 w-4" />
                  {app.deadline}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
