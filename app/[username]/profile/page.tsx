import Content from "@/app/components/profile/content"
import styles from "./profile.module.css"
import Sidebar from "@/app/components/home-page/sidebar";
export default function page() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWrapper}>
        <Content />
              <Sidebar active="profile" />
      </div>
    </div>
  )
}


