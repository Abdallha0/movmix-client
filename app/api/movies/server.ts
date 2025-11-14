const url = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SERVER_URL : process.env.NEXT_PUBLIC_LOCALHOST_URL
export async function searchMovie(query: string) {
            console.log(query)
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
