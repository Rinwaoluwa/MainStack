import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./DatePicker.module.css"
import { ArrowsDown } from "@/assets/svgs/ArrowDown"

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  label?: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  isInputActive?: boolean;
  selectionMode: 'start' | 'end';
  showCalendarUI?: boolean;
}

export const DatePicker = ({ value, onChange, label, isOpen, onOpen, onClose, isInputActive, selectionMode, showCalendarUI }: DatePickerProps) => {

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }
  const formatDate = (date: Date, day: number): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Month is 0-indexed, so add 1
    const dayString = String(day).padStart(2, '0')
    return `${year}-${month}-${dayString}`
  }

  const currentDate = value ? new Date(value) : new Date()
  const [displayMonth, setDisplayMonth] = useState(currentDate)

  const daysInMonth = getDaysInMonth(displayMonth)
  const firstDay = getFirstDayOfMonth(displayMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const handleDateClick = (day: number) => {
    const newDate = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day);
    onChange(newDate.toISOString().split("T")[0]);
  };

  const monthYear = displayMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const calendarVariants = {
    hidden: { opacity: 0, y: -12, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: { opacity: 0, y: -12, scale: 0.96 },
  }

  const dayVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.02,
        duration: 0.2,
      },
    }),
  }

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.container}>
        <motion.button
          className={`${styles.trigger} ${isInputActive ? styles.activeInput : ''}`}
          onClick={() => (isOpen ? onClose() : onOpen())}
          aria-label={`Select date, currently ${value}`}
          whileHover={{ backgroundColor: "#f5f5f5" }}
          whileTap={{ scale: 0.98 }}
        >
          {value}
          <motion.span className={styles.icon} animate={{ rotate: (isInputActive && isOpen) ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowsDown />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && showCalendarUI && (
            <motion.div
              className={styles.calendar}
              variants={calendarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.header}>
                <motion.button
                  onClick={() => setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1))}
                  aria-label="Previous month"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ‹
                </motion.button>
                <span>{monthYear}</span>
                <motion.button
                  onClick={() => setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1))}
                  aria-label="Next month"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ›
                </motion.button>
              </div>

              <div className={styles.weekDays}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className={styles.weekDay}>
                    {day}
                  </div>
                ))}
              </div>

              <div className={styles.days}>
                {emptyDays.map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {days.map((day, i) => (
                  <motion.button
                    key={day}
                    className={`${styles.day} ${
                      // The day is selected if it matches the current value
                      value === formatDate(displayMonth, day)
                        ? styles.selected
                        : ''
                      }`}
                    onClick={() => handleDateClick(day)}
                    custom={i}
                    variants={dayVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {day}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
