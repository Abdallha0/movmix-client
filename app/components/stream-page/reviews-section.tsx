"use client"
import { useEffect, useState } from "react"
import { Star, ChevronDown } from "lucide-react"
import styles from "./css/reviews-section.module.css"
import { getMoviesReviews } from "@/app/api/movies/movies-api-utils"
import { formatTime } from "@/app/utils/format-time"

export function ReviewsSection({ id }: { id: number }) {
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0);

  const [reviews, setReviews] = useState({ status: false, data: [], message: "" });

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const res: any = await getMoviesReviews(id, 1);
      if (!res) return;

      setReviews(res);
    }

    if (!reviews.status && reviews.data.length < 1) {
      fetchData()
    }

  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>User Reviews</h2>
          <p className={styles.subtitle}>{reviews.data.length} reviews from our community</p>
        </div>
        <button className={styles.writeButton} onClick={() => setShowWriteReview(!showWriteReview)}>
          Write a Review
        </button>
      </div>

      {showWriteReview && (
        <div className={styles.reviewForm}>
          <h3 className={styles.formTitle}>Share Your Thoughts</h3>

          <div className={styles.ratingInput}>
            <span className={styles.ratingLabel}>Your Rating:</span>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                  key={star}
                  className={styles.starButton}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUserRating(star)}
                >
                  <Star
                    size={20}
                    className={star <= (hoverRating || userRating) ? styles.starFilled : styles.starEmpty}
                    fill={star <= (hoverRating || userRating) ? "gold" : "none"}
                    stroke={star <= (hoverRating || userRating) ? "gold" : "none"}
                  />
                </button>
              ))}
            </div>
            {userRating > 0 && <span className={styles.ratingDisplay}>{userRating}/10</span>}
          </div>

          <textarea placeholder="What did you think of the movie?" maxLength={300} className={styles.textarea} />
          <div className={styles.formActions}>
            <button className={styles.submitButton}>Submit Review</button>
            <button className={styles.cancelButton} onClick={() => setShowWriteReview(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {
        reviews.status &&
        <div className={styles.reviewsList}>
          {reviews.data.length >= 1 ? reviews.data.slice(0, 10).map((review: any, i) => (
            <div key={review.date || i} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.authorInfo}>
                  <div className={styles.avatar}>
                    <img
                      src={review.avatar || "/profile.png"}
                      className={styles.avatarImage}
                    />
                  </div>
                  <div>
                    <div className={styles.authorName}>
                      <span>{review.author}</span>
                    </div>
                    <span className={styles.reviewDate}>{formatTime(review.date)}</span>
                  </div>
                </div>
                <div className={styles.reviewRating}>
                  <Star size={16} fill="currentColor" />
                  <span>{review.rating}/10</span>
                </div>
              </div>

              <h4 className={styles.reviewTitle}>{review.title || ""}</h4>
              <p className={styles.reviewContent}>{review.content}</p>

            </div>
          )) : <div className="error-msg">No Reviews</div>}
        </div>
      }
      {
        reviews.data.length > 10 ? <div className={styles.loadMore}>
          <button className={styles.loadMoreButton}>
            Load More Reviews
            <ChevronDown size={16} />
          </button>
        </div> : ""
      }
    </section>
  )
}
