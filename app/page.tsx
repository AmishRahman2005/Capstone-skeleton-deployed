"use client";

import Link from "next/link";
import { Cpu, ArrowRight, Activity, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8 text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
          <Cpu className="h-3.5 w-3.5" />
          <span>Next.js 15 Capstone Template</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Next-Gen AI SaaS{" "}
          <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
            Risk Prediction
          </span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          A production-ready Next.js 15 App Router skeleton for high-performance enterprise SaaS.
          Fully responsive, dark-mode adaptive, and accessibility-compliant.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="gap-2 w-full sm:w-auto font-medium cursor-pointer">
              <LayoutDashboard className="h-4 w-4" />
              <span>Enter Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/health" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 w-full sm:w-auto font-medium border-border/80 cursor-pointer"
            >
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span>Verify Health Check</span>
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Highlights Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 mt-16 max-w-5xl w-full grid-cols-1 sm:grid-cols-3"
      >
        <Card className="rounded-xl border border-border p-6 bg-card/40">
          <CardHeader className="p-0 text-left space-y-2">
            <CardTitle className="font-semibold text-base text-foreground">App Router</CardTitle>
            <CardDescription className="text-xs text-muted-foreground leading-relaxed">
              100% App Router layout. Supported with route-based loading files, error bounds, and
              customized 404 views.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="rounded-xl border border-border p-6 bg-card/40">
          <CardHeader className="p-0 text-left space-y-2">
            <CardTitle className="font-semibold text-base text-foreground">
              Theme & Components
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground leading-relaxed">
              Fully compliant theme engine (Tailwind CSS v4 variable maps) and modular
              shadcn-compliant UI primitives.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="rounded-xl border border-border p-6 bg-card/40">
          <CardHeader className="p-0 text-left space-y-2">
            <CardTitle className="font-semibold text-base text-foreground">
              API & Query Cache
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground leading-relaxed">
              Axios-configured base client integrated with TanStack React Query cache controllers
              and state hook queries.
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
}
