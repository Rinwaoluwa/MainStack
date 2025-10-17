import React, { useState } from "react"
import styles from "./Sidebar.module.css"
import { Link } from "@/assets/svgs/Link"
import { ProductIcon } from "@/assets/svgs/ProductIcon"
import { MediaKit } from "@/assets/svgs/MediaKit"
import { Invoicing } from "@/assets/svgs/Invoicing"

type Item = {
  id: string
  icon: React.ReactNode
  label: string
}


const ITEMS: Item[] = [
  { id: "activity", icon: <Link />, label: "Link in bio" },
  { id: "store", icon: <ProductIcon />, label: "Store" },
  { id: "files", icon: <MediaKit />, label: "Files" },
  { id: "docs", icon: <Invoicing />, label: "Docs" },
]

interface SidebarProps {
  activeId?: string
  onChange?: (id: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onChange }) => {
  const [active, setActive] = useState<string | null>(activeId ?? null)

  const handleClick = (id: string) => {
    setActive(id)
    onChange?.(id)
  }

  return (
    <aside
      className={styles.wrapper}
      aria-label="Quick navigation"
      onMouseLeave={() => setActive(null)}
    >
      <div className={styles.rail}>
        {ITEMS.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              className={`${styles.item} ${isActive ? styles.active : ""}`}
              aria-current={isActive}
              onClick={() => handleClick(item.id)}
              onMouseEnter={() => setActive(item.id)}
            >
              {item.icon}
              <span className={styles.tooltip}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
