import { Grid3X3, List } from "lucide-react";
import styles from "./css/filter.module.css";

interface FilterSecProps {
  filter: string;
  setFilter: (s: string) => void;
  sorting: string;
  setSorting: (s: string) => void;
}

export function FilterSec({ filter, setFilter, sorting, setSorting }: FilterSecProps) {
  return (
    <div className={styles.filters_section}>
      
      {/* FILTER TABS */}
      <div className={styles.filter_tabs}>
        <button
          onClick={() => setFilter("all")}
          className={`${styles.filter_tab} ${filter === "all" && styles.active}`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("watching")}
          className={`${styles.filter_tab} ${filter === "watching" && styles.active}`}
        >
          Watching
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`${styles.filter_tab} ${filter === "completed" && styles.active}`}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("plan-to-watch")}
          className={`${styles.filter_tab} ${filter === "plan-to-watch" && styles.active}`}
        >
          Plan to Watch
        </button>
      </div>

      {/* SORTING + VIEW */}
      <div className={styles.filter_controls}>
        
        <select
          className={styles.dropdown_select}
          value={sorting}
          onChange={(e) => setSorting(e.target.value)}
        >
          <option value="Recently Added">Sort by: Recently Added</option>
          <option value="Rating">Sort by: Rating</option>
          <option value="Year">Sort by: Year</option>
          <option value="Title">Sort by: Title</option>
        </select>

        <div className={styles.view_toggle}>
          <button className={`${styles.view_btn} ${styles.active}`}>
            <Grid3X3 size={18} />
          </button>

          <button className={styles.view_btn}>
            <List size={18} />
          </button>
        </div>

      </div>

    </div>
  )
}

