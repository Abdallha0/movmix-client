import { formatTime } from "@/app/utils/format-time";
import styles from "./css/recentReveiws.module.css";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/app/providers/toastProvider";
import { reviewsMangmeint } from "@/app/api/reveiws-mangment";
interface Reviews {
    movieId: string,
    title: string,
    rating: number,
    contents: Array<{ comment: string, date: string }>
}
export function RecentReveiws({ reviews }: { reviews: Array<Reviews> }) {
    const { showToast } = useToast();
    const [myReviews, setMyReviews] = useState(reviews);

    async function deleteReveiw(c_id: string, m_id: number | string) {
        const res = await reviewsMangmeint("delete", { c_id, m_id });
        if (!res.status) {
            showToast(res.message || "faild", "error")
            return;
        }
        setMyReviews(prev =>
            prev
                .map(movie => {
                    if (movie.movieId !== m_id) return movie;

                    return {
                        ...movie,
                        contents: movie.contents.filter(
                            review => review._id !== c_id
                        ),
                    };
                })
                .filter(movie => movie.contents.length > 0)
        );


        showToast(res.message, "success")
    }
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
                    myReviews.length >= 1 ? myReviews.map((item: Reviews, i) => (
                        <article key={item.title || i} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <h3 className={styles.reviewTitle}>{item.title}</h3>
                                <span className={styles.reviewStars}>★{item.rating}</span>
                            </div>
                            {
                                item.contents.map((it: { comment: string, date: string, _id: string }, index) => (
                                    <div className={styles.content}>
                                        <p className={styles.reviewText}>
                                            {it.comment}
                                        </p>
                                        <div className={styles.reviewMeta}>
                                            <span>{formatTime(it.date)}</span>
                                        </div>
                                        <button className={styles.removeComment} onClick={() => { deleteReveiw(it._id, item.movieId); }}><Trash2 /></button>
                                    </div>

                                ))
                            }

                        </article>
                    )) : <div className="error-msg">You did`t set any review</div>
                }
            </div>
        </section>
    )
}
