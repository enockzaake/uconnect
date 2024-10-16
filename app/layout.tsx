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
    <ReactQueryClientProvider>
      <html lang="en">
        <Toaster position="top-center" richColors />
        <body className="">{children}</body>
      </html>
    </ReactQueryClientProvider>
  );
}
