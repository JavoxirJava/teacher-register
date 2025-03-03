import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import styles from "./Auth.module.css";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
    const url = "http://217.114.4.62:30300/api/";
    const [form, setForm] = useState({});
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [teacherId, setTeacherId] = useState(null);
    const [image, setImage] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) setImage(imageSrc);
        }
    }, [webcamRef]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`${url}teachers/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form }),
        })
            .then(res => res.json())
            .then(teacher => {
                setTeacherId(teacher.id);
                toast.info("Malumotlar saqlandi endi rasmingizni yuboring!");
                setIsCameraOpen(true);
            })
            .catch(err => {
                console.log(err)
                toast.error("Malumot saqlanmadi Internetingizni tekshiring!")
            });
    };

    const sendDataToServer = async () => {
        if (!image) return;
        const response = await fetch(image!);
        const blob = await response.blob();
        const file = new File([blob], "teacher.jpg", { type: "image/jpeg" });

        const formData = new FormData();
        formData.append("file", file);
        await fetch(`${url}v1/teacher/face/register?teacherId=${teacherId}`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                    toast.success("Sizni yuzingizni tanib bulmadi!");
                    return;
                }
                toast.success("Siz muvaffaqiyatli ro'yxatdan o'tdingiz!");
                alert("sizning id raqamingiz: " + teacherId);// 249
                sessionStorage.setItem("teacherId", teacherId || "");
                navigate("/");
                setIsCameraOpen(false);
            })
            .catch(err => {
                console.log(err)
                toast.error("Xatolik yuz berdi")
            });
    };

    return (
        <div className={styles.container}>
            <h2>📝 Ro‘yxatdan o‘tish</h2>
            {!isCameraOpen ? (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="Ism" onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Familiya" onChange={handleChange} required />
                    <input type="text" name="phone" placeholder="Telefon" onChange={handleChange} required />
                    <input type="text" name="pinfl" placeholder="PINFL" onChange={handleChange} required />
                    <input type="text" name="degree" placeholder="Talim" onChange={handleChange} required />
                    <input type="text" name="position" placeholder="Vazifasi" onChange={handleChange} required />
                    <button type="submit">✅ Ro‘yxatdan o‘tish</button>
                </form>
            ) : (
                <div className={styles.cameraContainer}>
                    <h3>📷 Kameradan rasm oling</h3>
                    <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
                    <button onClick={capture}>📸 Rasm olish</button>

                    {image && (
                        <>
                            <h3>🖼 Olingan rasm:</h3>
                            <img src={image} alt="Captured" />
                            <button onClick={sendDataToServer}>📤 Serverga yuborish</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SignUp;
