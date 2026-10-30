import {
  IconChevronDown,
  IconFilter,
  IconSearch,
} from "./icons";

type FilterBarProps = {
  filters: string[];
  showSearchButton?: boolean;
};

export function FilterBar({ filters, showSearchButton = true }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-left">
        {filters.map((label) => (
          <button key={label} type="button" className="filter-pill">
            <span>{label}</span>
            <IconChevronDown />
          </button>
        ))}
        <button type="button" className="clear-filters">
          Clear All Filter
        </button>
      </div>
      <div className="filter-right">
        {showSearchButton ? (
          <button type="button" className="icon-round soft" aria-label="Search filters">
            <IconSearch />
          </button>
        ) : null}
        <button type="button" className="all-filters">
          <IconFilter />
          <span>All Filters</span>
        </button>
      </div>
    </div>
  );
}
