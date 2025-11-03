function loginValidator(email: string, password: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return {
            to: "email",
            message: "please enter your email"
        }
    }

    if (!password) {
        return {
            to: "password",
            message: "please enter your password"
        }
    }

    if (!emailRegex.test(email)) {
        return {
            to: "email",
            message: "please enter a valid email"
        }
    }

    if (password.length < 8) {
        return {
            to: "passowrd",
            message: "password must be 8 charcter at least"
        }
    }

    return "success"
}

export default loginValidator