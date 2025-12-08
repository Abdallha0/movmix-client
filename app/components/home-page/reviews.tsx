import { formatTime } from "@/app/utils/format-time";
import StarFill from "../icons/star-fill";
import styles from "./css/featured.module.css";
function Reviews({ reviews }: { reviews: Array<any> }) {

    return (
        <ul className={styles.review_list}>
            {
                reviews.length >= 1 ?
                    reviews.map((item, i) => (
                        <li key={item.id || i}>
                            <div className={styles.review_header}>
                                <img src={item.avatar || "/porfile.png"} alt="" />
                                <span>{item.author}</span>
                            </div>
                            <div className={styles.review_body}>{item.content}</div>
                            <sub className={styles.review_fotter}>
                                {item.author_details.rating ? <div className={styles.star}>
                                    <span>{item.author_details.rating}</span>
                                    <StarFill color="gold" size={25} />

                                </div> : ""

                                }
                                <span className={styles.time}>{formatTime(item.date) || ""}</span>
                            </sub>
                        </li>
                    )) : <div className="not-found"> No reviews about this movie. </div>
            }
        </ul>
    )
}

export default Reviews
