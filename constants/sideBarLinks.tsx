import { SidebarLink } from "@/types";
import {
  LayoutDashboard,
  CalendarDays,
  Mail,
  NotebookPen,
  User,
  CircleHelp,
  Search,
  ListCheck,
  ScrollText,
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

export const AdminSidebarLinks: SidebarLink[] = [
  {
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/admin-dashboard",
    label: "Dashboard",
  },
  {
    icon: <ListCheck className="h-4 w-4" />,
    href: "/review-done",
    label: "Reviewed applications",
  },
  {
    icon: <ScrollText className="h-4 w-4" />,
    href: "/all-programs",
    label: "All programs",
  },
  {
    icon: <CalendarDays className="h-4 w-4" />,
    href: "/manage-events",
    label: "Manage events",
  },
  {
    icon: <Mail className="h-4 w-4" />,
    href: "/inquiries",
    label: "Inquiries",
  },
];
