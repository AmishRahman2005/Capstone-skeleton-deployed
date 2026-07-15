import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionText?: string;
  statusText?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  actionText = "Perform Action",
  statusText = "Coming Soon",
}: EmptyStateProps) {
  return (
    <Card className="border-dashed border-2 py-16 flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-8 bg-card/40">
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 transition-transform duration-300 hover:scale-105">
          <Icon className="h-8 w-8" aria-hidden="true" />
        </div>

        <div className="space-y-2 max-w-md">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
          <Button variant="outline" disabled className="opacity-50 cursor-not-allowed">
            {actionText}
          </Button>
          <Badge variant="warning" className="px-3 py-1 font-medium select-none">
            {statusText}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
