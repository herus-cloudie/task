import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "کریپتر",
  description: "صرافی ارزهای دیجیتال",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link className="rounded-full" rel="icon" href="/img/logo.svg" sizes="50" />
      </head>
      <body className={`bg-white`}>
        <main>
          {children}
        </main>
        <Toaster />
        </body>
    </html>
  );
}
