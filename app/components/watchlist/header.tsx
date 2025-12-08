import { Search } from "lucide-react";

export function Header() {
    return (
        <header className="watchlist_header">
            <div className="header_content">
                <div className="search_container">
                    <Search className="search_icon" size={18} />
                    <input type="text" className="search_input" placeholder="Search your watchlist..." />
                </div>
            </div>
        </header>
    )
}