import { AccSetting } from "../components/settings-page/acc-setting"
import { Captions } from "../components/settings-page/captions"
import { Notifications } from "../components/settings-page/notifications"
import { Playback } from "../components/settings-page/playback"
import { Preferences } from "../components/settings-page/preferences"
import { Privacy } from "../components/settings-page/Privacy"
import { Security } from "../components/settings-page/Security"
import { Sidebar } from "../components/settings-page/sidebar"
import styles from "./settings.module.css"

function page() {
  return (
    <main className={styles.container}>
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <section className={styles.content}>
        {/* Account Settings */}
        <div className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Account Settings</h2>
            <p className={styles.sectionDescription}>Manage your core account details and subscription.</p>
          </header>
          <AccSetting />
        </div>

        {/* Playback Settings */}
        <div className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Playback & Streaming</h2>
            <p className={styles.sectionDescription}>Control your viewing experience and data usage.</p>
          </header>

          <Playback />
        </div>

        {/* Notifications Section */}
        <div className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Notifications</h2>
            <p className={styles.sectionDescription}>Manage how you receive updates and alerts.</p>
          </header>

          <Notifications />
        </div>

        {/* Subtitles & Captions */}
        <div className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Subtitles & Captions</h2>
            <p className={styles.sectionDescription}>Adjust how subtitles appear on your screen.</p>
          </header>
          <Captions />
        </div>

        {/* Preferences */}
        <div className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Preferences & Interests</h2>
            <p className={styles.sectionDescription}>Personalize your discovery experience.</p>
          </header>
          <Preferences />
        </div>

        {/* Privacy & Data Section */}
        <div className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Privacy & Data</h2>
            <p className={styles.sectionDescription}>Control your data and visibility.</p>
          </header>
          <Privacy />
        </div>

        {/* Security & Sessions */}
        <div className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Security & Sessions</h2>
            <p className={styles.sectionDescription}>Monitor where you are logged in.</p>
          </header>
          
          <Security />
        </div>
      </section>
    </main>
  )
}
export default page