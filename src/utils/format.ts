export const formatCurrency = (amount: number): string => {
  const number = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
  return `USD ${number}`
}

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export const parseDate = (dateString: string): Date => {
  return new Date(dateString)
}

export const formatTxDate = (iso: string): string => {
  const d = new Date(iso)
  const month = d.toLocaleString("en-US", { month: "short" })
  const day = String(d.getDate()).padStart(2, "0")
  const year = d.getFullYear()
  return `${month} ${day},${year}`
}