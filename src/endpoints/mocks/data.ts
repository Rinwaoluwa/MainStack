import type { Transaction, BalanceInfo } from "../../types"

export const mockBalanceInfo: BalanceInfo = {
  balance: 120500,
  ledger_balance: 5000,
  total_payout: 5000,
  total_revenue: 5000,
  pending_payout: 5000,
}

export const transactionTypes = [
  "Store Transactions",
  "Get Tipped",
  "Withdrawals",
  "Chargebacks",
  "Cashbacks",
  "Refer & Earn",
]

export const transactionStatuses = ["Successful", "Pending", "Failed"]
