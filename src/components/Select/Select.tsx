import React from "react"
import styles from "./Select.module.css"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options?: Array<{ value: string; label: string }>
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, options = [], id, ...props }, ref) => {
  const selectId = id || `select-${Math.random()}`

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <select ref={ref} id={selectId} className={styles.select} {...props}>
        {options && options.length > 0 ? (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>
    </div>
  )
})

Select.displayName = "Select"
