"use client";

import * as React from "react";
import {
  Users,
  AlertTriangle,
  CheckCircle,
  Percent,
  CircleDollarSign,
  TrendingUp,
  Brain,
  ListTodo,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 350, damping: 25 } },
};

export default function Dashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 select-none"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Real-time summary of AI collection risk predictions and customer trends.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Customers"
          value="1,482"
          icon={Users}
          change="+12.4%"
          changeType="increase"
          description="from last month"
        />
        <StatCard
          title="High Risk Customers"
          value="38"
          icon={AlertTriangle}
          change="-4.2%"
          changeType="decrease"
          description="from last week"
        />
        <StatCard
          title="Recovery Rate"
          value="94.2%"
          icon={CheckCircle}
          change="+1.8%"
          changeType="increase"
          description="target: 95.0%"
        />
        <StatCard
          title="Collection Rate"
          value="88.6%"
          icon={Percent}
          change="+0.5%"
          changeType="increase"
          description="target: 90.0%"
        />
        <StatCard
          title="Pending Invoices"
          value="$24,850"
          icon={CircleDollarSign}
          change="+15.3%"
          changeType="neutral"
          description="due this week"
        />
      </motion.div>

      {/* CSS-Only Charts Section */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Revenue Trend */}
        <Card className="bg-card/40 hover:bg-card/60 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Revenue Trend</span>
            </CardTitle>
            <CardDescription className="text-xs">Monthly earnings index</CardDescription>
          </CardHeader>
          <CardContent className="h-40 flex items-end gap-2 pt-4 px-6 justify-between border-t border-border/40 mt-2">
            {[35, 55, 45, 75, 60, 85, 95, 70, 80, 65, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                <div
                  className="w-full relative rounded-t-sm bg-muted group-hover:bg-primary transition-all duration-200"
                  style={{ height: `${h * 0.7}px` }}
                >
                  {/* Tooltip */}
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border shadow-xs">
                    {h}%
                  </span>
                </div>
                <span className="text-[9px] text-muted-foreground font-medium uppercase mt-1">
                  {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Collection Success */}
        <Card className="bg-card/40 hover:bg-card/60 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Collection Success</CardTitle>
            <CardDescription className="text-xs">Settled invoices by category</CardDescription>
          </CardHeader>
          <CardContent className="h-40 flex flex-col justify-center space-y-3 pt-4 border-t border-border/40 mt-2">
            {[
              { label: "Auto-pay", value: 68, color: "bg-success" },
              { label: "AI Reminder", value: 22, color: "bg-primary" },
              { label: "Manual Contact", value: 10, color: "bg-warning" },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Risk */}
        <Card className="bg-card/40 hover:bg-card/60 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Monthly Risk</CardTitle>
            <CardDescription className="text-xs">Predicted high-risk accounts</CardDescription>
          </CardHeader>
          <CardContent className="h-40 flex items-end gap-3 pt-4 px-6 justify-between border-t border-border/40 mt-2">
            {[20, 30, 45, 60, 40, 25].map((h, i) => (
              <div
                key={i}
                className="flex-grow flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div
                  className="w-full relative rounded-t-sm bg-destructive/20 group-hover:bg-destructive/85 transition-all duration-200"
                  style={{ height: `${h * 1.3}px` }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border">
                    {h}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-semibold mt-1">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recovery Distribution */}
        <Card className="bg-card/40 hover:bg-card/60 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Recovery Distribution</CardTitle>
            <CardDescription className="text-xs">Target versus actual recovery</CardDescription>
          </CardHeader>
          <CardContent className="h-40 flex flex-col justify-center pt-4 border-t border-border/40 mt-2 px-6">
            <div className="flex h-6 w-full rounded-md overflow-hidden shadow-inner">
              <div
                className="bg-success h-full"
                style={{ width: "65%" }}
                title="Direct payment (65%)"
              />
              <div
                className="bg-primary h-full"
                style={{ width: "20%" }}
                title="AI Rescheduled (20%)"
              />
              <div
                className="bg-warning h-full"
                style={{ width: "10%" }}
                title="Settlements (10%)"
              />
              <div
                className="bg-destructive h-full"
                style={{ width: "5%" }}
                title="Write-offs (5%)"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-semibold text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success inline-block" />
                <span>Direct (65%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                <span>AI Agent (20%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-warning inline-block" />
                <span>Settled (10%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-destructive inline-block" />
                <span>Written-off (5%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommendations & Tasks & Table Section */}
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity Table */}
        <Card className="lg:col-span-2 bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
              <CardDescription className="text-xs">Latest customer payment actions</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="text-xs opacity-50 cursor-not-allowed"
            >
              Export CSV
            </Button>
          </CardHeader>
          <CardContent className="p-0 border-t border-border/40">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Customer</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Acme Corporation",
                    risk: "Low",
                    amount: "$12,450.00",
                    status: "Paid",
                    statusVar: "success",
                  },
                  {
                    name: "Globex Industries",
                    risk: "High",
                    amount: "$8,900.00",
                    status: "Overdue",
                    statusVar: "destructive",
                  },
                  {
                    name: "Initech Systems",
                    risk: "Medium",
                    amount: "$3,500.00",
                    status: "Pending",
                    statusVar: "warning",
                  },
                  {
                    name: "Soylent Corp",
                    risk: "Low",
                    amount: "$15,200.00",
                    status: "Paid",
                    statusVar: "success",
                  },
                ].map((act, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium pl-6">{act.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          act.risk === "High"
                            ? "destructive"
                            : act.risk === "Medium"
                              ? "warning"
                              : "secondary"
                        }
                      >
                        {act.risk}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{act.amount}</TableCell>
                    <TableCell className="pr-6 text-right">
                      <Badge
                        variant={
                          act.statusVar as
                            | "default"
                            | "secondary"
                            | "destructive"
                            | "outline"
                            | "success"
                            | "warning"
                        }
                      >
                        {act.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <div className="space-y-6">
          {/* Recommendations Card */}
          <Card className="bg-card/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>AI Recommendations</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Generated models for automated collections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-1 border-t border-border/40">
              <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10 space-y-2 mt-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-primary">Late Payment Warning</span>
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    Score: 92%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Globex Industries is flagged with late payment probability. Recommend sending
                  structured installments prompt.
                </p>
              </div>
              <div className="p-3 bg-success/5 dark:bg-success/10 rounded-lg border border-success/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-success">Optimized Auto-Debit</span>
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    12 accounts
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Auto-debit scheduler suggestion ready for 12 accounts with historical success
                  rates above 95%.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks Card */}
          <Card className="bg-card/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <ListTodo className="h-5 w-5 text-primary" />
                <span>Upcoming Tasks</span>
              </CardTitle>
              <CardDescription className="text-xs">Operational task list checklist</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-1 border-t border-border/40">
              {[
                { task: "Call Globex account manager", done: false },
                { task: "Approve written-off adjustments", done: true },
                { task: "Finalize monthly pipeline review", done: false },
              ].map((taskItem, i) => (
                <div key={i} className="flex items-center gap-3 mt-3">
                  <input
                    type="checkbox"
                    checked={taskItem.done}
                    readOnly
                    className="h-4 w-4 rounded-sm border-border bg-background focus:ring-primary text-primary accent-primary pointer-events-none"
                  />
                  <span
                    className={`text-xs ${taskItem.done ? "line-through text-muted-foreground" : "text-foreground font-medium"}`}
                  >
                    {taskItem.task}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
