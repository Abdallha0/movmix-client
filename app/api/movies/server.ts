import { getToken } from "@/app/utils/cookieUtils";

const url = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SERVER_URL : process.env.NEXT_PUBLIC_LOCALHOST_URL

export async function searchMovie(query: string) {
    try {
        const res = await fetch(`${url}/movies/search?query=${query}`);

        if (!res.ok) {
            throw new Error("response status error")
        }

        const data = await res.json();

        if (!data.status) {
            return {
                message: data.message,
                status: data.status,
            }
        }

        return {
            data: data.data,
            status: data.status,
        }

    } catch (error: any) {
        console.log(error)
        return {
            message: error.message || "internal server error",
            status: false,
        }
    }
}

export async function getStreamData(id: number | string) {
    if (!id) {
        return {
            message: "wrong when try to show movie details please try again or choose anather one.",
            status: false,
        }
    }
    try {
        const res = await fetch(`${url}/movies/stream?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: getToken() || ""
            }
        });
        const data = await res.json();

        if (!res.ok) {
            return {
                message: data.message || "something wrong when trying to fetch data",
                status: false,
            }
        }

        if (!data || !data.status) {
            return {
                message: data.message || "no data about this movie",
                status: false,
            }
        }

        return data

    } catch (error: any) {

        return {
            message: error.message || "Internal server error",
            status: false
        }
    }
}


export async function mangePlayList(route: "set" | "get" | "remove", f_id?: string | number, title?: string, poster?: string, year?: number, rating?: number, progress?: number, genres?: string) {
    let options;
    let headers = {
        "Content-Type": "application/json",
        Authorization: getToken() || ""
    }

    switch (route) {
        case "get":
            options = {
                method: "GET",
                headers,
            }
            break;
        case "set":
            if (!f_id || !title || !poster || !year || !genres || !rating) {
                console.log(f_id, title, poster, year, genres, progress, rating)
                return {
                    message: "data of movie is't completed to put it in watchlist",
                    status: false,
                }
            }
            options = {
                method: "POST",
                headers,
                body: JSON.stringify({ f_id, title, poster, year, genres, progress, rating })
            }
            break;
        case "remove":
            options = {
                method: "DELETE",
                headers,
                body: JSON.stringify({ f_id })
            }
            break;
        default:
            options = {}
            break;
    }

    try {
        const res = await fetch(`${url}/movies/${route}/play-list`, options);
        const data = await res.json();

        if (!res.ok) {
            return {
                message: "Wrong when connecting to server",
                status: false
            }
        }

        return data

    } catch (error: any) {
        return {
            message: error.message || "Internal server error", status: false
        }
    }
}
