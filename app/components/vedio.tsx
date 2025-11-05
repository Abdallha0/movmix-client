import { X } from "lucide-react"

function Vedio({ url, title, setVedio }: { url: string, title: string, setVedio: (p: { call: boolean, title: string, url: string }) => void }) {
    return <div className="vedio-container">
        <div className="close-container">
            <button onClick={() => setVedio({ call: false, title: "", url: "" })}>
                <X color="red" size={18} />
            </button>
        </div>
        <iframe width="0" height="0" src={url} title={title} frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true}></iframe>
    </div>
}

export default Vedio