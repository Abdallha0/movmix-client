"use client";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import HeartFill from "../icons/heart-fill";

function Like({ likes, onClick, liked }: { likes: number, onClick: () => Promise<boolean>, liked: boolean }) {

    const [likesCount, setLikesCount] = useState(likes);
    const [isActive, setIsActive] = useState(liked);

    // sync props with state
    useEffect(() => {
        setLikesCount(likes);
    }, [likes]);

    useEffect(() => {
        setIsActive(liked);
    }, [liked]);

    async function handleClick() {
        const call = await onClick();   // must return true/false

        if (!call) return; // لو حصل error

        setIsActive(prev => !prev);
        setLikesCount(prev => prev + (isActive ? -1 : +1));
    }

    return (
        <button onClick={handleClick} className="btns like-btn click-effect">
            {isActive ? <HeartFill size={20} /> : <Heart size={20} />} {likesCount} likes
        </button>
    );
}

export default Like;
