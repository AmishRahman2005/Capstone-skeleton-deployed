"use client";

import * as React from "react";
import { FileText, Settings, Download, RefreshCcw, Loader2, FileSpreadsheet } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ReportsPage() {
  const { toast } = useToast();
  const [reportType, setReportType] = React.useState("cohort");
  const [format, setFormat] = React.useState("pdf");
  const [isCompiling, setIsCompiling] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [compiledReport, setCompiledReport] = React.useState<{ name: string; size: string } | null>(
    null,
  );

  const compilationLogs = React.useMemo(() => {
    if (progress < 25) return "Extracting ledger accounts database...";
    if (progress < 50) return "Running risk prediction index calculations...";
    if (progress < 75) return "Formatting audit tables and columns...";
    if (progress < 100) return "Finalizing PDF container rendering parameters...";
    return "Compilation complete!";
  }, [progress]);

  const handleCompile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompiling(true);
    setProgress(0);
    setCompiledReport(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
            const reportName = `${
              reportType === "cohort"
                ? "Recovery_Cohort"
                : reportType === "audit"
                  ? "Audit_Ledger"
                  : "Tax_Deduction_Report"
            }_${new Date().toISOString().slice(0, 10)}.${format}`;

            setCompiledReport({
              name: reportName,
              size: format === "pdf" ? "2.4 MB" : "185 KB",
            });
            toast(`Report "${reportName}" ready for download.`, "success", "Report Compiled");
          }, 400);
          return 100;
        }
        return prev + 4;
      });
    }, 100);
  };

  const handleDownload = () => {
    if (!compiledReport) return;
    toast(`Downloading file "${compiledReport.name}"...`, "info", "Downloading File");
    setCompiledReport(null);
    setProgress(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 select-none max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          <span>Report Generator</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Assemble audit logs, compliance files, and recovery reports for external accounting
          integrations.
        </p>
      </div>

      <div className="space-y-6">
        {/* Configuration Selector */}
        <Card className="glass-panel border-white/5 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span>Compilation Parameters</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Select variables to configure report columns and file constraints.
            </CardDescription>
          </CardHeader>
          <CardContent className="border-t border-border/40 pt-4">
            <form onSubmit={handleCompile} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="reportType" className="text-xs font-semibold text-muted-foreground">
                  Report Category
                </label>
                <Select
                  id="reportType"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  disabled={isCompiling}
                >
                  <option value="cohort">Recovery Cohort Details (Q3)</option>
                  <option value="audit">Delinquent Account Audit Logs</option>
                  <option value="tax">Tax Write-off Deduction Ledger</option>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="format" className="text-xs font-semibold text-muted-foreground">
                    Export Format
                  </label>
                  <Select
                    id="format"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    disabled={isCompiling}
                  >
                    <option value="pdf">Document Form (PDF)</option>
                    <option value="csv">Spreadsheet Form (CSV)</option>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="dateRange"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Date Range
                  </label>
                  <Select id="dateRange" disabled={isCompiling}>
                    <option>Previous 30 Days</option>
                    <option>Current Quarter</option>
                    <option>Year-to-Date</option>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t border-border/40 flex justify-end">
                <Button type="submit" disabled={isCompiling} className="gap-2 cursor-pointer">
                  {isCompiling ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Compiling...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCcw className="h-4 w-4" />
                      <span>Compile Report</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Dynamic Compilation and Output Display */}
        <AnimatePresence mode="wait">
          {isCompiling && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-panel border-white/5 border-primary/20 shadow-md">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-primary animate-pulse">{compilationLogs}</span>
                    <span className="text-muted-foreground">{progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-100 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {compiledReport && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <Card className="glass-panel border-white/5 border-success/20 bg-success/5 dark:bg-success/10 shadow-md">
                <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-success/20 rounded-lg text-success shrink-0">
                      {format === "pdf" ? (
                        <FileText className="h-6 w-6" />
                      ) : (
                        <FileSpreadsheet className="h-6 w-6" />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-semibold text-sm block text-foreground leading-none">
                        {compiledReport.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        File ready &bull; Size: {compiledReport.size}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handleDownload}
                    className="gap-2 self-start sm:self-center cursor-pointer bg-success text-success-foreground hover:bg-success/90"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Report</span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
