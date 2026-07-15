"use client";

import * as React from "react";
import { Brain, Sparkles, TrendingUp, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/toast";

export default function PredictionsPage() {
  const { toast } = useToast();
  const [balance, setBalance] = React.useState(15000);
  const [creditScore, setCreditScore] = React.useState(680);
  const [dunningAttempts, setDunningAttempts] = React.useState(2);

  // Dynamic calculations based on slider values
  const delayProbability = React.useMemo(() => {
    const base = (balance / 1000) * 0.15; // More balance = more risk
    const creditFactor = ((850 - creditScore) / 550) * 55; // Lower score = more risk
    const dunningFactor = dunningAttempts * 6; // More contacts = more risk
    return Math.min(
      99.4,
      Math.max(2.1, parseFloat((base + creditFactor + dunningFactor).toFixed(1))),
    );
  }, [balance, creditScore, dunningAttempts]);

  const recoveryConfidence = React.useMemo(() => {
    const baseConfidence = (creditScore / 850) * 80;
    const penalty = dunningAttempts * 4 + (balance / 20000) * 5;
    return Math.min(98.7, Math.max(4.5, parseFloat((baseConfidence - penalty + 25).toFixed(1))));
  }, [balance, creditScore, dunningAttempts]);

  // Dynamic factors list
  const riskFactors = React.useMemo(() => {
    const factors = [];
    if (creditScore < 600) {
      factors.push({
        type: "danger",
        text: `Substandard credit score (${creditScore}) indicates elevated ledger default history.`,
      });
    } else if (creditScore < 680) {
      factors.push({
        type: "warning",
        text: `Fair credit rating (${creditScore}) shows minor payment consistency concerns.`,
      });
    }
    if (balance > 40000) {
      factors.push({
        type: "danger",
        text: `Excessive capital exposure ($${balance.toLocaleString()}) increases default impact risk.`,
      });
    } else if (balance > 15000) {
      factors.push({
        type: "warning",
        text: `Moderate invoice balance exposure ($${balance.toLocaleString()}).`,
      });
    }
    if (dunningAttempts > 4) {
      factors.push({
        type: "danger",
        text: `Dunning frequency (${dunningAttempts} attempts) signals direct account delinquency.`,
      });
    } else if (dunningAttempts > 2) {
      factors.push({
        type: "warning",
        text: `Repeated contact contacts (${dunningAttempts}) without settlement responses.`,
      });
    }
    if (factors.length === 0) {
      factors.push({
        type: "success",
        text: "All critical indicators are within standard low-risk operational boundaries.",
      });
    }
    return factors;
  }, [balance, creditScore, dunningAttempts]);

  const getRiskLabel = (prob: number) => {
    if (prob > 70) return { label: "High Risk", color: "destructive" as const };
    if (prob > 40) return { label: "Medium Risk", color: "warning" as const };
    return { label: "Low Risk", color: "success" as const };
  };

  const riskLabel = getRiskLabel(delayProbability);

  const handleSimulateAction = () => {
    toast(
      `AI model compiled prediction index with a ${recoveryConfidence}% recovery success confidence.`,
      "success",
      "Model Simulated",
    );
  };

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
          <Brain className="h-8 w-8 text-primary" />
          <span>AI Prediction Sandbox</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Simulate variables to forecast late-payment probability indices and recovery confidence
          rates dynamically.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Controls Card */}
        <Card className="glass-panel border-white/5 lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Simulator Controls</CardTitle>
            <CardDescription className="text-xs">
              Toggle specific balance scopes and credit variables to model changes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2 border-t border-border/40">
            {/* Balance Exposure */}
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-muted-foreground">Outstanding Invoice Balance</span>
                <span className="text-foreground font-mono">${balance.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                aria-label="Outstanding Invoice Balance"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>$1,000</span>
                <span>$100,000</span>
              </div>
            </div>

            {/* Credit Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-muted-foreground">Customer Credit Rating</span>
                <span className="text-foreground font-mono">{creditScore} Points</span>
              </div>
              <input
                type="range"
                min="300"
                max="850"
                step="5"
                value={creditScore}
                onChange={(e) => setCreditScore(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                aria-label="Customer Credit Rating"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>300 (Poor)</span>
                <span>850 (Excellent)</span>
              </div>
            </div>

            {/* Dunning Contacts */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-muted-foreground">Dunning Outreach Contacts</span>
                <span className="text-foreground font-mono">{dunningAttempts} Attempts</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={dunningAttempts}
                onChange={(e) => setDunningAttempts(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                aria-label="Dunning Outreach Contacts"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0 (None)</span>
                <span>10 (Exhaustive)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 flex justify-end">
              <Button onClick={handleSimulateAction} className="gap-2 cursor-pointer">
                <Sparkles className="h-4 w-4" />
                <span>Simulate AI Output</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Prediction Results Card */}
        <div className="space-y-6">
          <Card className="glass-panel border-white/5 border-primary/20 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Model Outputs</span>
              </CardTitle>
              <CardDescription className="text-xs">Generated forecast metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2 border-t border-border/40">
              {/* Risk Status Header */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs font-semibold text-muted-foreground">
                  Overall Risk Level
                </span>
                <Badge
                  variant={riskLabel.color}
                  className="px-3 py-0.5 text-xs font-bold uppercase tracking-wider"
                >
                  {riskLabel.label}
                </Badge>
              </div>

              {/* Late Payment Delay Probability */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Late Payment Probability</span>
                  <span className="text-foreground">{delayProbability}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      delayProbability > 70
                        ? "bg-destructive"
                        : delayProbability > 40
                          ? "bg-warning"
                          : "bg-success"
                    }`}
                    style={{ width: `${delayProbability}%` }}
                  />
                </div>
              </div>

              {/* Recovery Confidence Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">AI Recovery Confidence</span>
                  <span className="text-foreground">{recoveryConfidence}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${recoveryConfidence}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Indicators Breakdown */}
          <Card className="glass-panel border-white/5 shadow-md">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Info className="h-4.5 w-4.5 text-muted-foreground" />
                <span>AI Risk Assessment Factors</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-1 border-t border-border/40">
              {riskFactors.map((factor, i) => (
                <div key={i} className="flex gap-2.5 items-start mt-3">
                  <div
                    className={`h-2 w-2 rounded-full shrink-0 mt-1.5 ${
                      factor.type === "danger"
                        ? "bg-destructive"
                        : factor.type === "warning"
                          ? "bg-warning"
                          : "bg-success"
                    }`}
                  />
                  <p className="text-xs text-muted-foreground leading-relaxed">{factor.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
