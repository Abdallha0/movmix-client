"use client"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import styles from "./css/cast-section.module.css"

export function CastSection({ casts }: { casts: Array<any> }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Cast & Crew</h2>
        <div className={styles.controls}>
          <button className={styles.scrollButton} onClick={() => scroll("left")} aria-label="Scroll left">
            <ChevronLeft size={20} />
          </button>
          <button className={styles.scrollButton} onClick={() => scroll("right")} aria-label="Scroll right">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className={styles.scrollContainer}>
        {casts.map((member) => (
          <div key={member.name} className={styles.castCard}>
            <div className={styles.imageWrapper}>
              <img
                src={member.img || "/profile.png"}
                alt={member.name}
                className={styles.castImage}
              />
              <div className={styles.imageOverlay} />
            </div>
            <h3 className={styles.castName}>{member.name}</h3>
            <p className={styles.castRole}>{member.character}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
