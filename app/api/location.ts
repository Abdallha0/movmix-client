import lang from "../utils/langs"
export async function getLocationDetails() {
    try {
        const res = await fetch("https://ipwho.is/");
        if(!res.ok){
            return {
                message: "wrong when sending request to ip"
            }
        }
        const data = await res.json();
        let language = lang(data.country_code);
        return {
        data,
        lang: language,
        }
    } catch (error) {
        return {
            message: "wrong when trying to get location data",
            status: false,
        }
    }
}
