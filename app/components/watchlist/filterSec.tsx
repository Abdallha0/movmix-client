import { Grid3X3, List } from "lucide-react";
import styles from "./css/filter.module.css";

export function FilterSec() {
    return (
        <div className={styles.filters_section}>
            <div className={styles.filter_tabs}>
                <button className={`${styles.filter_tab} ${styles.active}`}>All</button>
                <button className={styles.filter_tab}>Watching</button>
                <button className={styles.filter_tab}>Completed</button>
                <button className={styles.filter_tab}>Plan to Watch</button>
            </div>
            <div className={styles.filter_controls}>
                <select className={styles.dropdown_select}>
                    <option>Sort by: Recently Added</option>
                    <option>Sort by: Rating</option>
                    <option>Sort by: Year</option>
                    <option>Sort by: Title</option>
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