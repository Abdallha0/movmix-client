import styles from "@/app/settings/settings.module.css"

function Playback() {
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <div className={styles.info}>
                    <span className={styles.label}>Streaming Quality</span>
                    <span className={styles.sublabel}>Auto (Recommended), High, or Data Saver</span>
                </div>
                <select className={styles.select}>
                    <option>Auto</option>
                    <option>High (4K/UHD)</option>
                    <option>Data Saver</option>
                </select>
            </div>
            <div className={styles.row}>
                <div className={styles.info}>
                    <span className={styles.label}>Auto-Play Next Episode</span>
                    <span className={styles.sublabel}>Automatically start the next episode in a series.</span>
                </div>
                <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                </label>
            </div>
        </div>)
}

export { Playback }