import { url, headers } from "./utils"

export async function reviewsMangmeint(route: "set" | "delete", reqData: { m_id: string | number, title?: string, review?: string, rating?: number, c_id?: string }) {
    let options = {
        method: "",
        headers,
        body: JSON.stringify({
        m_id: reqData["m_id"],
        comment: reqData["review"],
        rating: reqData["rating"],
        title: reqData["title"],
        c_id: reqData["c_id"],
    })
    }
    switch (route) {
        case "set":
            options["method"] = "POST"
            break;

        case "delete":
            options["method"] = "DELETE"
            break;
    }

    try {
        const res = await fetch(`${url}/comments/${route}`, options);
        const data = await res.json();
        console.log(data, options)

        if (!data?.status) return {
            message: data.message || "faild!",
            status: false,
        }

        return {
            message: data.message || "",
            status: data.status || true
        }
    } catch (error: any) {
        return {
            message: error.message || "internal server error",
            status: false
        }
    }
}
