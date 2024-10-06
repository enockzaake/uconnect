import type { Metadata } from "next";
import AdminSidebar from "@/components/AdminSidebar";
export const metadata: Metadata = {
  title: "Universities Connect",
  description: "Admin dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-row h-screen bg-gray-10">
        {/* <AdminSidebar /> */}
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
