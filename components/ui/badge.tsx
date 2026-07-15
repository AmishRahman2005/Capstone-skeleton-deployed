import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    destructive:
      "border-transparent bg-destructive/10 text-destructive dark:bg-destructive/20 border-destructive/20",
    outline: "text-foreground border-border",
    success: "border-transparent bg-success/10 text-success dark:bg-success/20 border-success/20",
    warning: "border-transparent bg-warning/10 text-warning dark:bg-warning/20 border-warning/20",
  };

  return <div className={cn(base, variants[variant], className)} {...props} />;
}

export { Badge };
