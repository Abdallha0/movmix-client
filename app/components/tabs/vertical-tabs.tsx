
function Vtabs({ items, active, setActiveItem, setActiveGenre }: { items: Array<string>, active: string, setActiveItem?: (i: "Trending" | "Popular" | "Recently added" | "Top Movies") => void, setActiveGenre?: (i: "Action" | "Abenteuer" | "Animation" | "Romance" | "Horror" | "Comedy") => void }) {

    function handleClick(item: any) {
        if (setActiveItem) {
            setActiveItem(item)
            return;
        };

        if (setActiveGenre) {
            setActiveGenre(item)
            return;
        };

        return;
    }

    return (
        <div className="category-tabs" style={{ display: "flex", gap: "10px" }}>
            {
                items.map((item, i) => (
                    <button key={item || i} onClick={() => handleClick(item)} className={`tab ${active === item ? "active" : ""}`}>{item}</button>

                ))
            }
        </div>
    )
}

export default Vtabs;
