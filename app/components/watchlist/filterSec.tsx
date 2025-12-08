import { Grid3X3, List } from "lucide-react";

export function FilterSec() {
    return (
        <div className="filters-section">
            <div className="filter-tabs">
                <button className="filter-tab active">All</button>
                <button className="filter-tab">Watching</button>
                <button className="filter-tab">Completed</button>
                <button className="filter-tab">Plan to Watch</button>
            </div>
            <div className="filter-controls">
                <select className="dropdown-select">
                    <option>Sort by: Recently Added</option>
                    <option>Sort by: Rating</option>
                    <option>Sort by: Year</option>
                    <option>Sort by: Title</option>
                </select>
                <div className="view-toggle">
                    <button className="view-btn active">
                        <Grid3X3 size={18} />
                    </button>
                    <button className="view-btn">
                        <List size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}