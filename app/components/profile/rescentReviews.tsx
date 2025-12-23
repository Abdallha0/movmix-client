import { formatTime } from "@/app/utils/format-time"
import styles from "./css/recentReveiws.module.css"
interface Reviews {
    title: string,
    rating: number,
    contents: Array<{ comment: string, date: string }>
}
export function RecentReveiws({ reviews }: { reviews: Array<Reviews> }) {
    return (
        <section className={styles.reviewsSection}>
            <div className={styles.reviewHeader}>
                <h2 className={styles.reviewTitle}>Recent Reviews</h2>
                <a href="#" className={styles.viewAll}>
                    View All →
                </a>
            </div>

            <div className={styles.reviewsList}>
                {
                    reviews.length >= 1 ? reviews.map((item: Reviews, i) => (
                        <article key={item.title || i} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <h3 className={styles.reviewTitle}>{item.title}</h3>
                                <span className={styles.reviewStars}>★{item.rating}</span>
                            </div>
                            {
                                item.contents.map((it: { comment: string, date: string }, i) => (
                                    <>
                                        <p className={styles.reviewText}>
                                            {it.comment}
                                        </p>
                                        <div className={styles.reviewMeta}>
                                            <span>{formatTime(it.date)}</span>
                                        </div>
                                    </>

                                ))
                            }
                        </article>
                    )) : <div className="error-msg">You did`t set any review</div>
                }
            </div>
        </section>
    )
}
