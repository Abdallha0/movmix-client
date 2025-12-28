import styles from "@/app/settings/settings.module.css"

function Security() {
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <div className={styles.info}>
                    <span className={styles.label}>Active Sessions</span>
                    <span className={styles.sublabel}>3 devices currently logged in.</span>
                </div>
                <button className={styles.button}>Manage</button>
            </div>
            <div className={styles.row}>
                <div className={styles.info}>
                    <span className={styles.label}>Global Logout</span>
                    <span className={styles.sublabel}>Sign out from all devices except this one.</span>
                </div>
                <button className={`${styles.button} ${styles.primaryButton}`}>Log Out All</button>
            </div>
        </div>)
}

export { Security }