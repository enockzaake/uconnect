import React from "react";
import { Whatsapp } from "./svg/socials";
import Link from "next/link";
const WhatsappBot = () => {
  return (
    <Link
      target="_blank"
      href="https://api.whatsapp.com/send?phone=256706029166&text=Hello%2C%20UConnect.%20I%20am%20interested%20in%20studying%20abroad."
    >
      <div className="flex items-center justify-center  fixed bottom-4 p-2 right-4  bg-green-500 w-16 h-16 rounded-full shadow-xl hover:cursor-pointer">
        <Whatsapp />
      </div>
    </Link>
  );
};

export default WhatsappBot;
