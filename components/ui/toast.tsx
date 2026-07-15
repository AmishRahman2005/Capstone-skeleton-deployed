"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, title?: string) => void;
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (message: string, type: ToastType = "success", title?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type, title }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ toast, toasts, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: string) => void;
}) {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm"
      role="region"
      aria-label="Notifications"
    >
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon =
            t.type === "success"
              ? CheckCircle
              : t.type === "error"
                ? AlertCircle
                : t.type === "warning"
                  ? AlertTriangle
                  : Info;

          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } }}
              className={cn(
                "p-4 rounded-xl border flex gap-3 shadow-lg bg-card/90 backdrop-blur-md text-foreground select-none relative overflow-hidden",
                t.type === "success" && "border-success/20",
                t.type === "error" && "border-destructive/20",
                t.type === "warning" && "border-warning/20",
                t.type === "info" && "border-primary/20",
              )}
            >
              {/* Colored left indicator strip */}
              <div
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-1",
                  t.type === "success" && "bg-success",
                  t.type === "error" && "bg-destructive",
                  t.type === "warning" && "bg-warning",
                  t.type === "info" && "bg-primary",
                )}
              />

              <div
                className={cn(
                  "mt-0.5 shrink-0",
                  t.type === "success" && "text-success",
                  t.type === "error" && "text-destructive",
                  t.type === "warning" && "text-warning",
                  t.type === "info" && "text-primary",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-grow space-y-1">
                {t.title && <h4 className="font-semibold text-sm leading-none">{t.title}</h4>}
                <p className="text-xs text-muted-foreground leading-relaxed">{t.message}</p>
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100 transition-opacity cursor-pointer h-fit"
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
