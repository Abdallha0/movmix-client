"use client"

import { useState } from "react"
import { Search, Bell, User, Menu, X } from "lucide-react"
import styles from "./css/movie-header.module.css"

export function MovieHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.leftSection}>
            <h1 className={styles.logo}>StreamFlix</h1>

            <nav className={styles.desktopNav}>
              <a href="#" className={styles.navLink}>
                Home
              </a>
              <a href="#" className={styles.navLinkActive}>
                Movies
              </a>
              <a href="#" className={styles.navLink}>
                TV Shows
              </a>
              <a href="#" className={styles.navLink}>
                My List
              </a>
            </nav>
          </div>

          <div className={styles.rightSection}>
            <div className={`${styles.searchWrapper} ${isSearchOpen ? styles.searchOpen : ""}`}>
              <div className={styles.searchBox}>
                <Search className={styles.searchIcon} />
                <input type="text" placeholder="Search movies..." className={styles.searchInput} />
              </div>
            </div>

            <button
              className={styles.iconButton}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>

            <button className={styles.iconButtonDesktop} aria-label="Notifications">
              <Bell size={20} />
            </button>

            <button className={styles.iconButtonDesktop} aria-label="User profile">
              <User size={20} />
            </button>

            <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className={`${styles.mobileNav} ${styles.animateSlideIn}`}>
            <a href="#" className={styles.mobileNavLink}>
              Home
            </a>
            <a href="#" className={styles.mobileNavLinkActive}>
              Movies
            </a>
            <a href="#" className={styles.mobileNavLink}>
              TV Shows
            </a>
            <a href="#" className={styles.mobileNavLink}>
              My List
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
