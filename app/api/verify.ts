async function verify(code: number, email: string) {
    if (!code) {
        return {
            message: "please enter verify code",
            status: false,
        }
    }
    try {
        const url = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_LOCALHOST_URL! : process.env.NEXT_PUBLIC_SERVER_URL!
        const res = await fetch(url + "/auth/register/verify-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, code })
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
            message: "success verify",
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

export default verify