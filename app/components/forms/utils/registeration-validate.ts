function registerationValidate(firstName: string, lastName: string, email: string, password: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName) {
        return {
            to: "firstName",
            message: "please enter your first name"
        }
    }

        if (!lastName) {
        return {
            to: "lastName",
            message: "please enter your last name"
        }
    }

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

export default registerationValidate