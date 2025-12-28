import styles from "@/app/settings/settings.module.css"

function Captions() {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.info}>
          <span className={styles.label}>Subtitle Language</span>
          <span className={styles.sublabel}>English (CC)</span>
        </div>
        <button className={styles.button}>Change</button>
      </div>
      <div className={styles.row}>
        <div className={styles.info}>
          <span className={styles.label}>Text Appearance</span>
          <span className={styles.sublabel}>Yellow, Medium, Drop Shadow</span>
        </div>
        <button className={styles.button}>Customize</button>
      </div>
    </div>)
}

export { Captions }