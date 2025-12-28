"use client"
import { useEffect, useState, useRef } from "react"
import { Clock, Calendar, Globe, Film, Award } from "lucide-react"
import styles from "./css/movie-details.module.css"
import { getTrailers } from "@/app/api/tmdb";

interface DetailsData {
  id: number;
  poster: string;
  runtime: string;
  released: string;
  language: string;
  budget: string;
  plot: string;
  ratings: Array<{ Source: string, Value: string }>,
  awards: Array<string>;
  director: string;
  writers: string;
  boxOffice: string;
  votes: number;
  country: string;
  revenue: number;
  productionCompanies: Array<any>;
  actors: Array<string>;

}

export function MovieDetails({ id, poster, runtime, released, language, budget, plot, ratings, awards, director, writers, boxOffice, votes, country, revenue, productionCompanies, actors }: DetailsData) {
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "trailers">("overview")
  const [trailers, setTrailers] = useState({ status: false, data: [], message: "" });
const [isLoading, setIsLoading] = useState(false);
const loadedOnce = useRef(false);

function formatMoney(amount: number, currency:string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency
  }).format(amount);
}

useEffect(() => {
  async function fetchData() {
  setIsLoading(true)
    if (!id){
      setIsLoading(false);
      return;
    }

    const res = await getTrailers(id, 2);
    console.log(res);
    setTrailers(res);
    loadedOnce.current = true;
      setIsLoading(false)
  }

  if (activeTab === "trailers" && !loadedOnce.current) {
    fetchData();
  }
}, [activeTab, id]);

if(isLoading) return <section className={styles.section}> <div className={styles.trailersGrid}> <div className="loader"></div></div></section>

  return (
    <section className={styles.section}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "overview" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === "details" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
        <button
          className={`${styles.tab} ${activeTab === "trailers" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("trailers")}
        >
          Trailers
        </button>
      </div>

      {activeTab === "overview" && (
        <div className={styles.overviewGrid}>
          <div className={styles.leftColumn}>
            <div className={styles.posterCard}>
              <img src={poster} alt="" className={styles.poster} />
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <Clock size={16} />
                  <span>Runtime</span>
                </div>
                <p className={styles.statValue}>{runtime}</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <Calendar size={16} />
                  <span>Release</span>
                </div>
                <p className={styles.statValue}>{released}</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <Globe size={16} />
                  <span>Language</span>
                </div>
                <p className={styles.statValue}>{language}</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <Film size={16} />
                  <span>Budget</span>
                </div>
                <p className={styles.statValue}>{budget}</p>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.synopsis}>
              <h2 className={styles.sectionTitle}>Synopsis</h2>
              <p className={styles.synopsisText}>{plot.slice(0, (plot.length / 2))}</p>
              <p className={styles.synopsisText}>{plot.slice((plot.length / 2) + 1,)}</p>
            </div>

            <div className={styles.ratings}>
              <h2 className={styles.sectionTitle}>Ratings & Reviews</h2>
              <div className={styles.ratingsGrid}>
                {
                  ratings ? ratings.map((item, i) => (
                    <div className={styles.ratingCard} key={item.Source || i}>
                      <div className={styles.ratingValue} style={{ color: "var(--accent)" }}>
                        {item.Value}
                      </div>
                      <div className={styles.ratingLabel}>{item.Source}</div>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${item.Value.split("/")[0].replace(/[^0-9.]/g, '').split(".").join("")}%` }} />
                      </div>
                    </div>
                  )) : <div className="error-msg">No Ratings For this movie</div>
                }
              </div>
            </div>

            <div className={styles.awards}>
              <h2 className={styles.sectionTitle}>Awards & Recognition</h2>
              <div className={styles.awardsList}>
                {awards.map(
                  (award) => (
                    <div key={award} className={styles.awardBadge}>
                      <Award size={16} />
                      {award}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "details" && (
        <div className={styles.detailsGrid}>
          <div className={styles.detailsColumn}>
            <h3 className={styles.detailsTitle}>Production Details</h3>
            <div className={styles.detailsList}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Director</span>
                <span className={styles.detailValue}>{director}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Writers</span>
                <span className={styles.detailValue}>{writers}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Votes</span>
                <span className={styles.detailValue}>{votes}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Box Office</span>
                <span className={styles.detailValue}>{boxOffice}</span>
              </div>
            </div>
          </div>
          <div className={styles.detailsColumn}>
            <h3 className={styles.detailsTitle} style={{ color: "transparent" }}>More Details</h3>
            <div className={styles.detailsList}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Country</span>
                <span className={styles.detailValue}>{country}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Revenue</span>
                <span className={styles.detailValue}>{formatMoney(revenue)}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Production</span>
                <span className={styles.detailValue}>{productionCompanies.map(i => i.name).slice(0, 2).join(", ")}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Heroes</span>
                <span className={styles.detailValue}>{actors.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "trailers" && (
        <div className={styles.trailersGrid}>
          {trailers.data.length >= 1 ?
            trailers.data.map((trailer: any, index) => (
              <div key={trailer.url || index} className={styles.trailerCard}>
                <iframe style={{ width: "100%", height: "100%" }} width="0" height="0" src={trailer.url} title={trailer.title} frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
            )) : <div className="error-msg">{trailers.message || "No Trailers Defind"}</div>}
        </div>
      )}
    </section>
  )
}
