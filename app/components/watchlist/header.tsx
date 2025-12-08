import { Search } from "lucide-react";

export function Header() {
    return (
        <header className="watchlist-header">
            <div className="header-content">
                <div className="search-container">
                    <Search className="search-icon" size={18} />
                    <input type="text" className="search-input" placeholder="Search your watchlist..." />
                </div>
            </div>
        </header>
    )
}