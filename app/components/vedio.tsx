import { X } from "lucide-react"
import { user_data_mangment } from "../api/server";

function Vedio({ url, title, setVedio }: { url: string, title: string, setVedio: (p: { call: boolean, title: string, url: string }) => void }) {
    var count = 0;
    const timer = setInterval(() => count += 1, 1000)

    async function handleClose() {

        if (!count) {
            setVedio({ call: false, title: "", url: "" })
            return
        };
        clearInterval(timer)
        await user_data_mangment("set-new-watch-score", { timer: count })
        setVedio({ call: false, title: "", url: "" })


    }

    return <div className="vedio-container">
        <div className="close-container">
            <button onClick={handleClose}>
                <X color="red" size={18} />
            </button>
        </div>
        <iframe width="0" height="0" src={url} title={title} frameBorder="0"
            allow=""
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
}

export default Vedio
