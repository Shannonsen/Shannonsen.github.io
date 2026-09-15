import { FILTERS } from '../data/sections'
import type { Filter } from '../data/sections'
import './FilterPills.css'

// Maps a filter onto the CSS modifier that gives it its section colour.
const MODIFIER: Record<Filter, string> = {
  All: 'all',
  Skills: 'skills',
  Experience: 'experience',
  Projects: 'project',
}

type FilterPillsProps = {
  active: Filter
  onChange: (filter: Filter) => void
}

export function FilterPills({ active, onChange }: FilterPillsProps) {
  return (
    <div className="filter-pills" role="group" aria-label="Filter slides by section">
      {FILTERS.map((filter) => {
        const isActive = filter === active
        return (
          <button
            type="button"
            key={filter}
            className={`filter-pill is-${MODIFIER[filter]}${isActive ? ' is-active' : ''}`}
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
          >
            {filter}
          </button>
        )
      })}
    </div>
  )
}
