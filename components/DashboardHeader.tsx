"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useSideBar } from "@/store";
import { NewEvent, NewProgram } from "./ActionBUttons";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";

const DashboardHeader = ({
  title,
  action,
  backButton,
}: {
  title: string;
  action?: string;
  backButton?: true;
}) => {
  const { sidebarOpen, toggleSideBar } = useSideBar();
  const router = useRouter();

  return (
    <header className="bg-white w-full shadow-sm">
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSideBar}
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
        <h1 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          {backButton && (
            <ArrowLeft
              className="hover:bg-gray-200 hover:cursor-pointer rounded"
              onClick={() => router.back()}
            />
          )}
          {title}
        </h1>
        <div className="w-6 h-6" /> {/* Placeholder for right-side content */}
        {action === "new-event" ? (
          <NewEvent />
        ) : action === "new-program" ? (
          <NewProgram />
        ) : null}
      </div>
    </header>
  );
};

export default DashboardHeader;
