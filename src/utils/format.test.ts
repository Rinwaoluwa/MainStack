import { describe, it, expect } from "vitest"
import { formatCurrency, formatDate, parseDate } from "./format"

describe("format utilities", () => {
  describe("formatCurrency", () => {
    it("formats number as USD currency", () => {
      expect(formatCurrency(1000)).toBe("$1,000.00")
    })

    it("handles decimal values", () => {
      expect(formatCurrency(99.99)).toBe("$99.99")
    })

    it("handles zero", () => {
      expect(formatCurrency(0)).toBe("$0.00")
    })

    it("handles large numbers", () => {
      expect(formatCurrency(1000000)).toBe("$1,000,000.00")
    })
  })

  describe("formatDate", () => {
    it("formats date string correctly", () => {
      const result = formatDate("2023-04-15")
      expect(result).toContain("Apr")
      expect(result).toContain("15")
      expect(result).toContain("2023")
    })

    it("handles different date formats", () => {
      const result = formatDate("2023-12-25")
      expect(result).toContain("Dec")
      expect(result).toContain("25")
    })
  })

  describe("parseDate", () => {
    it("parses date string to Date object", () => {
      const result = parseDate("2023-04-15")
      expect(result).toBeInstanceOf(Date)
      expect(result.getFullYear()).toBe(2023)
      expect(result.getMonth()).toBe(3) // April is month 3 (0-indexed)
      expect(result.getDate()).toBe(15)
    })
  })
})
