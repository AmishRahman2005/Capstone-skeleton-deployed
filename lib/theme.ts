export const theme = {
  colors: {
    primary: {
      light: "#7c3aed", // violet-600
      dark: "#8b5cf6", // violet-500
    },
    secondary: {
      light: "#f3f4f6", // gray-100
      dark: "#1f2937", // gray-800
    },
    success: {
      light: "#10b981", // emerald-500
      dark: "#059669", // emerald-600
    },
    danger: {
      light: "#ef4444", // red-500
      dark: "#dc2626", // red-600
    },
    warning: {
      light: "#f59e0b", // amber-500
      dark: "#d97706", // amber-600
    },
    background: {
      light: "#ffffff",
      dark: "#0b0f19",
    },
    card: {
      light: "#ffffff",
      dark: "#111827",
    },
    border: {
      light: "#e5e7eb",
      dark: "#1f2937",
    },
    muted: {
      light: "#6b7280",
      dark: "#9ca3af",
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem", // rounded-xl for shadcn-like look
    "2xl": "1rem",
    full: "9999px",
  },
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  transitions: {
    fast: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },
};
