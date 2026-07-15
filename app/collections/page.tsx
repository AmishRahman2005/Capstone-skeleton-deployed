"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Wallet,
  PhoneCall,
  MessageSquare,
  ArrowRightLeft,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

const planSchema = z.object({
  installmentsCount: z
    .number()
    .min(2, { message: "Must schedule at least 2 installments." })
    .max(12, { message: "Cannot exceed 12 monthly installments." }),
  frequency: z.enum(["Weekly", "Bi-Weekly", "Monthly"]),
});

type PlanFormValues = z.infer<typeof planSchema>;

interface CollectionItem {
  id: string;
  company: string;
  amount: number;
  delayDays: number;
  stage: "dunning" | "negotiation" | "repayment" | "settled";
  installments?: {
    count: number;
    frequency: string;
    amountPerInstallment: number;
  };
}

const initialItems: CollectionItem[] = [
  { id: "col-1", company: "Globex Industries", amount: 8900.0, delayDays: 32, stage: "dunning" },
  {
    id: "col-2",
    company: "Acme Corporation",
    amount: 12450.0,
    delayDays: 14,
    stage: "negotiation",
  },
  {
    id: "col-3",
    company: "Umbrella Corporation",
    amount: 41200.0,
    delayDays: 45,
    stage: "negotiation",
  },
  {
    id: "col-4",
    company: "Initech Systems",
    amount: 3500.0,
    delayDays: 5,
    stage: "repayment",
    installments: { count: 3, frequency: "Monthly", amountPerInstallment: 1166.67 },
  },
  { id: "col-5", company: "Soylent Corp", amount: 15200.0, delayDays: 0, stage: "settled" },
];

