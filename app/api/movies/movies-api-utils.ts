const key1 = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY!}`;
const key2 = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY2!}`;
const url = process.env.NEXT_PUBLIC_TMDB_URL!;

export async function getMovieTrailer(id: string | number, key: 1 | 2) {
    if (!id) return;
    try {
        const res = await fetch(`${url}movie/${id}/videos?${key === 1 ? key1 : key2}`);
        const json = await res.json();
        const data = json.results[0];
        if (data.site !== "YouTube") {
            return {
                message: `trailer is come from ${data.site} not youtube`,
                status: false,
            }
        }
        return {
            data: {
                title: data.name || "",
                url: `https://www.youtube.com/embed/${data.key}` || ""
            },
            status: true
        }

    } catch (error) {
        return {
            message: "wrong when trying to get trailer vedio key",
            status: false
        }
    }
}

export async function getMoviesReviews(id: number, key: 1 | 2) {
    if (!id) return;
    try {
        const res = await fetch(`${url}movie/${id}/reviews?${key === 1 ? key1 : key2}`);
        const data = await res.json();

        if (!data || data.results.length < 1) {
            return {
            data: [],
                message: "No Reviews Defind",
                status: false,
            }
        }
        
        return {
            data: data.results.map((i: any) => ({
                author: i.author || i.author_details.name || i.author_details.username || "user",
                avatar: i.author_details.avatar_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${i.author_details.avatar_path}` : "",
                rating: i.author_details.rating || 0,
                content: i.content || "",
                date: i.updated_at,
            })) || [],
            status: true
        }



    } catch (error) {
        return {
        data: [],
            message: "wrong when trying to get reviews, please try again later",
            status: false
        }
    }
}


export async function getSimilarMovies(id: number, key: 1 | 2) {
    if (!id) return;
    try {
        const res = await fetch(`${url}movie/${id}/similar?${key === 1 ? key1 : key2}&include_adult=false&language=en-US`);
        const data = await res.json();

        if (!data || data.results.length < 1) {
            return {
            data: [],
                message: "No Reviews Defind",
                status: false,
            }
        }
        
        return {
            data: data.results.map((i: any) => ({
            id: i.id,
            title: i.title,
            poster: i.poster_path ? `https://image.tmdb.org/t/p/w1280${i.poster_path}` : "",
            year: i.release_date.split("-")[0] || 0,
            ratting: i.vote_average ? i.vote_average.toFixed(1) : 0,
            })) || [],
            status: true
        }



    } catch (error) {
        return {
        data: [],
            message: "wrong when trying to get reviews, please try again later",
            status: false
        }
    }
}
