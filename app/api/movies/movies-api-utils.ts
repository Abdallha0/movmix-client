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

export async function getMoviesReviews(id: string | number, key: 1 | 2) {
    if (!id) return;
    try {
        const res = await fetch(`${url}movie/${id}/reviews?${key === 1 ? key1 : key2}`);
        const data = await res.json();
        
        return {
            data: data.results || [],
            status: true
        }

    } catch (error) {
        return {
            message: "wrong when trying to get reviews, please try again later",
            status: false
        }
    }
}
