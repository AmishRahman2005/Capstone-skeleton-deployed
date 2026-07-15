"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Activity, RefreshCw, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function HealthPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<Todo>({
    queryKey: ["healthCheckTodo"],
    queryFn: () => api.get<Todo>("/todos/1"),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 select-none max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Activity className="h-7 w-7 text-primary" />
            <span>Health Check</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor API network latency, JSON endpoints status, and data serialization.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading || isFetching}
          className="gap-2 self-start sm:self-center cursor-pointer border-border/80"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          <span>Refetch status</span>
        </Button>
      </div>

      {/* Main Status Block */}
      {isLoading ? (
        <Card className="rounded-xl border border-border">
          <CardHeader className="space-y-2">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32 animate-pulse" />
              <Skeleton className="h-5 w-20 rounded-full animate-pulse" />
            </div>
            <Skeleton className="h-4 w-64 animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-32 w-full rounded-lg animate-pulse" />
          </CardContent>
        </Card>
      ) : isError ? (
        <Card className="rounded-xl border border-destructive/20 bg-destructive/5 dark:bg-destructive/10">
          <CardHeader className="flex flex-col items-center text-center p-6 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-3">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            </div>
            <CardTitle className="text-destructive font-semibold text-lg">
              Endpoint Connection Failure
            </CardTitle>
            <CardDescription className="text-muted-foreground/80 mt-1">
              Unable to complete the health check test queries.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 text-center">
            <p className="text-xs font-mono text-destructive bg-destructive/5 dark:bg-black/20 p-3 rounded-lg overflow-x-auto select-all max-h-24">
              {error instanceof Error ? error.message : "Network protocol error"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-xl border border-border bg-card/60 backdrop-blur-xs">
          <CardHeader className="flex flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-success" />
                <span>API Status</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Successfully retrieved data from external REST provider
              </CardDescription>
            </div>
            <Badge variant="success">Success</Badge>
          </CardHeader>
          <CardContent className="p-6 pt-0 border-t border-border/40">
            <div className="space-y-2 mt-4">
              <span className="text-xs font-semibold text-muted-foreground block">
                Returned payload:
              </span>
              <pre className="text-xs font-mono p-4 rounded-lg bg-muted text-foreground overflow-auto border border-border/60 select-all leading-relaxed">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