export default function CollectionsPage() {
  const { toast } = useToast();
  const [items, setItems] = React.useState<CollectionItem[]>(initialItems);
  const [activeItem, setActiveItem] = React.useState<CollectionItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      installmentsCount: 3,
      frequency: "Monthly",
    },
  });

  const handleStageChange = (id: string, currentStage: CollectionItem["stage"]) => {
    const stageOrder: CollectionItem["stage"][] = [
      "dunning",
      "negotiation",
      "repayment",
      "settled",
    ];
    const currentIndex = stageOrder.indexOf(currentStage);
    const nextStage = stageOrder[(currentIndex + 1) % stageOrder.length];

    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, stage: nextStage } : item)));

    const companyName = items.find((item) => item.id === id)?.company;
    toast(
      `Moved "${companyName}" pipeline stage to "${nextStage.toUpperCase()}".`,
      "info",
      "Pipeline Updated",
    );
  };

  const triggerReminder = (company: string, method: "sms" | "call") => {
    toast(
      method === "sms"
        ? `Reminders dispatch complete: SMS notifications sent to ${company} billing contacts.`
        : `Collection queue task: Dialing automated payment recovery call to ${company} ledger manager.`,
      "success",
      method === "sms" ? "AI Text Dispatched" : "Call Initiated",
    );
  };

  const openInstallmentCreator = (item: CollectionItem) => {
    setActiveItem(item);
    setIsDialogOpen(true);
  };

  const onSubmitPlan = (data: PlanFormValues) => {
    if (!activeItem) return;

    const amountPerInstallment = parseFloat(
      (activeItem.amount / data.installmentsCount).toFixed(2),
    );

    setItems((prev) =>
      prev.map((item) =>
        item.id === activeItem.id
          ? {
              ...item,
              stage: "repayment",
              installments: {
                count: data.installmentsCount,
                frequency: data.frequency,
                amountPerInstallment,
              },
            }
          : item,
      ),
    );

    setIsDialogOpen(false);
    reset();
    toast(
      `Scheduled ${data.installmentsCount} ${data.frequency} installments of $${amountPerInstallment.toLocaleString()} for ${activeItem.company}.`,
      "success",
      "Repayment Scheduled",
    );
    setActiveItem(null);
  };

  const columns: { stage: CollectionItem["stage"]; label: string; color: string }[] = [
    {
      stage: "dunning",
      label: "Active Dunning",
      color: "bg-destructive/10 text-destructive border-destructive/25",
    },
    {
      stage: "negotiation",
      label: "Negotiation",
      color: "bg-warning/10 text-warning border-warning/25",
    },
    {
      stage: "repayment",
      label: "Repayment Plan",
      color: "bg-primary/10 text-primary border-primary/25",
    },
    {
      stage: "settled",
      label: "Settled Account",
      color: "bg-success/10 text-success border-success/25",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 select-none"
    >
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Wallet className="h-8 w-8 text-primary" />
          <span>Debt Recovery Pipeline</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Track dunning procedures, log client payment agreements, and trigger automated reminders.
        </p>
      </div>

      {/* Kanban Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start">
        {columns.map((col) => {
          const columnItems = items.filter((item) => item.stage === col.stage);

          return (
            <Card key={col.stage} className="bg-card/45 shadow-sm border border-border">
              <CardHeader className="p-4 flex flex-row items-center justify-between pb-3 border-b border-border/50">
                <Badge className={`px-2.5 py-0.5 border ${col.color}`} variant="outline">
                  {col.label}
                </Badge>
                <span className="text-xs font-semibold text-muted-foreground">
                  {columnItems.length}
                </span>
              </CardHeader>
              <CardContent className="p-3 space-y-3 min-h-[350px]">
                {columnItems.length > 0 ? (
                  columnItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-border bg-card/65 shadow-xs flex flex-col gap-3 group relative overflow-hidden glow-border-hover"
                    >
                      {/* Company & Delay */}
                      <div className="space-y-1">
                        <span className="font-semibold text-sm block text-foreground leading-none">
                          {item.company}
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {item.stage === "settled"
                            ? "Account cleared"
                            : `${item.delayDays} Days Overdue`}
                        </span>
                      </div>

                      {/* Financial Value */}
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-muted-foreground">Outstanding</span>
                        <span className="font-mono text-sm font-bold text-foreground">
                          ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      {/* Repayment details if active */}
                      {item.installments && (
                        <div className="p-2 rounded-lg bg-primary/5 border border-primary/10 text-[10px] text-muted-foreground">
                          <span className="font-semibold text-primary block mb-0.5">
                            Installments Active
                          </span>
                          {item.installments.count} &times; $
                          {item.installments.amountPerInstallment.toLocaleString()} (
                          {item.installments.frequency})
                        </div>
                      )}

                      {/* Interactive Triggers */}
                      <div className="flex items-center gap-1.5 pt-2 border-t border-border/30 justify-between">
                        <div className="flex gap-1">
                          {item.stage !== "settled" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => triggerReminder(item.company, "sms")}
                                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                                aria-label={`Send text reminder to ${item.company}`}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => triggerReminder(item.company, "call")}
                                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                                aria-label={`Initiate call to ${item.company}`}
                              >
                                <PhoneCall className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>

                        <div className="flex gap-1.5">
                          {item.stage === "negotiation" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openInstallmentCreator(item)}
                              className="text-[10px] h-7 px-2 rounded-md font-semibold border-border/80 cursor-pointer"
                            >
                              Add Plan
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStageChange(item.id, item.stage)}
                            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                            aria-label={`Advance stage for ${item.company}`}
                          >
                            <ArrowRightLeft className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-xs text-muted-foreground/60">
                    <span>No active pipeline records</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Installment Plan Scheduler Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <span>Schedule Installments</span>
            </DialogTitle>
            <DialogDescription className="text-xs">
              Configure installment plan timelines for {activeItem?.company}. Outstanding: $
              {activeItem?.amount.toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmitPlan)} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label
                htmlFor="installmentsCount"
                className="text-xs font-semibold text-muted-foreground"
              >
                Installment Segments Count
              </label>
              <Input
                id="installmentsCount"
                type="number"
                placeholder="2 - 12 installments"
                {...register("installmentsCount", { valueAsNumber: true })}
                className={
                  errors.installmentsCount
                    ? "border-destructive/80 focus-visible:ring-destructive"
                    : ""
                }
              />
              {errors.installmentsCount && (
                <p className="text-[10px] text-destructive font-medium flex items-center gap-1 mt-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {errors.installmentsCount.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="frequency" className="text-xs font-semibold text-muted-foreground">
                Payment Interval Frequency
              </label>
              <Select id="frequency" {...register("frequency")}>
                <option value="Weekly">Weekly payments</option>
                <option value="Bi-Weekly">Bi-Weekly payments</option>
                <option value="Monthly">Monthly payments</option>
              </Select>
            </div>

            <DialogFooter className="pt-4 flex flex-row items-center justify-end gap-2 border-t border-border/40">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="cursor-pointer border-border/80"
              >
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer">
                Confirm Plan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
