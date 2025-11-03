import { getLocationDetails } from "../location";

const key1 = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY!}`;
const key2 = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY2!}`;
const url = process.env.NEXT_PUBLIC_TMDB_URL!;
const posterUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";
const backdropUrl = "https://image.tmdb.org/t/p/w1280";
export async function trending(time_window: "day" | "week", key: 1 | 2, page: number) {
    try {
        const res = await fetch(`${url}trending/movie/${time_window}?${key === 1 ? key1 : key2}&page=${page || 1}`)
        const data = await res.json();

        if (data.results.length < 1) {
            return {
                message: "undefind treinding movies",
                status: false,
            }
        }

        const movies = data.results.map((i: any) => {
            return {
                poster: i.poster_path ? `${posterUrl}${i.poster_path}` : "",
                backdrop:  i.backdrop_path || i.poster_path ? `${backdropUrl}${i.backdrop_path || i.poster_path}` : "",
                title: i.original_title || i.title || "",
                overview: i.overview || "",
                tmdb: i.id || 0,
                ratting: i.vote_average.toFixed(1) || 0,
                year: i.release_date.split("-")[0] || 0,
            }
        })

        return {
            movies,
            status: true
        }

    } catch (error: any) {
        return {
            message: error.message || "server error",
            status: false
        };
    }
}

export async function nowPlay(key: 1 | 2, withRegion: boolean, page?: number) {
    try {
        const reg = withRegion ? await getLocationDetails() : null
        const res = await fetch(`${url}movie/now_playing?${key === 1 ? key1 : key2}&page=${page || 1}&region=${reg?.country_code || ""}`);
        
        if(!res.ok){
        return {
        message: `error with status code ${res.status} `,
        status: false,
        }
        }
        
        const data = await res.json();

        if (data.results.length < 1) {
            return {
                message: "undefind movies",
                status: false,
            }
        }

        const movies = data.results.map((i: any) => {
            return {
                poster: i.poster_path ? `${posterUrl}${i.poster_path}` : "",
                backdrop:  i.backdrop_path || i.poster_path ? `${backdropUrl}${i.backdrop_path || i.poster_path}` : "",
                title: i.original_title || i.title || "",
                overview: i.overview || "",
                tmdb: i.id || 0,
                ratting: i.vote_average.toFixed(1) || 0,
                year: i.release_date.split("-")[0] || 0,
            }
        })

        return {
            movies,
            status: true
        }

    } catch (error: any) {
        return {
            message: error.message || "server error",
            status: false
        };
    }
}
