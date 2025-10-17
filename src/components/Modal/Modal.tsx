import type React from "react"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { animationTiming } from "../../utils/animations"
import styles from "./Modal.module.css"
import { Button } from "../Button/Button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  variant?: "center" | "right"
  handleClear: () => void
  handleApply: () => void
  selectedCount: number;
}

export const Modal = ({ isOpen, onClose, title, children, variant = "center", handleClear, handleApply, selectedCount }: ModalProps) => {
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: { opacity: 0, scale: 0.92, y: 20 },
  }
  
  const drawerVariants = {
    hidden: { x: 480, },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { x: 520 },
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = "unset"
      }
    }
  }, [isOpen, onClose])
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            onClick={onClose}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: animationTiming.fade }}
            aria-hidden="true"
          />
          {variant === "center" ? (
            <motion.div
              className={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "modal-title" : undefined}
            >
              <div className={styles.header}>
                {title && (
                  <h2 id="modal-title" className={styles.title}>
                    {title}
                  </h2>
                )}
                <motion.button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✕
                </motion.button>
              </div>
              <div className={styles.content}>{children}</div>
              {/* Action Buttons */}
              <div className={styles.actions}>
                <Button variant="secondary" onClick={handleClear}>
                  Clear
                </Button>
                <Button disabled={!Boolean(selectedCount)} onClick={handleApply} aria-label={`Apply ${selectedCount} filters`}>
                  Apply
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.aside
              className={styles.drawer}
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "modal-title" : undefined}
            >
              <div className={styles.drawerHeader}>
                {title && (
                  <h2 id="modal-title" className={styles.title}>
                    {title}
                  </h2>
                )}
                <motion.button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✕
                </motion.button>
              </div>
              <div className={styles.drawerContent}>{children}</div>
              {/* Action Buttons */}
              <div className={styles.actions}>
                <Button variant="secondary" onClick={handleClear}>
                  Clear
                </Button>
                <Button disabled={!Boolean(selectedCount)} onClick={handleApply} aria-label={`Apply ${selectedCount} filters`}>
                  Apply
                </Button>
              </div>
            </motion.aside>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
