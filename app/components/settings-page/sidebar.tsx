import styles from "./css/sidebar.module.css";

function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <h1 className={styles.sidebarTitle}>Settings</h1>
            <nav className={styles.nav}>
                <div className={`${styles.navItem} ${styles.activeNavItem}`}>Account</div>
                <div className={styles.navItem}>Preferences</div>
                <div className={styles.navItem}>Notifications</div>
                <div className={styles.navItem}>Privacy</div>
                <div className={styles.navItem}>Appearance</div>
                <div className={styles.navItem}>Security</div>
                <div className={styles.navItem}>Connected Accounts</div>
            </nav>
        </aside>
    )
}

export { Sidebar }