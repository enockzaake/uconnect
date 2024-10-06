"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { X, Home, Settings, HelpCircle } from "lucide-react";

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <aside
      className={`bg-gray-100 w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out 
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    fixed lg:relative lg:translate-x-0 z-10`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
