"use client"
import Link from "next/link"
import styles from "./css/login-styles.module.css"
import { Eye, EyeClosed } from "lucide-react"
import { FormEvent, useEffect, useState } from "react"
import loginValidator from "./utils/login-validators"
import login from "@/app/api/login"
import { useToast } from "@/app/providers/toastProvider"
import { setToken } from "@/app/utils/cookieUtils"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react';
import AOS from "aos";
import "aos/dist/aos.css";

function Login() {

    useEffect(() => {AOS.init({ duration: 800, once: true})},[]);

    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [validateMsg, setValidateMsg] = useState({
        to: "",
        message: ""
    })

    const { showToast } = useToast();
    const router = useRouter();

    async function handleSubmition(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        // get form data
        const user_data = new FormData(e.currentTarget)
        const [email, password] = [
            user_data.get("email") as string,
            user_data.get("password") as string
        ];

        // validate data
        const validate_data = loginValidator(email, password)
        if (validate_data !== "success") {
            setLoading(false);
            setValidateMsg(validateMsg);
            return;
        }

        // send request to server
        const res = await login(email, password);

        if (!res?.status) {
            setLoading(false)
            showToast(res?.message, "error");
            return;
        }

        setToken(res?.data.token);
        router.push("/home")
    }

    if (loading) return <div className="loading"></div>

    return (
        <div className="layout center-page">
            <form action="" method="post" data-aos="zoom-in" onSubmit={handleSubmition} className={styles.form} noValidate>
                <h1 className="logo">Movmix</h1>

                <div className={styles.form_group}>
                    <label className={styles.form_label} htmlFor="email">{validateMsg.to === "email" ? validateMsg.message : "Email"}</label>
                    <input type="text" name="email" id="email" />
                </div>

                <div className={styles.form_group}>
                    <label className={styles.form_label} htmlFor="password">Password</label>
                    <input type={!showPass ? "password" : "text"} name="password" id="password" />
                    {
                        showPass ?
                            <button className={styles.show_pass_btn} onClick={() => setShowPass(false)}><Eye /></button> :
                            <button className={styles.show_pass_btn} onClick={() => setShowPass(true)}><EyeClosed /></button>
                    }
                    <div className={styles.pass_row}>
                        <Link href="/forgot-password">forget password</Link>
                    </div>
                </div>

                <div className={styles.line}>
                    <span></span>
                    or
                    <span></span>
                </div>

                <button className={styles.google_btn} onClick={() => signIn("google")}>
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
                </button> <button type="submit" className={styles.submit_btn}>Log-in</button>
                <div className={styles.Singup}>
                    new to <span className="logo">Movmix</span> <br /> <Link href="/register">Sing-up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
