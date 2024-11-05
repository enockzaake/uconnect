import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Universities Connect",
  description: "Find your dream university abroad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster position="top-center" richColors closeButton />
      <body className="">
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
}
