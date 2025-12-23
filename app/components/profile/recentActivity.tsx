import styles from "./css/recentActivity.module.css"
export function RecentActivity(){
    return (
        <section className={styles.activitySection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
          </div>

          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <img src="/dune-inspired-poster.png" alt="Movie" className={styles.activityPoster} />
              <div className={styles.activityContent}>
                <p className={styles.activityText}>
                  Added <span className={styles.activityMovie}>Dune: Part Two</span> to watchlist
                </p>
                <p className={styles.activityTime}>2 hours ago</p>
              </div>
            </div>

            <div className={styles.activityItem}>
              <img src="/images/posters/oppenheimer-poster.png" alt="Movie" className={styles.activityPoster} />
              <div className={styles.activityContent}>
                <p className={styles.activityText}>
                  Reviewed <span className={styles.activityMovie}>Oppenheimer</span> with 5 stars
                </p>
                <p className={styles.activityTime}>1 day ago</p>
              </div>
            </div>

            <div className={styles.activityItem}>
              <img src="/past-lives-movie-poster.jpg" alt="Movie" className={styles.activityPoster} />
              <div className={styles.activityContent}>
                <p className={styles.activityText}>
                  Watched <span className={styles.activityMovie}>Past Lives</span>
                </p>
                <p className={styles.activityTime}>3 days ago</p>
              </div>
            </div>
          </div>
        </section>
    )
}