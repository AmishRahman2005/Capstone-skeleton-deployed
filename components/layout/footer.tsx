import * as React from "react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/10 py-6 px-6 text-xs text-muted-foreground">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">AI SaaS Starter</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">
            Version 1.0
          </span>
        </div>
        <div>
          <span>Built with Next.js 15</span>
        </div>
        <div>
          <span>&copy; {new Date().getFullYear()} AI SaaS Starter. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
