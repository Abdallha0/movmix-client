   export function formatTime(t: string) {
        let now = new Date().toISOString();
        let y = Math.abs(+now.split("T")[0].split("-")[0] - +t.split("T")[0].split("-")[0]);
        let m = Math.abs(+now.split("T")[0].split("-")[1] - +t.split("T")[0].split("-")[1]);
        let d = Math.abs(+now.split("T")[0].split("-")[2] - +t.split("T")[0].split("-")[2]);
        let h = Math.abs(+now.split("T")[1].split(":")[0] - +t.split("T")[1].split(":")[0]);
        let M = Math.abs(+now.split("T")[1].split(":")[1] - +t.split("T")[1].split(":")[1]);
        let s = Math.abs(+now.split("T")[1].split(":")[2].split(".")[0] - +t.split("T")[1].split(":")[2].split(".")[0]);

        if (y !== 0) {
            return `since ${y} years`
        } else if (m !== 0) {
            return `since ${m} month`
        } else if (d !== 0) {
            return `since ${d} days`
        } else if (h !== 0) {
            return `since ${h} hours`
        } else if (M !== 0) {
            return `since ${M} min`
        } else if (s !== 0) {
            return `since ${s} sec`
        }

    }