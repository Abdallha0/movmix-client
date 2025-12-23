import styles from "./css/statistics.module.css"

export function Statistics({ totalWatches, reviewsLength, watchlistLength, avgRating }: { totalWatches: number, reviewsLength: number, watchlistLength: number, avgRating: number }) {
    return (
        <div className={styles.statsGrid}>
            <div className={styles.statCard}>
                <p className={styles.statValue}>{totalWatches} min</p>
                <p className={styles.statLabel}>total watches</p>
            </div>
            <div className={styles.statCard}>
                <p className={styles.statValue}>{reviewsLength}</p>
                <p className={styles.statLabel}>Reviews</p>
            </div>
            <div className={styles.statCard}>
                <p className={styles.statValue}>{watchlistLength}</p>
                <p className={styles.statLabel}>Watchlist</p>
            </div>
            <div className={styles.statCard}>
                <p className={styles.statValue}>{avgRating}</p>
                <p className={styles.statLabel}>Avg Rating</p>
            </div>
        </div>
    )
}