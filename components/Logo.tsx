import { Globe2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className="flex items-center justify-center" href="/">
      <Globe2 className="h-9 w-9 text-[#522258]" />
      <span className="ml-2 text-xl font-bold text-[#522258]">U-CONNECT</span>
    </Link>
  );
};

export default Logo;
