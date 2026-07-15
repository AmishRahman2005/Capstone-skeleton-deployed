"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search, Plus, Trash2, Mail, ShieldAlert, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
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

const customerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  creditScore: z
    .number()
    .min(300, { message: "Credit score must be at least 300." })
    .max(850, { message: "Credit score cannot exceed 850." }),
  balance: z.number().min(0, { message: "Balance cannot be negative." }),
  riskScore: z.enum(["Low", "Medium", "High"]),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface Customer {
  id: string;
  name: string;
  email: string;
  creditScore: number;
  balance: number;
  riskScore: "Low" | "Medium" | "High";
}

const initialCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Acme Corporation",
    email: "billing@acme.com",
    creditScore: 720,
    balance: 12450.0,
    riskScore: "Low",
  },
  {
    id: "cust-2",
    name: "Globex Industries",
    email: "accounts@globex.com",
    creditScore: 580,
    balance: 8900.0,
    riskScore: "High",
  },
  {
    id: "cust-3",
    name: "Initech Systems",
    email: "pay@initech.com",
    creditScore: 640,
    balance: 3500.0,
    riskScore: "Medium",
  },
  {
    id: "cust-4",
    name: "Soylent Corp",
    email: "treasury@soylent.com",
    creditScore: 780,
    balance: 15200.0,
    riskScore: "Low",
  },
  {
    id: "cust-5",
    name: "Umbrella Corp",
    email: "ap@umbrella.com",
    creditScore: 610,
    balance: 41200.0,
    riskScore: "High",
  },
];

function generateId() {
  return `cust-${Date.now()}`;
}

export default function CustomersPage() {
  const { toast } = useToast();
  const [customers, setCustomers] = React.useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      creditScore: 650,
      balance: 0,
      riskScore: "Medium",
    },
  });

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const onSubmit = (data: CustomerFormValues) => {
    const newCustomer: Customer = {
      id: generateId(),
      ...data,
    };
    setCustomers((prev) => [...prev, newCustomer]);
    setIsDialogOpen(false);
    reset();
    toast(`Customer "${data.name}" added successfully.`, "success", "Account Created");
  };

  const handleDelete = (id: string, name: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    toast(`Customer "${name}" has been deleted.`, "info", "Account Deleted");
  };

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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground">
            Manage customer accounts, search database profiles, and monitor financial standing.
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="gap-2 self-start sm:self-center cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Customer</span>
        </Button>
      </div>

      {/* Directory Console */}
      <Card className="glass-panel border-white/5 shadow-md">
        <CardHeader className="pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold">Accounts Index</CardTitle>
            <CardDescription className="text-xs">
              Filtering {filteredCustomers.length} of {customers.length} total customer accounts
            </CardDescription>
          </div>
          {/* Search bar */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 w-full rounded-lg bg-muted/40 border-border/80"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 border-t border-border/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Customer Details</TableHead>
                <TableHead>Risk Index</TableHead>
                <TableHead>Credit Rating</TableHead>
                <TableHead>Invoice Balance</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => (
                  <TableRow key={cust.id} className="group">
                    <TableCell className="pl-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-sm">{cust.name}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                          <Mail className="h-3 w-3 shrink-0" />
                          {cust.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          cust.riskScore === "High"
                            ? "destructive"
                            : cust.riskScore === "Medium"
                              ? "warning"
                              : "success"
                        }
                      >
                        {cust.riskScore}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{cust.creditScore}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {cust.creditScore >= 700
                            ? "Excellent"
                            : cust.creditScore >= 600
                              ? "Good"
                              : "Poor"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      ${cust.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="pr-6 text-right py-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(cust.id, cust.name)}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer transition-colors"
                        aria-label={`Delete customer ${cust.name}`}
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-muted-foreground text-sm"
                  >
                    No customer accounts match your search parameters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog Form Component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Create Customer Account</span>
            </DialogTitle>
            <DialogDescription className="text-xs">
              Input new customer details to generate default collections profiles and risk indices.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label htmlFor="name" className="text-xs font-semibold text-muted-foreground">
                Company Name
              </label>
              <Input
                id="name"
                placeholder="e.g. Stark Industries"
                {...register("name")}
                className={
                  errors.name ? "border-destructive/80 focus-visible:ring-destructive" : ""
                }
              />
              {errors.name && (
                <p className="text-[10px] text-destructive font-medium flex items-center gap-1 mt-1">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
                Accounts Email Address
              </label>
              <Input
                id="email"
                placeholder="e.g. accounts@stark.com"
                type="email"
                {...register("email")}
                className={
                  errors.email ? "border-destructive/80 focus-visible:ring-destructive" : ""
                }
              />
              {errors.email && (
                <p className="text-[10px] text-destructive font-medium flex items-center gap-1 mt-1">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="creditScore"
                  className="text-xs font-semibold text-muted-foreground"
                >
                  Credit Rating Score
                </label>
                <Input
                  id="creditScore"
                  type="number"
                  placeholder="300 - 850"
                  {...register("creditScore", { valueAsNumber: true })}
                  className={
                    errors.creditScore ? "border-destructive/80 focus-visible:ring-destructive" : ""
                  }
                />
                {errors.creditScore && (
                  <p className="text-[10px] text-destructive font-medium flex items-center gap-1 mt-1">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    {errors.creditScore.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="balance" className="text-xs font-semibold text-muted-foreground">
                  Ledger Balance ($)
                </label>
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("balance", { valueAsNumber: true })}
                  className={
                    errors.balance ? "border-destructive/80 focus-visible:ring-destructive" : ""
                  }
                />
                {errors.balance && (
                  <p className="text-[10px] text-destructive font-medium flex items-center gap-1 mt-1">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    {errors.balance.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="riskScore" className="text-xs font-semibold text-muted-foreground">
                Base Risk Score Assignment
              </label>
              <Select id="riskScore" {...register("riskScore")}>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
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
                Submit Account
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
