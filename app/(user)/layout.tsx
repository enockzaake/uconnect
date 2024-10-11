import type { Metadata } from "next";
import Sidebar, { MiniSidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Universities Connect",
  description: "Student dashboard",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="sm:flex flex-row h-screen bg-gray-10">
          <Sidebar />
          <MiniSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
        </div>
      </body>
    </html>
  );
}
