import { useEffect, useState } from "react"
import type { FilterState, User } from "../../../types"
import styles from "./Header.module.css"
import { appList } from "@/utils/constants"
import { MainStackLogo } from "@/assets/svgs/MainStackLogo"
import { IconHome } from "@/assets/svgs/Home"
import { Button } from "@/components/Button/Button"
import { IconWidgets } from "@/assets/svgs/Widget"
import { Notifications } from "@/assets/svgs/Notifications"
import { Chat } from "@/assets/svgs/Chat"
import { Menu } from "@/assets/svgs/Menu"
import { Analytics } from "@/assets/svgs/Analytics"
import { Card } from "@/assets/svgs/Card"
import { People } from "@/assets/svgs/People"
import { Link } from "@/assets/svgs/Link"
import { ProductIcon } from "@/assets/svgs/ProductIcon"
import { MediaKit } from "@/assets/svgs/MediaKit"
import { Invoicing } from "@/assets/svgs/Invoicing"
import { Bug, Gift, LogOut, Settings } from "lucide-react"
import { Receipt } from "@/assets/svgs/Receipt"
import { getUser } from "@/services/apiClient"

interface HeaderProps {
  onFilterClick: () => void
  activeFilters: FilterState
}


export const Header = ({ onFilterClick, activeFilters }: HeaderProps) => {
  const [appsOpen, setAppsOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [activeNav, setActiveNav] = useState(0)
  const [selectedApp, setSelectedApp] = useState(appList[0])
  const [user, setUser] = useState<User>({ email: "", first_name: "", last_name: "" })
  const hasActiveFilters =
    activeFilters.transactionType.length > 0 ||
    activeFilters.transactionStatus.length > 0 ||
    activeFilters.dateRange.start !== "2023-07-17" ||
    activeFilters.dateRange.end !== "2023-08-17"


  const activeIcon = "#ffffff"
  const inActiveIcon = "#56616B"

  const firstNameInitial = user?.first_name.charAt(0)?.toUpperCase();
  const lastNameInitial = user?.last_name.charAt(0)?.toUpperCase();

  const navItems = [
    { name: "Home", icon: <IconHome fill={activeNav === 0 ? activeIcon : inActiveIcon} /> },
    { name: "Analytics", icon: <Analytics fill={activeNav === 1 ? activeIcon : inActiveIcon} /> },
    { name: "Revenue", icon: <Card fill={activeNav === 2 ? activeIcon : inActiveIcon} /> },
    { name: "CRM", icon: <People fill={activeNav === 3 ? activeIcon : inActiveIcon} /> },
  ]

  const headerAppData = [
    { name: "Link in Bio", desc: "Manage your Link in Bio", icon: <Link /> },
    { name: "Store", desc: "Manage your Store activities", icon: <ProductIcon /> },
    { name: "Media Kit", desc: "Manage your Media Kit", icon: <MediaKit /> },
    { name: "Invoicing", desc: "Manage your Invoices", icon: <Invoicing /> },
  ]

  const profileMenu = [
    { name: "Settings", icon: <Settings strokeWidth={1} /> },
    { name: "Purchase History", icon: <Receipt /> },
    { name: "Refer and Earn", icon: <Gift strokeWidth={1} /> },
    { name: "Integrations", icon: <IconWidgets fill="#000000" /> },
    { name: "Report Bug", icon: <Bug strokeWidth={1} /> },
    { name: "Switch Account", icon: <Card fill="#000000" /> },
    { name: "Sign Out", icon: <LogOut strokeWidth={1} /> },
  ]

  const handleGetUser = async () => {
    const res = await getUser();
    if (res.status == 200) {
      setUser(res?.data!);
    }
  }
  useEffect(() => {
    handleGetUser();
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <MainStackLogo />
        <nav className={styles.nav}>
          {navItems.map((item, index) => (
            <Button key={index} size="sm" variant={index === activeNav ? "primary" : "none"} onClick={() => setActiveNav(index)}>
              <span>{item.icon}</span>
              <p>{item.name}</p>
            </Button>
          ))}

          <div className={styles.appsGroup}>
            <Button
              onClick={() => {
                setActiveNav(4)
                setAppsOpen((v) => !v)
              }}
              size="sm"
              style={{ gap: 20 }}
              variant={activeNav === 4 ? "primary" : "none"}
            >
              <IconWidgets fill={activeNav === 4 ? activeIcon : inActiveIcon} />
              <p>Apps</p>
              {appsOpen && (
                <div
                  className={styles.linkInBio}
                  aria-haspopup="menu"
                  aria-expanded={appsOpen}
                  onClick={() => setAppsOpen(!appsOpen)}
                >
                  <span className={styles.divider}></span>
                  <p>{selectedApp}</p>
                </div>
              )}
            </Button>

            {appsOpen && (
              <div role="menu" className={styles.dropdownMenu} onMouseLeave={() => setAppsOpen(false)}>
                {headerAppData.map((app) => (
                  <button
                    key={app.name}
                    className={styles.dropdownItem}
                    role="menuitem"
                    onClick={() => setSelectedApp(app.name)}
                  >
                    <span className={styles.dropdownIcon}>{app.icon}</span>
                    <span>
                      <div className={styles.dropdownTitle}>{app.name}</div>
                      <div className={styles.dropdownDesc}>{app.desc}</div>
                    </span>
                    <span className={styles.dropdownChevron} aria-hidden>›</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div
          className={styles.actions}
          aria-haspopup="menu"
          aria-expanded={userOpen}
          onClick={() => setUserOpen((v) => !v)}
        >
          <Notifications />
          <Chat />
          <button className={styles.menu}>
            <div className={styles.userButton}>
              {`${firstNameInitial}${lastNameInitial}`}
            </div>

            <Menu />
          </button>

          {userOpen && (
            <div role="menu" className={styles.profileMenu} onMouseLeave={() => setUserOpen(false)}>
              <div className={styles.profileHeader}>
                <div className={styles.avatar}>{`${firstNameInitial}${lastNameInitial}`}</div>
                <div>
                  <div className={styles.profileName}>{`${user?.first_name}${user?.last_name}`}</div>
                  <div className={styles.profileEmail}>{user?.email}</div>
                </div>
              </div>
              {profileMenu.map((item) => (
                <button key={item.name} className={styles.profileItem} role="menuitem">
                  {item.icon}
                  <p>{item.name}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
