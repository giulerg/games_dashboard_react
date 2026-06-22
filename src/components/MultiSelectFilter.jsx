import { useEffect, useMemo, useRef, useState } from 'react'

export function MultiSelectFilter({ label, options, selected, onChange, placeholder }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const selectedValues = useMemo(() => new Set(selected), [selected])

  const selectedLabel = useMemo(() => {
    if (!selected.length) return placeholder
    if (selected.length === 1) return selected[0]
    return `${selected.length} selected`
  }, [placeholder, selected])

  const toggleValue = (value) => {
    if (selectedValues.has(value)) {
      onChange(selected.filter((item) => item !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const clearSelection = () => {
    onChange([])
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return

    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <div className="filter-control">
      <span className="filter-label">{label}</span>
      <div className="multi-select" ref={rootRef}>
        <button
          className={open ? 'select-trigger open' : 'select-trigger'}
          type="button"
          onClick={() => setOpen((current) => !current)}
        >
          <span>{selectedLabel}</span>
          <i aria-hidden="true" />
        </button>

        {open && (
          <div className="select-menu">
            <button className="select-action" type="button" onClick={clearSelection}>
              Clear
            </button>
            <div className="select-options">
              {options.map((option) => (
                <label className="select-option" key={option}>
                  <input
                    checked={selectedValues.has(option)}
                    type="checkbox"
                    onChange={() => toggleValue(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
