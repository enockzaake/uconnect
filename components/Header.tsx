"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import Logo from "./Logo";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getAuth() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setIsLoggedIn(true);
      }
    }
    getAuth();
  }, []);

  const navItems = [
    { href: "/find-programs", label: "Programs" },
    { href: "#destinations", label: "Destinations" },
    { href: "#", label: "Resources" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header className="fixed top-0 z-50 bg-white w-full px-4 lg:px-6 h-14 flex items-center justify-between border-b border-blue-100">
      <Logo />
      <nav className="hidden ml-auto sm:flex gap-4 sm:gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            className="text-sm font-medium hover:text-red-400 transition-colors"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="ml-4 flex gap-2">
        {isLoggedIn ? (
          <Link className="sm:block" href="/dashboard">
            <Button size="sm">Dashboard</Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button className="hidden sm:block" variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link className="hidden sm:block" href="/sign-up">
              <Button className="bg-[#522258] hover:bg-[#6A1E55]" size="sm">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 sm:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="flex justify-start">
              <Logo />
            </SheetTitle>
            <SheetDescription>{""}</SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-[#522258] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="flex flex-col gap-4">
                <Link
                  href="/sign-up"
                  className="text-sm font-medium hover:text-[#522258] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="text-sm font-medium hover:text-[#522258] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
