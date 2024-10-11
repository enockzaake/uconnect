"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, X, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { SidebarLinks } from "@/constants/sideBarLinks";
import { signOutAction } from "@/actions/auth";
import Link from "next/link";
import { useSideBar } from "@/store";

const SidebarItem = ({
  icon,
  label,
  href,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}) => (
  <Link href={href}>
    <Button
      variant="ghost"
      className={`w-full justify-start hover:bg-gray-200 ${
        active ? "bg-gray-200 hover:bg-gray-300" : ""
      }`}
    >
      {icon}
      <span className="ml-2 capitalize">{label}</span>
    </Button>
  </Link>
);

export default function Sidebar() {
  const { toggleSideBar, sidebarOpen } = useSideBar();
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <aside
        className={`bg-gray-100 w-64 min-h-screen p-4 fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <nav className="space-y-2">
          <div className="flex items-center justify-between">
            <Logo />
            <X
              onClick={toggleSideBar}
              className="md:hidden h-8 w-8 hover:cursor-pointer"
            />
          </div>
          <Separator />

          {SidebarLinks.map((item: any, index: number) => (
            <SidebarItem
              active={pathname === item.href}
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
            />
          ))}
        </nav>

        <nav className="absolute bottom-4 left-4 right-4">
          <form action={signOutAction}>
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </form>
        </nav>
      </aside>
    </>
  );
}

export function MiniSidebar() {
  const { toggleSideBar, sidebarOpen } = useSideBar();

  return (
    <div className="flex items-center bg-white justify-between p-3">
      <div className="left-16 md:hidden">
        <Logo />
      </div>

      {!sidebarOpen && (
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={toggleSideBar}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      )}
    </div>
  );
}
