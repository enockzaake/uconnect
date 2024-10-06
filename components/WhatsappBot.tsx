import React from "react";
import { Whatsapp } from "./svg/socials";
const WhatsappBot = () => {
  return (
    <div className="flex items-center justify-center  fixed bottom-4 p-2 right-4  bg-green-500 w-16 h-16 rounded-full shadow-xl hover:cursor-pointer">
      <Whatsapp />
    </div>
  );
};

export default WhatsappBot;
