function Vtabs({ items, active }: { items: Array<string>, active: string }) {
    return (
        <div className="category-tabs" style={{display: "flex", gap: "10px"}}>
            {
                items.map((item, i) => (
                    <button key={item || i} className={`tab ${active === item ? "active" : ""}`}>{item}</button>

                ))
            }
        </div >
    )
}

export default Vtabs;
