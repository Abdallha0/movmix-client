"use client"
import Link from "next/link"
import { Eye, EyeClosed } from "lucide-react"
import { FormEvent, useState } from "react"
import registerationValidate from "./utils/registeration-validate"
import { useToast } from "@/app/providers/toastProvider"
import registering from "@/app/api/registering"
import styles from "./css/registeration-styles.module.css"
import { signIn } from 'next-auth/react';

function Register({ setData }: { setData: (d: { email: string, time: number, goVerify: boolean }) => void }) {
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [validateMsg, setValidateMsg] = useState({
        to: "",
        message: ""
    })

    const { showToast } = useToast()

    async function handleSubmition(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        // get form data
        const user_data = new FormData(e.currentTarget)
        const [firstName, lastName, email, password] = [
            user_data.get("firstName") as string,
            user_data.get("lastName") as string,
            user_data.get("email") as string,
            user_data.get("password") as string
        ];

        // validate data
        const validate_data = registerationValidate(firstName, lastName, email, password)
        if (validate_data !== "success") {
            setLoading(false);
            setValidateMsg(validateMsg);
            return;
        }

        // send request to server
        const res = await registering(`${firstName} ${lastName}`, email, password, "manul");

        if (!res?.status) {
            setLoading(false)
            showToast(res?.message, "error");
            return;
        }

        setData({
            email: res.data.email || email,
            time: res.data.time,
            goVerify: true,
        })

        setLoading(false)
    }

    if (loading) return <div className="loader"></div>
    return (
        <div className="layout center-page">
            <form action="" data-aos="flip-left" method="post" onSubmit={handleSubmition} className={styles.form} noValidate>
                <h1 className="logo">Movmix</h1>

                <div className={styles.form_group}>
                    <label className={styles.form_label} htmlFor="firstName">{validateMsg.to === "firstName" ? validateMsg.message : "First name"}</label>
                    <input type="text" name="firstName" id="firstName" />
                </div>

                <div className={styles.form_group}>
                    <label className={styles.form_label} htmlFor="lastName">{validateMsg.to === "lastName" ? validateMsg.message : "Last name"}</label>
                    <input type="text" name="lastName" id="lastName" />
                </div>

                <div className={styles.form_group}>
                    <label className={styles.form_label} htmlFor="email">{validateMsg.to === "email" ? validateMsg.message : "Email"}</label>
                    <input type="text" name="email" id="email" />
                </div>

                <div className={styles.form_group}>
                    <label className={styles.form_label} htmlFor="password">{validateMsg.to === "password" ? validateMsg.message : "Password"}</label>
                    <input type={!showPass ? "password" : "text"} name="password" id="password" />
                    {
                        showPass ?
                            <button type="button" className={styles.show_pass_btn} onClick={() => setShowPass(false)}><Eye /></button> :
                            <button type="button" className={styles.show_pass_btn} onClick={() => setShowPass(true)}><EyeClosed /></button>
                    }
                </div>

                <div className={styles.line}>
                    <span></span>
                    or
                    <span></span>
                </div>

                <button type="button" className={styles.google_btn} onClick={() => signIn("google")}>
                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                        <path fill="#4285F4"
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027">
                        </path>
                        <path fill="#34A853"
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1">
                        </path>
                        <path fill="#FBBC05"
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782">
                        </path>
                        <path fill="#EB4335"
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251">
                        </path>
                    </svg>
                    Continue with Google
                </button> <button type="submit" className={styles.submit_btn}>Sign-up</button>
                <div className={styles.login}>
                    already have account: <Link href="/login">log-in</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
