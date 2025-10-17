import { animationTiming } from "./animations"
import { IconHome } from "../assets/svgs/Home"

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      duration: animationTiming.fade,
    },
  },
}

export const numberVariants = {
  hidden: { opacity: 0 },
  visible: (value: number) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  }),
}

export const chartData = [
  { date: "Apr 1, 2022", value: 10 },
  { date: "Apr 6, 2022", value: 60 },
  { date: "Apr 12, 2022", value: 22 },
  { date: "Apr 18, 2022", value: 70 },
  { date: "Apr 24, 2022", value: 35 },
  { date: "Apr 30, 2022", value: 2 },
]

export const headerAppData = [
  { name: "Link in Bio", desc: "Manage your Link in Bio", icon: "🪄" },
  { name: "Store", desc: "Manage your Store activities", icon: "🛍️" },
  { name: "Media Kit", desc: "Manage your Media Kit", icon: "📁" },
  { name: "Invoicing", desc: "Manage your Invoices", icon: "🧾" },
  { name: "Bookings", desc: "Manage your Bookings", icon: "📅" },
]

export const appList = ["Link in Bio", "Store", "Media Kit", "Invoicing", "Bookings"]

export const recentDates = ["today", "last7days", "thismonth", "last3months"] as const

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]