import { motion } from "framer-motion"
import { Button } from "../../../components/Button/Button"
import type { BalanceInfo } from "../../../types"
import { formatCurrency } from "../../../utils/format"
import styles from "./BalanceSection.module.css"
import { ResponsiveContainer, LineChart, Line, Tooltip } from "recharts"
import { chartData, containerVariants, itemVariants, numberVariants } from "@/utils/constants"
import { Info } from "@/assets/svgs/Info"

interface BalanceSectionProps {
  balance: BalanceInfo
}

export const BalanceSection = ({ balance }: BalanceSectionProps) => {
  return (
    <motion.section
      className={styles.section}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.leftColumn}>
        <motion.div variants={itemVariants} className={styles.balanceCard}>
          <p className={styles.label}>Available Balance</p>
          <div className={styles.balanceRow}>
            <motion.h2
              className={styles.amount}
              custom={balance.balance}
              variants={numberVariants}
            >
              {formatCurrency(balance.balance)}
            </motion.h2>
            <Button size="md">Withdraw</Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.chart}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <Tooltip
                cursor={{ stroke: "#FF540333", strokeWidth: 6 }}
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "var(--shadow)" as any }}
                labelStyle={{ color: "#56616B" }}
                formatter={(v: unknown) => [`USD ${Number(v).toLocaleString()}`, ""]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#FF5403"
                strokeWidth={2}
                dot={false}
                isAnimationActive
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className={styles.chartFooter} aria-hidden>
            <div className={styles.baseline}>
              <span className={styles.baselineDot} />
              <span className={styles.baselineDot} />
            </div>
            <div className={styles.footerLabels}>
              <span>Apr 1, 2022</span>
              <span>Apr 30, 2022</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className={styles.rightColumn}>
        <div className={styles.balanceGrid}>
          {[
            { label: "Ledger Balance", value: balance.ledger_balance },
            { label: "Total Payout", value: balance.total_payout },
            { label: "Total Revenue", value: balance.total_revenue },
            { label: "Pending Payout", value: balance.pending_payout },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className={styles.balanceItem}
              custom={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: (idx: number) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  },
                }),
              }}
              initial="hidden"
              animate="visible"
            >
              <div>
                <p className={styles.itemLabel}>{item.label}</p>
                <p className={styles.itemAmount}>{formatCurrency(item.value)}</p>
              </div>
              <Info />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}
