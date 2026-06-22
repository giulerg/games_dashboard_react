import { useMemo, useState } from 'react'

export function MultiSelectFilter({ label, options, selected, onChange, placeholder }) {
  const [open, setOpen] = useState(false)

  const selectedLabel = useMemo(() => {
    if (!selected.length) return placeholder
    if (selected.length === 1) return selected[0]
    return `${selected.length} selected`
  }, [placeholder, selected])

  const toggleValue = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="filter-control">
      <span className="filter-label">{label}</span>
      <div className="multi-select">
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
            <button className="select-action" type="button" onClick={() => onChange([])}>
              Clear
            </button>
            <div className="select-options">
              {options.map((option) => (
                <label className="select-option" key={option}>
                  <input
                    checked={selected.includes(option)}
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
