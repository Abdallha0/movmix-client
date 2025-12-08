import { title } from "process";
import { getLocationDetails } from "../location";
import { allGenres } from "./utils";

const key1 = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY!}`;
const key2 = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY2!}`;
const url = process.env.NEXT_PUBLIC_TMDB_URL!;
const posterUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";
const backdropUrl = "https://image.tmdb.org/t/p/w1280";

export async function trending(time_window: "day" | "week", key: 1 | 2, page?: number, oTitle?: boolean, genre?: "Action" | "Abenteuer" | "Animation" | "Romance" | "Horror" | "Comedy") {
    try {
        const genreId = genre ? allGenres[genre].id : "";
        const res = await fetch(`${url}trending/movie/${time_window}?${key === 1 ? key1 : key2}&page=${page || 1}&with_genres=${genreId}`)
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
                backdrop: i.backdrop_path ? `${backdropUrl}${i.backdrop_path}` : "",
                title: !oTitle ? i.title || i.original_title : i.original_title || i.title || "",
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

export async function nowPlay(key: 1 | 2, withRegion: boolean, page?: number, oTitle?: boolean, genre?: "Action" | "Abenteuer" | "Animation" | "Romance" | "Horror" | "Comedy") {
    try {
        const reg = withRegion ? await getLocationDetails() : null;
        const langEndpoint = `&language=${reg?.lang || ""}-${reg?.data.country_code || ""}`;
        const regEndpoints = `&region=${reg?.data.country_code || ""}`;
        const genreId = genre ? allGenres[genre].id : "";
        const res = await fetch(`${url}movie/now_playing?${key === 1 ? key1 : key2}&page=${page || 1}${withRegion ? regEndpoints : ""}&with_genres=${genreId}`);

        if (!res.ok) {
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
                backdrop: i.backdrop_path ? `${backdropUrl}${i.backdrop_path}` : "",
                title: !oTitle ? i.title || i.original_title : i.original_title || i.title || "",
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

export async function newMovies(key: 1 | 2, withRegion: boolean, page?: number, year?: number | null, genre?: "Action" | "Abenteuer" | "Animation" | "Romance" | "Horror" | "Comedy", oTitle?: boolean) {
    try {
        const reg = withRegion ? await getLocationDetails() : null;
        const langEndpoint = `&language=${reg?.lang || ""}-${reg?.data.country_code || ""}`;
        const regEndpoints = `&region=${reg?.data.country_code || ""}`;
        const genreId = genre ? allGenres[genre].id : "";
        const res = await fetch(`${url}discover/movie?${key === 1 ? key1 : key2}&page=${page || 1}${withRegion ? regEndpoints : ""}${year ? `&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${new Date().toISOString().split("T")[0]}` : ""}&sort_by=primary_release_date.desc&with_genres=${genreId}}&vote_count.gte=100`);

        if (!res.ok) {
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
                backdrop: i.backdrop_path ? `${backdropUrl}${i.backdrop_path}` : "",
                title: !oTitle ? i.title || i.original_title : i.original_title || i.title || "",
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

export async function popular(key: 1 | 2, withRegion: boolean, page?: number, year?: number | null, genre?: "Action" | "Abenteuer" | "Animation" | "Romance" | "Horror" | "Comedy", oTitle?: boolean) {
    try {
        const reg = withRegion ? await getLocationDetails() : null;
        const langEndpoint = `&language=${reg?.lang || ""}-${reg?.data.country_code || ""}`
        const regEndpoints = `&region=${reg?.data.country_code || ""}`
        const genreId = genre ? allGenres[genre].id : "";
        const res = await fetch(`${url}discover/movie?${key === 1 ? key1 : key2}&page=${page || 1}${withRegion ? regEndpoints : ""}${year ? `&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${new Date().toISOString().split("T")[0]}` : ""}&sort_by=popularity.desc&with_genres=${genreId}&vote_count.gte=100`);

        if (!res.ok) {
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
                backdrop: i.backdrop_path ? `${backdropUrl}${i.backdrop_path}` : "",
                title: !oTitle ? i.title || i.original_title : i.original_title || i.title || "",
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

export async function topMovies(key: 1 | 2, withRegion: boolean, page?: number, year?: number | null, genre?: "Action" | "Abenteuer" | "Animation" | "Romance" | "Horror" | "Comedy", oTitle?: boolean) {
    try {
        const reg = withRegion ? await getLocationDetails() : null;
        const langEndpoint = `&language=${reg?.lang || ""}-${reg?.data.country_code || ""}`
        const regEndpoints = `&region=${reg?.data.country_code || ""}`
        const genreId = genre ? allGenres[genre].id : "";
        const res = await fetch(`${url}movie/top_rated?${key === 1 ? key1 : key2}&page=${page || 1}${withRegion ? regEndpoints : ""}${year ? `&primary_release_date.gte=${year}-01-01` : ""}${year ? `&release_date.gte=${year}-01-01` : ""}&with_genres=${genreId}&vote_count.gte=100`);

        if (!res.ok) {
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
                backdrop: i.backdrop_path ? `${backdropUrl}${i.backdrop_path}` : "",
                title: !oTitle ? i.title || i.original_title : i.original_title || i.title || "",
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

export async function getExternalIds(key: 1 | 2, id: number, idType: "IMDb" | "Facebook" | "Wikidata" | "Instagram" | "Twitter") {
    try {
        const res = await fetch(`${url}movie/${id}/external_ids?${key === 1 ? key1 : key2}`);
        const data = await res.json();

        if (!data) {
            return {
                message: "No external ids found",
                status: false
            }
        }

        let exId;

        switch (idType) {
            case "IMDb":
                exId = data.imdb_id
                break;
            case "Facebook":
                exId = data.facebook_id
                break;
            case "Wikidata":
                exId = data.wikidata_id
                break;
            case "Instagram":
                exId = data.instagram_id
                break;
            case "Twitter":
                exId = data.twitter_id
                break;
            default:
                exId = null
                break;
        }

        return exId

    } catch (error: any) {
        return {
            message: error.message || "id Internal server error",
            status: false
        }
    }
}

export async function getTrailers(id: number, key: 1 | 2) {
    if (!id) { return { message: "trailers key not found", status: false } }
    try {
        const res = await fetch(`${url}movie/${id}/videos?${key === 1 ? key1 : key2}`);
        const data = await res.json();
        if (!data || data.results.length < 1) {
            return {
                message: "No Trailers defind",
                status: false,
            }
        }

        return {
        data: data.results.slice(0, 4).map((i: any) => ({
            url: i.key && `https://www.youtube.com/embed/${i.key}` || "",
            title: i.name || "",
            language: i.iso_639_1 || "",
        })),
        status: true,
        }
    } catch (error: any) {
        return {
            message: error.message || "internal server error",
            status: false
        }
    }
}
