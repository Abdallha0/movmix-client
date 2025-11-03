"use client";
import React, { useRef, useState } from "react";
import styles from "./css/verify-styles.module.css"
import verify from "@/app/api/verify";
import { setToken } from "@/app/utils/cookieUtils";
import { useRouter } from "next/navigation";

function Verify({ email, time }: { email: string, time: number }) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    // email format
    function emailFormat() {
        const atIndex = email.indexOf("@");
        const cutEmail = email.slice(atIndex);
        const emailPart = `${email.slice(0, 2)}***${cutEmail}`;
        return emailPart
    }
    const Email: string = emailFormat();

    const [text, setText] = useState(`We have sent a verification code to ${Email} please check your inbox`)
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const [otp, setOtp] = useState(0);
    const [disabled, setDisabled] = useState(false);

    // handle keys
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // handle paste
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").trim();

        if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
            const newCode = [...code];

            for (let i = 0; i < pastedData.length; i++) {
                if (i < 6) {
                    newCode[i] = pastedData[i];
                }
            }

            setCode(newCode);

            const nextEmptyIndex = newCode.findIndex((c) => !c);
            const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
            inputRefs.current[focusIndex]?.focus();

            if (!newCode.includes("") && newCode.filter(Boolean).length === 6) {
                setOtp(+(newCode.join("")));
            }
        }
    };

    // handle inputs changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {

        if (disabled) return;

        const value = e.target.value;

        if (/^\d*$/.test(value) && value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }

            if (value && !newCode.includes("")) {
                setOtp(+(newCode.join("")));
            }
        }
    };

    // submit code
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (disabled) return;

        // check code validation
        if (otp.toString().length < 6) {
            setText("code must be formed with 6 numbers")
            return;
        }

        // send request
        const res = await verify(otp, email);

        if (!res.status) {
            setText(res.message);
            return;
        }

        // set token
        setToken(res.data.token);
        router.push("/home")

    }

    // check if time was expired
    if (Date.now() > time) {
        setDisabled(true);
        setText("expired code time out, please resend a new code");

    }

    return (
        <div className="layout center-page">
            <form method="post" className={styles.otp_Form} data-aos="flip-left" onSubmit={handleSubmit} noValidate>
                <span className={styles.mainHeading}>Enter OTP</span>
                <p className={styles.otpSubheading}>{text}</p>
                <div className={styles.inputContainer}>

                    {
                        Array.from({ length: 6 }).map((i, index) => (
                            <input
                                maxLength={1}
                                type="text"
                                key={index}
                                className={styles.otp_input}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                onChange={(e) => handleChange(e, index)}
                                disabled={disabled}
                            />
                        ))
                    }

                </div>
                <button disabled={disabled} className={styles.verifyButton} type="submit">Verify</button>
                <p className={styles.resendNote}>Didn't receive the code? <button className={styles.resendBtn}>Resend Code</button></p>
            </form>
        </div>
    )
}
export default Verify