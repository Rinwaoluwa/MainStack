import React from "react"
import styles from "./Card.module.css"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title?: string
  description?: string
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, title, description, ...props }, ref) => (
    <div ref={ref} className={styles.card} {...props}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  ),
)

Card.displayName = "Card"
