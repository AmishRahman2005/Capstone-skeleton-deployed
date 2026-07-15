"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log to an error monitoring service
  }, [error]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4 select-none animate-fade-in">
      <Card className="max-w-md w-full border-destructive/20 bg-destructive/5 dark:bg-destructive/10 rounded-xl">
        <CardHeader className="text-center flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </div>
          <CardTitle className="text-destructive font-semibold text-lg">
            Application Error
          </CardTitle>
          <CardDescription className="text-muted-foreground/80 mt-1">
            An unexpected runtime error occurred on this screen.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-left text-xs font-mono text-destructive/90 bg-destructive/5 dark:bg-black/20 rounded-lg p-4 overflow-x-auto select-all max-h-24">
          {error.message || "Unknown error type"}
        </CardContent>
        <CardFooter className="flex justify-center mt-2">
          <Button onClick={() => reset()} className="gap-2 cursor-pointer">
            <RotateCcw className="h-4 w-4" />
            <span>Reset boundary</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
