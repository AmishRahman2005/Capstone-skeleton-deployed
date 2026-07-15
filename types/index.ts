export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "admin" | "member" | "viewer";
}

export interface Customer {
  id: string;
  name: string;
  riskScore: "Low" | "Medium" | "High";
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
}

export interface PredictionData {
  customerId: string;
  probability: number;
  factors: string[];
}
