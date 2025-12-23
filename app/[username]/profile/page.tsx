import Content from "@/app/components/profile/content"
import styles from "./profile.module.css"

export default function page() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWrapper}>
        <Content />
      </div>
    </div>
  )
}


