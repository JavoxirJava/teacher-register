import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Auth.module.css";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
    const [teacherId, setTeacherId] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedTeacherId = sessionStorage.getItem("teacherId");
        if (storedTeacherId) setTeacherId(storedTeacherId);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        if (!image) return;
        const url = "http://217.114.4.62:30300/api/";

        const response = await fetch(image!);
        const blob = await response.blob();
        const file = new File([blob], "teacher.jpg", { type: "image/jpeg" });

        const formData = new FormData();
        formData.append("file", file);
        e.preventDefault();

        await fetch(`${url}v1/teacher/face/recognize/by/id?teacherId=${teacherId}`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    toast.success("Siz muaffaqiyatli Login qildingiz!");
                    navigate("/profile");
                } else toast.warning("Sizni yuzingizni tanib bulmadi!");
            })
            .catch(err => {
                console.log(err)
                toast.error("Xatolik yuz berdi")
            });
    };

    // 📸 Rasm olish funksiyasi
    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) setImage(imageSrc);
        }
    }, [webcamRef]);

    return (
        <div className={styles.container}>
            <h2>🔑 Tizimga kirish</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" defaultValue={teacherId || ""} placeholder="id ngizni kiriting" onChange={(e) => setTeacherId(e.target.value)} required />
            </form>
            <div className={styles.cameraContainer}>
                <h3>📷 Kameradan rasm oling</h3>
                <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
                <button onClick={capture}>📸 Rasm olish</button>

                {image && (
                    <>
                        <h3>🖼 Olingan rasm:</h3>
                        <img src={image} alt="Captured" />
                        <button onClick={handleSubmit}>📤 Serverga yuborish</button>
                    </>
                )}
            </div>
        </div>

    );
};

export default SignIn;
