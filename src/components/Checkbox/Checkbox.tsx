import React from "react"
import styles from "./Checkbox.module.css"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ label, id, ...props }, ref) => {
  const checkboxId = id || `checkbox-${Math.random()}`

  return (
    <div className={styles.wrapper}>
      <input ref={ref} type="checkbox" id={checkboxId} className={styles.checkbox} {...props} />
      {label && (
        <label htmlFor={checkboxId} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  )
})

Checkbox.displayName = "Checkbox"
