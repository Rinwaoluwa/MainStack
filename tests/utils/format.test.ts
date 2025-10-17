import { formatCurrency, formatDate } from "../../src/utils/format"

describe("Format Utilities", () => {
  describe("formatCurrency", () => {
    it("formats number as USD currency", () => {
      expect(formatCurrency(1000)).toBe("USD 1,000.00")
    })

    it("handles decimal values", () => {
      expect(formatCurrency(1234.56)).toBe("USD 1,234.56")
    })

    it("handles zero", () => {
      expect(formatCurrency(0)).toBe("USD 0.00")
    })
  })

  describe("formatDate", () => {
    it("formats date correctly", () => {
      const date = "2023-07-17"
      expect(formatDate(date)).toBe("Jul 17, 2023")
    })
  })
})
