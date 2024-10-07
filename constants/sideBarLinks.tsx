import { SidebarLink } from "@/types";
import {
  LayoutDashboard,
  CalendarDays,
  Mail,
  NotebookPen,
  User,
  CircleHelp,
  Search,
} from "lucide-react";

export const SidebarLinks: SidebarLink[] = [
  {
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: <Search className="h-4 w-4" />,
    href: "/find-programs",
    label: "Find programs",
  },
  {
    icon: <User className="h-4 w-4" />,
    href: "/profile",
    label: "Profile",
  },
  {
    icon: <CalendarDays className="h-4 w-4" />,
    href: "/events",
    label: "Upcoming events",
  },
  {
    icon: <NotebookPen className="h-4 w-4" />,
    href: "/about",
    label: "About us",
  },
  {
    icon: <CircleHelp className="h-4 w-4" />,
    href: "/help",
    label: "Help",
  },
];
