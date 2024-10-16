"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import Logo from "./Logo";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";

const Header = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <header className="fixed  top-0 z-50 bg-white w-full px-4 lg:px-6 h-14 flex items-center justify-between border-b border-blue-100">
      <Logo />
      <nav className="hidden  ml-auto sm:flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:text-red-400 transition-colors"
          href="/find-programs"
        >
          Programs
        </Link>
        <Link
          className="text-sm font-medium hover:text-red-400 transition-colors"
          href="#destinatons"
        >
          Destinations
        </Link>
        <Link
          className="text-sm font-medium hover:text-red-400 transition-colors"
          href="#"
        >
          Resources
        </Link>
        <Link
          className="text-sm font-medium hover:text-red-400 transition-colors"
          href="/about"
        >
          About Us
        </Link>
      </nav>
      {isloggedIn ? (
        <div className="ml-4 flex gap-2">
          <Link className=" sm:block" href="/dashboard">
            <Button size="sm">Dashboard</Button>
          </Link>
        </div>
      ) : (
        <div className="ml-4 flex gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>

          <Link className="hidden sm:block" href="/sign-up">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
