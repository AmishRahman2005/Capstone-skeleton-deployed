"use client";

import { Bell, Search, Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Breadcrumb } from "./breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md select-none">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:block">
          <Breadcrumb />
        </div>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end sm:flex-initial">
        <div className="relative w-full max-w-[160px] sm:max-w-[240px] md:max-w-[280px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search dashboard..."
            className="pl-9 h-10 w-full bg-muted/40 border-border/80 focus-visible:bg-background rounded-lg"
            type="search"
            aria-label="Search dashboard"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full w-10 h-10 cursor-pointer"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute right-3 top-3 flex h-2 w-2 rounded-full bg-primary" />
        </Button>

        <ThemeToggle />

        <div
          className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary cursor-pointer hover:bg-primary/15 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          tabIndex={0}
          aria-label="User Profile menu"
        >
          JD
        </div>
      </div>
    </header>
  );
}
