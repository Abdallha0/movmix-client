"use client"
import { useEffect, useState } from "react"
import { Star, ChevronDown } from "lucide-react"
import styles from "./css/reviews-section.module.css"
import { getMoviesReviews } from "@/app/api/movies-api-utils"
import { formatTime } from "@/app/utils/format-time"
import { reviewsMangmeint } from "@/app/api/reveiws-mangment"
import { useToast } from "@/app/providers/toastProvider"
import { user_data_mangment } from "@/app/api/server"

export function ReviewsSection({ id, rating, communityReveiws, reviewsMaxLength, title }: { id: number, title: string, rating: number, reviewsMaxLength: number, communityReveiws: Array<any> }) {
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [userRating, setUserRating] = useState(rating)
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState(communityReveiws);
  const [newReview, setNewReview] = useState("");
  const [formTitle, setFormTitle] = useState("Share Your Thoughts");
  const [endIndex, setEndIndex] = useState(5);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const res: any = await getMoviesReviews(id, 1);
      if (!res.status) return;

      setReviews((prev) => prev.concat(res.data));
    }
    fetchData()
  }, []);

  const { showToast } = useToast()

  useEffect(() => {
    if (userRating === rating) return;

    async function fetchData() {
      await user_data_mangment("set-rating", { rating: userRating, m_id: id })
    }
    fetchData()
  }, [userRating])

  async function submitReveiw() {
    if (!newReview) {
      setFormTitle('please write your reveiw.');
      return;
    }

    if (newReview.length < 3) {
      setFormTitle("reveiw is too short");
      return;
    }

    const res = await reviewsMangmeint("set", { m_id: id, rating: userRating, title, review: newReview });
    if (!res.status) {
      showToast(res.message, "info")
      return;
    }

setShowWriteReview(false)
    setNewReview("");
    setFormTitle("Share Your Thoughts")
    showToast("Reveiw was adding success", "success")
    return;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>User Reviews</h2>
          <p className={styles.subtitle}>{reviews.length} reviews from our community</p>
        </div>
        <button className={styles.writeButton} onClick={() => setShowWriteReview(!showWriteReview)}>
          Write a Review
        </button>
      </div>

      {showWriteReview && (
        <div className={styles.reviewForm}>
          <h3 className={styles.formTitle}>{formTitle}</h3>

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
                    stroke={star <= (hoverRating || userRating) ? "gold" : ""}
                  />
                </button>
              ))}
            </div>
            {userRating > 0 && <span className={styles.ratingDisplay}>{userRating}/10</span>}
          </div>

          <textarea placeholder="What did you think of the movie?" value={newReview} maxLength={300} className={styles.textarea} onChange={(e) => setNewReview(e.target.value)} />
          <div className={styles.formActions}>
            <button className={styles.submitButton} onClick={submitReveiw}>Submit Review</button>
            <button className={styles.cancelButton} onClick={() => {
              setShowWriteReview(false);
              setFormTitle("Share Your Thoughts");
              setNewReview("");
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {
        <div className={styles.reviewsList}>
          {reviews.length >= 1 ? reviews.slice(0, endIndex).map((review: any, i) => (
            <div key={i} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.authorInfo}>
                  <div className={styles.avatar}>
                    <img
                      src={review.photo || "/profile.png"}
                      className={styles.avatarImage}
                    />
                  </div>
                  <div>
                    <div className={styles.authorName}>
                      <span>{review.userName}</span>
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
              <p className={styles.reviewContent}>{review.comment}</p>

            </div>
          )) : <div className="error-msg">No Reviews</div>}
        </div>
      }
      {
        reviews.length > endIndex ? <div className={styles.loadMore}>
          <button className={styles.loadMoreButton} onClick={() => setEndIndex((prev) => prev += 5)}>
            Load More Reviews
            <ChevronDown size={16} />
          </button>
        </div> : ""
      }
    </section>
  )
}
