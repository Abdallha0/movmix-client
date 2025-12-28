"use client"
import { Header } from "./header"
import { Statistics } from "./statistics"
import { LikedMovies } from "./likedMovies"
import { RecentReveiws } from "./rescentReviews"
import { RecentActivity } from "./recentActivity"
import { useEffect, useState } from "react"
import { getProfile } from "@/app/api/server"

function Content() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [userInfo, setUserInfo] = useState<any>({});
    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        async function fetchData() {
            const res: any = await getProfile();
console.log(res)
            if (!res.status) {
                setError(res.message || "Faild to fetch");
                setIsLoading(false)
                return;
            }

            setUserInfo({ email: res.data.email || "", name: res.data.name || "", date: res.data.date.split(" ").slice(1, 4).join(" ") || "", image: res.data.image || "/profile.png" })
            setUserData({ totalWatches: res.data.totalWatches || 0, watchlistLength: res.data.watchlistLength || 0, reviewsLength: res.data.reviewsLength || 0, avgRating: res.data.avgRating || 0, likedMovies: res.data.likedMovies || [], reviews: res.data.reviews || [] })
            setIsLoading(false)
        }
        fetchData()
    }, [])
    if (isLoading) return <div className="loader"></div>
    if (error) return <div className="error-msg">{error}</div>
    return (
        <>
            <Header data={userInfo} />

            <Statistics totalWatches={userData.totalWatches} reviewsLength={userData.reviewsLength} watchlistLength={userData.watchlistLength} avgRating={userData.avgRating} />

            <LikedMovies data={userData.likedMovies} />

            {/* <RecentActivity /> */}

            <RecentReveiws reviews={userData.reviews} />
        </>
    )
}

export default Content
