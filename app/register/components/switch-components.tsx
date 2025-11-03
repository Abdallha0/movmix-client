"use client";
import Register from "@/app/components/forms/register-form";
import Verify from "@/app/components/forms/verify-form";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function RegisterComponent() {

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const [data, setData] = useState({
        email: "",
        time: 0,
        goVerify: false
    });
    const [go, isGo] = useState(false)

    useEffect(() => {
        if (data.goVerify) isGo(true);
    }, [data])

    return (!go ? <Register setData={setData} /> : <Verify email={data.email} time={data.time} />)

}

export default RegisterComponent
