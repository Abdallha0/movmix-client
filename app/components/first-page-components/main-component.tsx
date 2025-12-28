"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import { trending } from "@/app/api/tmdb"

interface Pages {
    status: boolean,
    movies: Array<{
        poster: string;
        title: string;
        overview: string;
        tmdb: string;
    }>
}

function FirstPageComponent() {
    const [loading, setLoading] = useState(true);
    const [p1, setP1] = useState<Pages>()
    const [p2, setP2] = useState<Pages>()

    useEffect(() => {
        async function fetchData() {
            const one = await trending("day", 1, 1);
            const two = await trending("day", 2, 2);
            setP1(one as Pages);
            setP2(two as Pages);
            setLoading(false);
        }
        if (p1?.status && p2?.status) {
            setLoading(false)
            return;
        }
        fetchData();
        setLoading(false)
    }, [])

    if (loading) return <div className="loader"></div>
    return (
        <div className="welcome_page">
            <aside className="left">

                <div className="poster_container">
                    {
                        p1?.movies.map((item, i) => (
                            <div key={item.tmdb || i} className="poster">
                                <img src={item.poster} alt={item.title} />
                            </div>
                        ))
                    }
                </div>
            </aside>

            <section className="content">
                <div className="sec1">
                    <span className="sec1_title">
                        Welcom to <h1 className="logo">Movmix</h1>
                    </span>
                    <div className="para">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quam temporibus dolore enim
                            tempora incidunt suscipit quia ut rem esse.
                        </p>
                    </div>

                    <Link href="/home">
                        <button className="started_btn">Started now</button>
                    </Link>
                </div>
            </section>

            <aside className="right">
                <div className="poster_container">
                    {
                        p2?.movies.map((item, i) => (
                            <div key={item.tmdb || i} className="poster">
                                <img src={item.poster} alt={item.title} />
                            </div>
                        ))
                    }
                </div>
            </aside>
        </div>
    )
}

export default FirstPageComponent
