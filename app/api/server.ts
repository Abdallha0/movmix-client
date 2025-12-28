import {url, headers} from "./utils"
import { getToken } from "../utils/cookieUtils"

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

/*

auth
/upload/profile-img   (POST)
/user/profile         (GET)
-------------------------------------

movies
/data-mangement/set-new-watch-score   [body => timer]  (POST)
/data-mangement/set-rating      [body => rating, m_id] (POST)
/data-mangement/delete-rating   [body => m_id]         (DELETE)
/data-mangement/set-like        [body =>  m_id, title, poster, rating, year]   (POST)
/data-mangement/delete-like     [body => m_id]         (DELETE)

comments
/set          [body => comment, rating, m_id]   (POST)
/delete       [body =>  m_id, c_id]             (DELETE)

*/

export async function getProfile() {
    try {
        const res = await fetch(`${url}/auth/user/profile`, {
            method: "GET",
            headers,
        });

        const data = await res.json();

        if (!data.status) return {
            message: data.message || "internal server error",
            status: false
        }

        return {
            data: data.data || [],
            status: data.status
        }
    } catch (error: any) {
        return {
            message: error.message || "Internal server error",
            status: false
        }
    }
}

export async function UploadImg(formData: FormData) {
    try {
        const res = await fetch(`${url}/auth/upload/profile-img`, {
            method: "POST",
            headers: {
                Authorization: getToken() || ""
            },
            body: formData
        });

        const data = await res.json();

        if (!data.status) return {
            message: data.message || "internal server error",
            status: false
        }

        return data
    } catch (error: any) {
        return {
            message: error.message || "internal server error",
            status: false
        }
    }
}

export async function user_data_mangment(route: "set-new-watch-score" | "set-rating" | "delete-rating" | "set-like" | "delete-like",
    reqData: { timer?: number, m_id?: string | number, title?: string, rating?: number, poster?: string, year?: number }) {

    if (!route) return;

    let options = {
        method: "",
        headers,
        body: ""
    }

    switch (route) {
        case "set-new-watch-score":
            if (!reqData.timer) return;
            options["method"] = "POST";
            options["body"] = JSON.stringify({ timer: reqData.timer });
            break;
        case "set-rating":
            if (!reqData.m_id || !reqData.rating) return;
            options["method"] = "POST";
            options["body"] = JSON.stringify({ m_id: reqData.m_id, rating: reqData.rating });
            break;
        case "delete-rating":
            if (!reqData.m_id) return;
            options["method"] = "DELETE";
            options["body"] = JSON.stringify({ m_id: reqData.m_id });
            break;
        case "set-like":
            if (!reqData.m_id) return;
            options["method"] = "POST";
            options["body"] = JSON.stringify({ m_id: reqData.m_id, title: reqData.title, poster: reqData.poster, rating: reqData.rating, year: reqData.year });
            break;
        case "delete-like":
            if (!reqData.m_id) return;
            options["method"] = "DELETE";
            options["body"] = JSON.stringify({ m_id: reqData.m_id });
            break;

    }

    try {
        const res = await fetch(`${url}/movies/data-mangement/${route}`, options);
        const data = await res.json();

        if (!data?.status) return {
            message: data.message,
            status: false,
        }

        return {
            message: data?.message,
            status: data?.status
        }
    } catch (error: any) {
        return {
            message: error.message || "internal server error",
            status: false
        }
    }
}
