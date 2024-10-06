"use client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  User,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SidebarItem = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Button variant="ghost" className="w-full justify-start">
    {icon}
    <span className="ml-2">{children}</span>
  </Button>
);

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <aside
      className={`bg-gray-100 w-64 min-h-screen p-4 ${
        sidebarOpen ? "block" : "hidden"
      } md:block`}
    >
      <nav className="space-y-2">
        <SidebarItem icon={<LayoutDashboard className="h-4 w-4" />}>
          Dashboard
        </SidebarItem>
        <SidebarItem icon={<User className="h-4 w-4" />}>Profile</SidebarItem>
        <SidebarItem icon={<Mail className="h-4 w-4" />}>Messages</SidebarItem>
        <SidebarItem icon={<Settings className="h-4 w-4" />}>
          Settings
        </SidebarItem>
        <Separator />
        <SidebarItem icon={<LogOut className="h-4 w-4" />}>Logout</SidebarItem>
      </nav>
    </aside>
  );
};

export default Sidebar;
