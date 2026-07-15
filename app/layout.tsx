import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { ShellLayout } from "@/components/layout/shell-layout";

export const metadata: Metadata = {
  title: "AI SaaS Starter Template",
  description:
    "A production-ready Next.js 15 App Router skeleton for enterprise AI SaaS platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <Providers>
          <ShellLayout>{children}</ShellLayout>
        </Providers>
      </body>
    </html>
  );
}
