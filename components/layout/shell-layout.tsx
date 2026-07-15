"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-background text-foreground transition-colors duration-200">
      {/* Sidebar wrapper */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Shell */}
      <div className="flex-grow flex flex-col min-h-screen lg:pl-64">
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main
          className="flex-grow p-6 md:p-8 max-w-7xl w-full mx-auto focus:outline-hidden"
          id="main-content"
          tabIndex={-1}
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
