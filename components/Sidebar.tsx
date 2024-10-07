"use client";
import { Separator } from "@/components/ui/separator";
import { LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSideBar } from "@/store";
import Logo from "./Logo";
import Link from "next/link";
import { SidebarLinks } from "@/constants/sideBarLinks";
import { signOutAction } from "@/actions/auth";

const SidebarItem = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => (
  <Link href={href}>
    <Button variant="ghost" className="w-full justify-start">
      {icon}
      <span className="ml-2 capitalize">{label}</span>
    </Button>
  </Link>
);

const Sidebar = () => {
  const { sidebarOpen, toggleSideBar } = useSideBar();

  return (
    <aside
      className={`bg-gray-100 w-64 min-h-screen p-4 ${
        sidebarOpen ? "block absolute" : "hidden"
      } md:flex flex-col justify-between md:relative`}
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

        {SidebarLinks.map((item, index) => (
          <SidebarItem icon={item.icon} label={item.label} href={item.href} />
        ))}
      </nav>

      <nav>
        <form action={signOutAction}>
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </form>
      </nav>
    </aside>
  );
};

export default Sidebar;
