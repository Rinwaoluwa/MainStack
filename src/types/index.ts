export interface User {
  first_name: string,
  last_name: string,
  email: string;
}

export interface Transaction {
  amount: number
  date: string
  status: "successful" | "pending" | "failed"
  type: "deposit" | "withdrawal"
  metadata: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name: string;
  }
  payment_reference: string;
}

export interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

export interface FilterState {
  dateRange: {
    start: string
    end: string
  }
  transactionType: string[]
  transactionStatus: string[]
  preset?: "today" | "last7days" | "thismonth" | "last3months"
}

export interface BalanceInfo {
  balance: number
  ledger_balance: number
  total_payout: number
  total_revenue: number
  pending_payout: number
}
