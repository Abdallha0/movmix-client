import styles from "@/app/settings/settings.module.css"
export function AccSetting(){
    return (
        <div className={styles.card}>
            <div className={styles.row}>
              <div className={styles.info}>
                <span className={styles.label}>Email Address</span>
                <span className={styles.sublabel}>alex.walker@example.com</span>
              </div>
              <button className={styles.button}>Change</button>
            </div>
            <div className={styles.row}>
              <div className={styles.info}>
                <span className={styles.label}>Password</span>
                <span className={styles.sublabel}>Last changed 3 months ago</span>
              </div>
              <button className={styles.button}>Update</button>
            </div>
            <div className={styles.row}>
              <div className={styles.info}>
                <span className={styles.label}>Member Since</span>
                <span className={styles.sublabel}>May 12, 2023</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.info}>
                <span className={styles.label}>Delete Account</span>
                <span className={styles.sublabel}>Permanently remove your account and all data.</span>
              </div>
              <button className={`${styles.button} ${styles.dangerButton}`}>Delete</button>
            </div>
          </div>
    )
}