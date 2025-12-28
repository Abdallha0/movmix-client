import styles from "@/app/settings/settings.module.css"

function Notifications() {
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <div className={styles.info}>
                    <span className={styles.label}>Email Notifications</span>
                    <span className={styles.sublabel}>Receive updates about new releases and account activity.</span>
                </div>
                <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                </label>
            </div>
            <div className={styles.row}>
                <div className={styles.info}>
                    <span className={styles.label}>Push Notifications</span>
                    <span className={styles.sublabel}>Get alerts on your mobile device for favorite shows.</span>
                </div>
                <label className={styles.toggle}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                </label>
            </div>
        </div>)
}

export { Notifications }