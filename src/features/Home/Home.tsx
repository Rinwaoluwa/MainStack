import { useState, useMemo, useEffect } from "react"
import { Header } from "./components/Header"
import { BalanceSection } from "./components/BalanceSection"
import { TransactionList } from "./components/TransactionList"
import { FilterModal } from "../FilterModal/FilterModal"
import type { FilterState, Transaction, Wallet } from "../../types"
import endpoints from "../../endpoints"
import styles from "./Home.module.css"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { getTransactions, getWallet } from "@/services/apiClient"
import { exportToExcel } from "@/utils/helpers"

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [transactionsHistory, setTransactionsHistory] = useState<Transaction[]>([]);
  const [wallet, setWallet] = useState<Wallet>({
    balance: 0.00,
    ledger_balance: 0.00,
    pending_payout: 0.00,
    total_payout: 0.00,
    total_revenue: 0.00
  });
  const [filters, setFilters] = useState<FilterState>({
    dateRange: {
      start: "2020-01-01",
      end: "2025-12-31",
    },
    transactionType: [],
    transactionStatus: [],
  })

  const handleGetTransactions = async () => {
    const res = await getTransactions();
    if (res.status === 200) {
      setTransactionsHistory(res.data!)
    }
  }

  const handleGetWallet = async () => {
    const res = await getWallet();
    if (res.status == 200) {
      setWallet(res?.data!);
    }
  }

  const filteredTransactions = useMemo(() => {
    let transactions = [...transactionsHistory]

    transactions = transactionsHistory.filter((t) => {
      const txDate = new Date(t?.date)
      const startDate = new Date(filters.dateRange.start)
      const endDate = new Date(filters.dateRange.end)
      return txDate >= startDate && txDate <= endDate
    })

    // // Filter by transaction type
    // if (filters.transactionType.length > 0) {
    //   transactions = transactions.filter((t) => filters.transactionType.includes(t?.type))
    // }

    // Filter by transaction status
    if (filters.transactionStatus.length > 0) {
      transactions = transactions.filter((t) =>
        filters.transactionStatus.includes(t?.status.charAt(0).toUpperCase() + t?.status.slice(1)),
      )
    }

    return transactions
  }, [filters, transactionsHistory])

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  useEffect(() => {
    handleGetWallet();
    handleGetTransactions();
  }, [])

  return (
    <div className={styles.container}>
      <Sidebar />
      <Header onFilterClick={() => setIsFilterOpen(true)} activeFilters={filters} />

      <main className={styles.main}>
        <BalanceSection balance={{ ...endpoints.mockBalanceInfo, ...wallet }} />

        <TransactionList
          transactions={filteredTransactions}
          // transactions={transactionsHistory}
          onFilterClick={() => setIsFilterOpen(true)}
          onExportClick={() => exportToExcel(filteredTransactions)}
          filterCount={
            (filters.dateRange.start !== "2020-01-01" || filters.dateRange.end !== "2025-12-31" ? 1 : 0) +
            filters.transactionType.length +
            filters.transactionStatus.length
          }
        />
      </main>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />
    </div>
  )
}
