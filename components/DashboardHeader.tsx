"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const DashboardHeader = ({ title }: { title: string }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="bg-white w-full shadow-sm">
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <div className="w-6 h-6" /> {/* Placeholder for right-side content */}
      </div>
    </header>
  );
};

export default DashboardHeader;
