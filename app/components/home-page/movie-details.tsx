import PlayFill from "../icons/play-fill"
import styles from "./css/hero.module.css"
import StarFill from "../icons/star-fill"

function MovieDetails({ title, overview, ratting }: { title: string, overview: string, ratting: number }) {
    let titleFormat = title?.includes(":") ? title?.split(":")[0] : title?.split(" ").slice(0, 3).join(" ");
    let subTitleFormat = title?.includes(":") ? title?.split(":")[1] : title?.split(" ").slice(3, ).join(" ");
    let overviewFormat = overview?.split(" ").length > 20 ? overview?.split(" ").slice(0, 20).join(" ") + " ..." : overview
    return (
        <div className={styles.hero_content}>
            <h1 data-aos="zoom-in">{titleFormat}</h1>
            <h2 data-aos="fade-right">{subTitleFormat}</h2>
            <p data-aos="fade-right">{overviewFormat}</p>
            <div className={styles.rating} data-aos="fade-up">
            {
            Array.from({length: +(ratting.toString()[0] / 2).toFixed() }).map((_, i) => (<span key={i} className={styles.star}><StarFill size={25} color="gold" /></span>))
            }
            </div>
            <div className="hero-buttons" data-aos="zoom-in">
                <button className=" btn btn-primary"> <PlayFill size={20} color="white" /> Watch Now</button>
                <button className="btn btn-secondary">Trailer</button>
            </div>
        </div>
    )
}


export default MovieDetails
