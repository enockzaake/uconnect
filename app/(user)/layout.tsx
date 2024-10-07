import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export const metadata: Metadata = {
  title: "Universities Connect",
  description: "Student dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-row h-screen bg-gray-10">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
        </div>
      </body>
    </html>
  );
}
