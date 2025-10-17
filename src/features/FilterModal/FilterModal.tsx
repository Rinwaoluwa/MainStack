import { useState, useEffect } from "react"
import { Modal } from "../../components/Modal/Modal"
import { Checkbox } from "../../components/Checkbox/Checkbox"
import { DatePicker } from "../../components/DatePicker/DatePicker"
import type { FilterState } from "../../types"
import endpoints from "../../endpoints"
import styles from "./FilterModal.module.css"
import { recentDates } from "@/utils/constants"
import { ArrowsDown } from "@/assets/svgs/ArrowDown"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: FilterState) => void
  initialFilters?: FilterState
}

export const FilterModal = ({ isOpen, onClose, onApply, initialFilters }: FilterModalProps) => {
  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>('start');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      dateRange: {
        start: "2020-01-01",
        end: "2025-12-31",
      },
      transactionType: [],
      transactionStatus: [],
    },
  )

  const [preset, setPreset] = useState<FilterState["preset"]>(initialFilters?.preset)

  // Sync local state with initialFilters when modal opens
  useEffect(() => {
    if (isOpen && initialFilters) {
      setFilters(initialFilters)
      setPreset(initialFilters.preset)
    }
  }, [isOpen, initialFilters])

  const handlePresetClick = (presetType: FilterState["preset"]) => {
    setPreset(presetType)
    const today = new Date()
    let start = new Date()

    switch (presetType) {
      case "today":
        start = new Date(today)
        break
      case "last7days":
        start = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "thismonth":
        start = new Date(today.getFullYear(), today.getMonth(), 1)
        break
      case "last3months":
        start = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
    }

    setFilters((prev) => ({
      ...prev,
      preset: presetType,
      dateRange: {
        start: start.toISOString().split("T")[0],
        end: today.toISOString().split("T")[0],
      },
    }))
  }

  const handleTypeChange = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      transactionType: prev.transactionType.includes(type)
        ? prev.transactionType.filter((t) => t !== type)
        : [...prev.transactionType, type],
    }))
  }

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      transactionStatus: prev.transactionStatus.includes(status)
        ? prev.transactionStatus.filter((s) => s !== status)
        : [...prev.transactionStatus, status],
    }))
  }

  const handleRangeDateClick = (date: string) => {
    const dateObj = new Date(date);

    setFilters((prev) => {
      let newStart = prev.dateRange.start;
      let newEnd = prev.dateRange.end;

      if (selectionMode === 'start') {
        newStart = date;
        // Move to selecting the end date
        setSelectionMode('end');
        // If the new start date is *after* the current end date, reset the end date
        if (new Date(date) > new Date(newEnd)) {
          newEnd = date;
        }
      } else { // selectionMode === 'end'
        // Ensure the selected end date is not before the start date
        if (dateObj < new Date(newStart)) {
          newEnd = newStart; // Set end to start if invalid selection
        } else {
          newEnd = date;
        }
        // Selection is complete, close the calendar
        setIsCalendarOpen(false);
        setSelectionMode('start'); // Reset mode for the next interaction
      }

      return {
        ...prev,
        dateRange: { start: newStart, end: newEnd },
      };
    });
  };

  const handleClear = () => {
    const clearedFilters = {
      dateRange: {
        start: "2020-01-01",
        end: "2025-12-31",
      },
      transactionType: [],
      transactionStatus: [],
    }
    setFilters(clearedFilters)
    setPreset(undefined)
    onApply(clearedFilters)
    onClose()
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const selectedCount =
    (filters.dateRange.start !== (initialFilters?.dateRange.start ?? "2020-01-01") ||
      filters.dateRange.end !== (initialFilters?.dateRange.end ?? "2025-12-31")
      ? 1
      : 0) +
    filters.transactionType.length +
    filters.transactionStatus.length
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter"
      variant="right"
      handleClear={handleClear}
      handleApply={handleApply}
      selectedCount={selectedCount}
    >
      <div className={styles.content}>
        {/* Preset Buttons */}
        <div className={styles.section}>
          <div className={styles.presetButtons}>
            {recentDates.map((p) => (
              <button
                key={p}
                className={`${styles.presetButton} ${preset === p ? styles.active : ""}`}
                onClick={() => handlePresetClick(p)}
              >
                {p === "today" && "Today"}
                {p === "last7days" && "Last 7 days"}
                {p === "thismonth" && "This month"}
                {p === "last3months" && "Last 3 months"}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Date Range</h3>
          <div className={styles.dateRange}>
            <DatePicker
              value={filters.dateRange.start}
              onChange={handleRangeDateClick}
              isOpen={isCalendarOpen}
              onOpen={() => setIsCalendarOpen(true)}
              onClose={() => setIsCalendarOpen(false)}
              selectionMode={selectionMode}
              isInputActive={selectionMode === 'start'}
              showCalendarUI={true}
            />

            <DatePicker
              value={filters.dateRange.end}
              onChange={handleRangeDateClick}
              isOpen={isCalendarOpen}
              onOpen={() => { setIsCalendarOpen(true); setSelectionMode('end'); }}
              onClose={() => setIsCalendarOpen(false)}
              selectionMode={selectionMode}
              isInputActive={selectionMode === 'end'}
              showCalendarUI={false}
            />
          </div>
        </div>

        {/* Transaction Type */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Transaction Type</h3>
          <details className={styles.dropdown} open>
            <summary className={styles.dropdownSummary}>
              {filters.transactionType.length > 0
                ? filters.transactionType.join(", ")
                : "Select Transaction Type"}
              <span className={styles.summaryArrow}><ArrowsDown /></span>
            </summary>
            <div className={styles.dropdownPanel}>
              <div className={styles.checkboxGroup}>
                {endpoints.transactionTypes.map((type) => (
                  <Checkbox
                    key={type}
                    label={type}
                    checked={filters.transactionType.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                ))}
              </div>
            </div>
          </details>
        </div>

        {/* Transaction Status */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Transaction Status</h3>
          <details className={styles.dropdown} open>
            <summary className={styles.dropdownSummary}>
              {filters.transactionStatus.length > 0
                ? filters.transactionStatus.join(", ")
                : "Select Status"}
              <span className={styles.summaryArrow}><ArrowsDown /></span>
            </summary>
            <div className={styles.dropdownPanel}>
              <div className={styles.checkboxGroup}>
                {endpoints.transactionStatuses.map((status) => (
                  <Checkbox
                    key={status}
                    label={status}
                    checked={filters.transactionStatus.includes(status)}
                    onChange={() => handleStatusChange(status)}
                  />
                ))}
              </div>
            </div>
          </details>
        </div>

      </div>
    </Modal>
  )
}
