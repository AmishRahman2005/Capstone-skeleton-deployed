"use client";

import * as React from "react";
import { BarChart, TrendingUp, Calendar, DollarSign, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ChartBar {
  label: string;
  actual: number;
  target: number;
}

const ytdData: ChartBar[] = [
  { label: "Q1", actual: 82, target: 80 },
  { label: "Q2", actual: 88, target: 85 },
  { label: "Q3", actual: 91, target: 85 },
  { label: "Q4", actual: 94, target: 90 },
];

const mtdData: ChartBar[] = [
  { label: "Wk 1", actual: 78, target: 85 },
  { label: "Wk 2", actual: 84, target: 85 },
  { label: "Wk 3", actual: 89, target: 85 },
  { label: "Wk 4", actual: 93, target: 85 },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = React.useState("ytd");

  const currentChartData = timeframe === "ytd" ? ytdData : mtdData;

  const currentPerformance = React.useMemo(() => {
    return timeframe === "ytd"
      ? { revenue: "$248,500", recovery: "94.2%", efficiency: "96.4%" }
      : { revenue: "$64,200", recovery: "91.8%", efficiency: "94.2%" };
  }, [timeframe]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 select-none"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BarChart className="h-8 w-8 text-primary" />
            <span>SaaS Analytics</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor comparative collection velocity indexes, aging cohorts, and efficiency targets.
          </p>
        </div>

        {/* Filter controls tab list */}
        <Tabs defaultValue="ytd" value={timeframe} onValueChange={setTimeframe} className="w-fit">
          <TabsList className="border border-border/40">
            <TabsTrigger value="ytd">Year-to-Date</TabsTrigger>
            <TabsTrigger value="mtd">Month-to-Date</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="glass-panel border-white/5 shadow-xs">
          <CardContent className="p-6 flex flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                Total Collections
              </span>
              <span className="text-2xl font-bold text-foreground block">
                {currentPerformance.revenue}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/5 shadow-xs">
          <CardContent className="p-6 flex flex-row items-center gap-4">
            <div className="p-3 bg-success/10 rounded-lg text-success">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                Recovery Rate
              </span>
              <span className="text-2xl font-bold text-foreground block">
                {currentPerformance.recovery}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/5 shadow-xs">
          <CardContent className="p-6 flex flex-row items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-500">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                Agent Efficiency
              </span>
              <span className="text-2xl font-bold text-foreground block">
                {currentPerformance.efficiency}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts & Aging analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Comparative Chart */}
        <Card className="glass-panel border-white/5 shadow-md">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center justify-between">
              <span>Collection Recovery Velocity</span>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
            <CardDescription className="text-xs">
              Comparing actual collection percentage against targeted milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="h-56 flex items-end justify-around pt-6 border-t border-border/40 mt-2 px-6">
            {currentChartData.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 max-w-[60px] group">
                <div className="w-full flex gap-1 justify-center items-end h-32 relative">
                  {/* Target Bar */}
                  <div
                    className="w-3.5 bg-muted rounded-t-xs hover:bg-muted/80 transition-colors"
                    style={{ height: `${bar.target}%` }}
                    title={`Target: ${bar.target}%`}
                  />
                  {/* Actual Bar */}
                  <div
                    className="w-3.5 bg-primary rounded-t-xs hover:bg-primary/95 transition-colors chart-bar-interactive"
                    style={{ height: `${bar.actual}%` }}
                    title={`Actual: ${bar.actual}%`}
                  />
                </div>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                  {bar.label}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Invoice aging analysis */}
        <Card className="glass-panel border-white/5 shadow-md">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Invoice Aging Decay Curve</CardTitle>
            <CardDescription className="text-xs">
              Relative exposure volume grouped by overdue age brackets
            </CardDescription>
          </CardHeader>
          <CardContent className="h-56 flex flex-col justify-center space-y-4 pt-4 border-t border-border/40 mt-2">
            {[
              { bracket: "0-30 Days", val: 55, color: "bg-success" },
              { bracket: "31-60 Days", val: 25, color: "bg-primary" },
              { bracket: "61-90 Days", val: 12, color: "bg-warning" },
              { bracket: "90+ Days", val: 8, color: "bg-destructive" },
            ].map((cohort, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span>{cohort.bracket}</span>
                  <span className="text-muted-foreground font-semibold">{cohort.val}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cohort.color} rounded-full`}
                    style={{ width: `${cohort.val}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Cohort Comparative Audit Grid */}
      <Card className="glass-panel border-white/5">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Ledger Target Audits</CardTitle>
          <CardDescription className="text-xs">
            Reviewing compliance standards against historical benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 border-t border-border/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Collection Factor</TableHead>
                <TableHead>YTD Standard</TableHead>
                <TableHead>Target Index</TableHead>
                <TableHead className="pr-6 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  factor: "Dunning response time",
                  current: "1.4 days",
                  target: "< 2.0 days",
                  status: "Compliant",
                },
                {
                  factor: "Autopay bounce rates",
                  current: "2.1%",
                  target: "< 1.5%",
                  status: "At Risk",
                },
                {
                  factor: "Recovery agent overhead",
                  current: "$120/hr",
                  target: "< $150/hr",
                  status: "Compliant",
                },
              ].map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-semibold pl-6">{row.factor}</TableCell>
                  <TableCell className="text-sm font-medium">{row.current}</TableCell>
                  <TableCell className="text-sm text-muted-foreground font-medium">
                    {row.target}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <Badge variant={row.status === "Compliant" ? "success" : "warning"}>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
