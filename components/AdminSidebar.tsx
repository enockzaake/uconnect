"use client";
import { Separator } from "@/components/ui/separator";
import { LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSideBar } from "@/store";
import Logo from "./Logo";
import Link from "next/link";
import { AdminSidebarLinks } from "@/constants/sideBarLinks";
import { signOutAction } from "@/actions/auth";
import { usePathname } from "next/navigation";

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
        active ? "bg-gray-300 hover:bg-gray-300" : ""
      }`}
    >
      {icon}
      <span className="ml-2 capitalize">{label}</span>
    </Button>
  </Link>
);

const Sidebar = () => {
  const { sidebarOpen, toggleSideBar } = useSideBar();
  const pathname = usePathname();

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

        {AdminSidebarLinks.map((item, index) => (
          <SidebarItem
            active={
              pathname === item.href ||
              (pathname.startsWith("/application-review") &&
                item.href === "/admin-dashboard")
            }
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
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
