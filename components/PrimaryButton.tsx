import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  className?: string;
}
const ButtonPrimary = ({ children, className }: Props) => {
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg bg-red-500 hover:shadow-red-md transition-all outline-none " +
        className
      }
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
