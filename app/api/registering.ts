import { setToken } from "../utils/cookieUtils"
async function registering(name: string, email: string, password: string, provider: "manul" | "google" | "facebook", providerId?: string,) {

    if (provider === "manul" && (!name || !email || !password)) {
        return {
            message: "data is not completed yet",
            status: false,
        }
    }

    if (provider !== "manul" && (!name || !email || !providerId)) {
        return {
            message: "data is not completed yet",
            status: false,
        }
    }

    try {
        const url = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_LOCALHOST_URL! : process.env.NEXT_PUBLIC_SERVER_URL!;
        const endpoint =
            provider === "manul"
                ? "/auth/register"
                : "/auth/register-by-provider";
        const res = await fetch(url + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(provider === "manul" ? { name, email, password, provider } : { name, email, password, provider, providerId })
        });

        if (!res.ok) {
            return {
                message: "server error when trying to send data",
                status: false
            }
        }

        const data = await res.json();

        if (!data.status) {
            return {
                message: data.message,
                status: data.status
            }
        }
        
        if(data.status){
        setToken(data.data.token as string)
        }

        return {
            message: "signup success",
            status: data.status,
            data: data.data,
        }

    } catch (error: any) {
        return {
            message: error?.message ? error?.message : "Server error",
            status: false
        }
    }
}

export default registering
