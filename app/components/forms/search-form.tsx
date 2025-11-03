"use client"
import { SearchIcon } from 'lucide-react';

function Search({animation}:{animation?: string;}) {

    return (
        <form method='get' data-aos={animation || ""} style={{display: "flex"}} noValidate className="search-container">
            <button><SearchIcon /></button>
            <input type="text" className="search-bar" placeholder="Search" />
        </form>
    )
}

export default Search
