async function login(email: string, password: string) {
    if (!email || !password) {
        return {
            message: "can not defind email or password",
            status: false,
        }
    }
    try {
        const url = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_LOCALHOST_URL! : process.env.NEXT_PUBLIC_SERVER_URL!
        const res = await fetch(url + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
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

        return {
            message: "login success",
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

export default login