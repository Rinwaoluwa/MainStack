import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { animationTiming } from "../../utils/animations"
import styles from "./Button.module.css"

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "none"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={`${styles.button} ${styles[variant]} ${styles[size]}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
          duration: animationTiming.hover,
        }}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <motion.span
            className={styles.spinner}
            aria-label="Loading"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <span className={styles.spinnerDot} />
          </motion.span>
        ) : (
          children
        )}
      </motion.button>
    )
  },
)

Button.displayName = "Button"
