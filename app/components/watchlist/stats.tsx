import { CheckCircle, Clock, Eye, Film } from "lucide-react";
import styles from "./css/stats.module.css";

export function Stats(){
    return(
                <div className={styles.stats_section}>
          <div className={styles.stat_card}>
            <div className={`${styles.stat_icon} ${styles.gold}`}>
              <Film size={22} />
            </div>
            <div className={styles.stat_value}>8</div>
            <div className={styles.stat_label}>Total Movies</div>
          </div>
          <div className={styles.stat_card}>
            <div className={`${styles.stat_icon} ${styles.blue}`}>
              <Eye size={22} />
            </div>
            <div className={styles.stat_value}>2</div>
            <div className={styles.stat_label}>Currently Watching</div>
          </div>
          <div className={styles.stat_card}>
            <div className={`${styles.stat_icon} ${styles.green}`}>
              <CheckCircle size={22} />
            </div>
            <div className={styles.stat_value}>3</div>
            <div className={styles.stat_label}>Completed</div>
          </div>
          <div className={styles.stat_card}>
            <div className={`${styles.stat_icon} ${styles.red}`}>
              <Clock size={22} />
            </div>
            <div className={styles.stat_value}>3</div>
            <div className={styles.stat_label}>Plan to Watch</div>
          </div>
        </div>
    )
}