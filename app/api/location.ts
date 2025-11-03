export async function getLocationDetails() {
    try {
        const res = await fetch("https://ipwho.is/");
        if(!res.ok){
            return {
                message: "wrong when sending request to ip"
            }
        }
        const data = await res.json();
        return data
    } catch (error) {
        return {
            message: "wrong when trying to get location data",
            status: false,
        }
    }
}