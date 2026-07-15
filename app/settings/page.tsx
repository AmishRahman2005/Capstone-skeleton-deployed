"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Settings, ShieldCheck, ShieldAlert } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const settingsSchema = z.object({
  appName: z.string().min(2, { message: "App name must be at least 2 characters." }),
  systemEnv: z.string(),
  riskThresholdHigh: z
    .number()
    .min(50, { message: "Threshold must be at least 50%." })
    .max(100, { message: "Threshold cannot exceed 100%." }),
  autoDunningTemplate: z
    .string()
    .min(10, { message: "Dunning template must be at least 10 characters." }),
  apiUrl: z.string().url({ message: "Please enter a valid API URL." }),
  webhookUrl: z
    .string()
    .url({ message: "Please enter a valid webhook URL." })
    .or(z.string().length(0)),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState("general");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      appName: "AI SaaS Starter",
      systemEnv: "development",
      riskThresholdHigh: 75,
      autoDunningTemplate:
        "Reminder: Your invoice of {amount} is overdue by {days} days. Please settle payment.",
      apiUrl: "https://jsonplaceholder.typicode.com",
      webhookUrl: "https://api.saas-starter.com/webhooks/collections",
    },
  });

  const onSubmit = () => {
    // Simulate API delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast("System configurations updated successfully.", "success", "Settings Saved");
        resolve();
      }, 600);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 select-none max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          <span>System Settings</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Configure global application metadata parameters, AI dunning triggers, and API keys.
        </p>
      </div>

      {/* Tabs Container */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start border border-border/40 mb-2">
            <TabsTrigger value="general" className="flex-1 sm:flex-initial">
              General Profile
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex-1 sm:flex-initial">
              AI Parameters
            </TabsTrigger>
            <TabsTrigger value="api" className="flex-1 sm:flex-initial">
              API & Webhooks
            </TabsTrigger>
          </TabsList>

          {/* General settings */}
          <TabsContent value="general">
            <Card className="glass-panel border-white/5 shadow-md">
              <CardHeader>
                <CardTitle className="text-base font-semibold">General configuration</CardTitle>
                <CardDescription className="text-xs">
                  Adjust standard metadata titles and deploy environment flags.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 border-t border-border/40">
                <div className="space-y-1">
                  <label htmlFor="appName" className="text-xs font-semibold text-muted-foreground">
                    Application Display Name
                  </label>
                  <Input
                    id="appName"
                    placeholder="e.g. AI SaaS Dashboard"
                    {...register("appName")}
                    className={
                      errors.appName ? "border-destructive/80 focus-visible:ring-destructive" : ""
                    }
                  />
                  {errors.appName && (
                    <p className="text-[10px] text-destructive font-medium flex items-center gap-1 mt-1">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      {errors.appName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="systemEnv"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Active Deployment Environment
                  </label>
                  <Select id="systemEnv" {...register("systemEnv")}>
                    <option value="development">Development Index</option>
                    <option value="staging">Staging Pipeline</option>
                    <option value="production">Production Instance</option>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Settings */}
          <TabsContent value="ai">
            <Card className="glass-panel border-white/5 shadow-md">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Predictive AI Tuning</CardTitle>
                <CardDescription className="text-xs">
                  Establish predictive risk score ranges and auto outreach templates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 border-t border-border/40">
                <div className="space-y-1">
                  <label
                    htmlFor="riskThresholdHigh"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    High Risk Trigger Boundary (%)
                  </label>
                  <Input
                    id="riskThresholdHigh"
                    type="number"
                    placeholder="50 - 100"
                    {...register("riskThresholdHigh", { valueAsNumber: true })}
                    className={
                      errors.riskThresholdHigh
                        ? "border-destructive/80 focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.riskThresholdHigh && (
                    <p className="text-[10px] text-destructive font-medium flex items-center gap-1 mt-1">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      {errors.riskThresholdHigh.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="autoDunningTemplate"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Auto Dunning SMS Outreach Template
                  </label>
                  <Textarea
                    id="autoDunningTemplate"
                    rows={3}
                    placeholder="Reminder template..."
                    {...register("autoDunningTemplate")}
                    className={
                      errors.autoDunningTemplate
                        ? "border-destructive/80 focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.autoDunningTemplate && (
                    <p className="text-[10px] text-destructive font-medium flex items-center gap-1 mt-1">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      {errors.autoDunningTemplate.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API settings */}
          <TabsContent value="api">
            <Card className="glass-panel border-white/5 shadow-md">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Integrations API Keys</CardTitle>
                <CardDescription className="text-xs">
                  Connect third-party webhook receivers and external API databases.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 border-t border-border/40">
                <div className="space-y-1">
                  <label htmlFor="apiUrl" className="text-xs font-semibold text-muted-foreground">
                    Axios Base API URL Endpoint
                  </label>
                  <Input
                    id="apiUrl"
                    placeholder="https://..."
                    {...register("apiUrl")}
                    className={
                      errors.apiUrl ? "border-destructive/80 focus-visible:ring-destructive" : ""
                    }
                  />
                  {errors.apiUrl && (
                    <p className="text-[10px] text-destructive font-medium flex items-center gap-1 mt-1">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      {errors.apiUrl.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="webhookUrl"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Active Webhook Payload Receiver URL
                  </label>
                  <Input
                    id="webhookUrl"
                    placeholder="https://..."
                    {...register("webhookUrl")}
                    className={
                      errors.webhookUrl
                        ? "border-destructive/80 focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.webhookUrl && (
                    <p className="text-[10px] text-destructive font-medium flex items-center gap-1 mt-1">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      {errors.webhookUrl.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Global Save Actions */}
        <div className="flex justify-end pt-4 border-t border-border/40">
          <Button type="submit" disabled={isSubmitting} className="gap-2 cursor-pointer">
            <ShieldCheck className="h-4 w-4" />
            <span>{isSubmitting ? "Saving..." : "Save Settings"}</span>
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
