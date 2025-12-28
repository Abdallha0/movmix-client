import styles from "@/app/settings/settings.module.css"

function Privacy() {
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <div className={styles.info}>
                    <span className={styles.label}>Profile Visibility</span>
                    <span className={styles.sublabel}>Allow others to see your watch history and lists.</span>
                </div>
                <select className={styles.select}>
                    <option>Private</option>
                    <option>Friends Only</option>
                    <option>Public</option>
                </select>
            </div>
            <div className={styles.row}>
                <div className={styles.info}>
                    <span className={styles.label}>Watch History Tracking</span>
                    <span className={styles.sublabel}>Disable to stop saving what you watch.</span>
                </div>
                <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                </label>
            </div>
        </div>)
}

export { Privacy }