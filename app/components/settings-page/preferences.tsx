import styles from "@/app/settings/settings.module.css"

function Preferences() {
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <div className={styles.info}>
                    <span className={styles.label}>Personalized Recommendations</span>
                    <span className={styles.sublabel}>Allow AI to suggest movies based on your history.</span>
                </div>
                <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                </label>
            </div>
            <div className={styles.row}>
                <div className={styles.info}>
                    <span className={styles.label}>Favorite Genres</span>
                    <span className={styles.sublabel}>Sci-Fi, Thriller, Noir</span>
                </div>
                <button className={styles.button}>Edit</button>
            </div>
            {/* Mature Content Filter */}
            <div className={styles.row}>
                <div className={styles.info}>
                    <span className={styles.label}>Mature Content Filter</span>
                    <span className={styles.sublabel}>Hide content with specific age ratings.</span>
                </div>
                <label className={styles.toggle}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                </label>
            </div>
        </div>
    )
}

export { Preferences }