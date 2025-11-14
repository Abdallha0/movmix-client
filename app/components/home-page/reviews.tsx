import StarFill from "../icons/star-fill";
import styles from "./css/featured.module.css";
import profile from "@/public/profile.png"
function Reviews({ reviews }: { reviews: Array<any>}) {

    function formatTime(t: string) {
        let now = new Date().toISOString();
        let y = Math.abs(+now.split("T")[0].split("-")[0] - +t.split("T")[0].split("-")[0]);
        let m = Math.abs(+now.split("T")[0].split("-")[1] - +t.split("T")[0].split("-")[1]);
        let d = Math.abs(+now.split("T")[0].split("-")[2] - +t.split("T")[0].split("-")[2]);
        let h = Math.abs(+now.split("T")[1].split(":")[0] - +t.split("T")[1].split(":")[0]);
        let M = Math.abs(+now.split("T")[1].split(":")[1] - +t.split("T")[1].split(":")[1]);
        let s = Math.abs(+now.split("T")[1].split(":")[2].split(".")[0] - +t.split("T")[1].split(":")[2].split(".")[0]);

        if (y !== 0) {
            return `since ${y} years`
        } else if (m !== 0) {
            return `since ${m} month`
        } else if (d !== 0) {
            return `since ${d} days`
        } else if (h !== 0) {
            return `since ${h} hours`
        } else if (M !== 0) {
            return `since ${M} min`
        } else if (s !== 0) {
            return `since ${s} sec`
        }

    }


    return (
        <ul className={styles.review_list}>
            {
                reviews.length >= 1 ?
                    reviews.map((item, i) => (
                        <li key={item.id || i}>
                            <div className={styles.review_header}>
                                <img src={item.author_details.avatar_path || profile} alt="" />
                                <span>{item.author || item.author_details.userName || item.author_details.name || ""}</span>
                            </div>
                            <div className={styles.review_body}>{item.content}</div>
                            <sub className={styles.review_fotter}>
                                {item.author_details.rating ? <div className={styles.star}>
                                    <span>{item.author_details.rating}</span>
                                    <StarFill color="gold" size={25} />

                                </div> : ""

                                }
                                <span className={styles.time}>{formatTime(item.updated_at || item.created_at) || ""}</span>
                            </sub>
                        </li>
                    )) : <div className="not-found"> No reviews about this movie. </div>
            }
        </ul>
    )
}

export default Reviews
