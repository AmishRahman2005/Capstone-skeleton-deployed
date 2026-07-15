import * as React from "react";
import { type LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  description?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = "neutral",
  description,
}: StatCardProps) {
  return (
    <Card className="overflow-hidden bg-card/60 backdrop-blur-xs">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className="p-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 transition-colors">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <span className="text-3xl font-bold tracking-tight block text-foreground">{value}</span>
          {(change || description) && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {change && (
                <span
                  className={cn(
                    "flex items-center gap-0.5 font-semibold",
                    changeType === "increase" && "text-success",
                    changeType === "decrease" && "text-destructive",
                    changeType === "neutral" && "text-muted-foreground",
                  )}
                >
                  {changeType === "increase" && <ArrowUpRight className="h-3 w-3" />}
                  {changeType === "decrease" && <ArrowDownRight className="h-3 w-3" />}
                  {change}
                </span>
              )}
              {description && <span className="text-muted-foreground/80">{description}</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
