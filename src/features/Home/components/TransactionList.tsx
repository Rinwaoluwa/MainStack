import { motion } from "framer-motion"
import { Button } from "../../../components/Button/Button"
import type { Transaction } from "../../../types"
import { formatCurrency, formatTxDate } from "../../../utils/format"
import { animationTiming } from "../../../utils/animations"
import styles from "./TransactionList.module.css"
import { Download } from "@/assets/svgs/Download"
import { Receipt } from "@/assets/svgs/Receipt"
import { ArrowDownLeft } from "@/assets/svgs/ArrowDownLeft"
import { ArrowUpRight } from "@/assets/svgs/ArrowUpRight"
import { ArrowsDown } from "@/assets/svgs/ArrowDown"

interface TransactionListProps {
  transactions: Transaction[]
  onFilterClick: () => void
  filterCount: number
  onExportClick: () => void
}

export const TransactionList = ({ transactions, onFilterClick, filterCount, onExportClick }: TransactionListProps) => {

  const buttonStyles = { width: 139 }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: animationTiming.fade,
      },
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return styles.statusSuccess
      case "pending":
        return styles.statusPending
      case "failed":
        return styles.statusFailed
      default:
        return ""
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{transactions.length} Transactions</h2>
          <p className={styles.subtitle}>Your transactions for All Time</p>
        </div>
        <div className={styles.actions}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="secondary" size="md" style={buttonStyles} onClick={onFilterClick}>
              <p>
                Filter {filterCount > 0 && <span className={styles.badge}>{filterCount}</span>}
              </p>
              <ArrowsDown />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="secondary" size="md" style={buttonStyles} onClick={onExportClick}>
              <p>Export list</p>
              <Download />
            </Button>
          </motion.div>
        </div>
      </div>

      <div className={styles.divider}></div>

      {transactions.length === 0 ? (
        <motion.div className={styles.empty} variants={itemVariants} initial="hidden" animate="visible">
          <div className={styles.emptyIcon}>
            <Receipt />
          </div>
          <h3 className={styles.emptyTitle}>
            No matching transaction found
            <br />
            for the selected filter
          </h3>
          <p className={styles.emptyText}>Change your filters to see more results, or add a new product.</p>
          <Button variant="secondary" style={buttonStyles} onClick={onFilterClick}>Clear Filter</Button>
        </motion.div>
      ) : (
        <motion.div className={styles.list} variants={containerVariants} initial="hidden" animate="visible">
          {transactions?.map((tx, index) => (
            <motion.div
              key={`${index + tx.amount}`}
              className={styles.item}
              variants={itemVariants}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={styles.itemContent}>
                <motion.div
                  className={`${styles.statusIcon} ${getStatusColor(tx?.status)}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {tx?.status === "successful" ? <ArrowDownLeft /> : <ArrowUpRight />}
                </motion.div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemTitle}>{tx?.metadata?.product_name}</p>
                  <p className={styles.itemAuthor}>{tx?.metadata?.name}</p>
                  <p className={getStatusColor(tx.status)} style={{ backgroundColor: "transparent" }}>{tx?.status}</p>
                </div>
              </div>
              <div className={styles.itemMeta}>
                <p className={styles.itemAmount}>{formatCurrency(tx.amount)}</p>
                <p className={styles.itemDate}>{formatTxDate(tx.date)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}
