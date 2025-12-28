"use clinet"
import { useRef, useState, useEffect } from "react";
import styles from "./css/header.module.css"
import { useToast } from "@/app/providers/toastProvider";
import { UploadImg } from "@/app/api/server";
import { setImage } from "@/app/utils/cookieUtils"
interface Data {
  data: {
    email: string;
    name: string;
    image: string;
    date: string;
  }
}

export function Header({ data }: Data) {
  const [image, uploadImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(data.image);
  const inpRef = useRef(null) as any
const [saveBtn, setSaveBtn] = useState(data.image === preview)
useEffect(() => {
setSaveBtn(data.image === preview)
}, [preview])
  function handleImg(e: any) {
    let file = e.target.files?.[0];
    if (!file) return;
    uploadImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const { showToast } = useToast()

  async function handleSave() {
    if (!image) {
      showToast("photo is not selected", "info");
      return;
    }

    const formData = new FormData();
    formData.append("images", image);

    const res = await UploadImg(formData)

    if (!res.status) {
      showToast(res.message || "faild", "error");
      return;
    }

setSaveBtn(true)
setImage(res.photo)
  }


  return (
    <header className={styles.profileHeader}>
      <div className={styles.avatarSection}>
        <img src={preview} alt="" onClick={() => inpRef.current.click()} className={styles.avatar} />
        <input type="file" ref={inpRef} hidden name="upload-profile" id="upload-profile" onChange={handleImg} />
        <button className={styles.saveBtn} onClick={handleSave} hidden={saveBtn}>save</button>
      </div>

      <div className={styles.userInfo}>
        <h1 className={styles.userName}>{data.name}</h1>
        <p className={styles.userHandle}>{data.email}</p>
        <p className={styles.joinDate}>Member since {data.date}</p>
      </div>
    </header>
  )
}
