"use client"
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Search({ animation }: { animation?: string; }) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    async function handleSubmite(e: any) {
        e.preventDefault();
        if (!query) return;

        router.push(`/search?q=${query.split(" ").join("-")}`)
    }

    return (
        <form method='get' onSubmit={handleSubmite} data-aos={animation || ""} style={{ display: "flex" }} noValidate className="search-container">
            <button type='submit'><SearchIcon /></button>
            <input type="text" value={query} onChange={(e) => setQuery(e.currentTarget.value)} className="search-bar" placeholder="Search" />
        </form>
    )
}

export default Search
