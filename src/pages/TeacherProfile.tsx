import React, { useEffect, useState } from "react";
import styles from "./TeacherProfile.module.css";
import { toast } from "react-toastify";

const TeacherProfile: React.FC = () => {
    const url = "http://217.114.4.62:30300/api/";

    const [teacher, setTeacher] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        phone: "",
        pinfl: "",
        degree: "",
        position: "",
        imgId: 0,
    });
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [updatedTeacher, setUpdatedTeacher] = useState({ ...teacher });

    useEffect(() => {
        const teacherId = sessionStorage.getItem("teacherId");
        if (teacherId) setTeacher(prev => ({ ...prev, id: Number(teacherId) }));
    }, []);

    useEffect(() => {
        if (teacher.id !== 0) fetchTeacherInfo();
    }, [teacher.id]);

    const fetchTeacherInfo = async () => {
        try {
            const response = await fetch(`${url}teachers/one/${teacher.id}`);
            const data = await response.json();
            await fetchTeacherImageId();
            setTeacher(prev => ({ ...prev, ...data }));
            setUpdatedTeacher(data);
            setLoading(false);
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    const fetchTeacherImageId = async () => {
        try {
            const response = await fetch(`${url}v1/teacher/face/list/${teacher.id}`);
            const data = await response.json();

            if (data.data.length > 0)
                setTeacher(prev => ({ ...prev, imgId: data.data[0].imgId }));
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedTeacher({ ...updatedTeacher, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${url}teachers/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTeacher),
            });

            if (response.ok) {
                toast.success("Ma’lumotlar yangilandi!");
                setTeacher(updatedTeacher);
                setEditing(false);
            } else {
                toast.error("Xatolik yuz berdi.");
                alert("Xatolik yuz berdi.");
            }
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    if (loading) return <p className={styles.loading}>⏳ Yuklanmoqda...</p>;
    return (
        <div className={styles.container}>
            <h2>👨‍🏫 Teacher Profile</h2>
            <div className={styles.profileCard}>
                <div className={styles.profileImage}>
                    {teacher.imgId ? (
                        <img src={`${url}v1/file/view/${teacher.imgId}`} alt="Profile" />
                    ) : (
                        <p>Rasm mavjud emas</p>
                    )}
                </div>

                <div className={styles.profileDetails}>
                    {editing ? (
                        <>
                            <input type="text" name="firstName" placeholder="Ism" value={updatedTeacher.firstName} onChange={handleChange} />
                            <input type="text" name="lastName" placeholder="Familiya" value={updatedTeacher.lastName} onChange={handleChange} />
                            <input type="text" name="phone" placeholder="Telefon" value={updatedTeacher.phone} onChange={handleChange} />
                            <input type="text" name="pinfl" placeholder="Pinfl" value={updatedTeacher.pinfl} onChange={handleChange} />
                            <input type="text" name="degree" placeholder="Daraja" value={updatedTeacher.degree} onChange={handleChange} />
                            <input type="text" name="position" placeholder="Pozitsiya" value={updatedTeacher.position} onChange={handleChange} />
                            <button onClick={handleUpdate}>💾 Saqlash</button>
                            <button onClick={() => setEditing(false)}>❌ Bekor qilish</button>
                        </>
                    ) : (
                        <>
                            <p><strong>Ism:</strong> {teacher.firstName}</p>
                            <p><strong>Familiya:</strong> {teacher.lastName}</p>
                            <p><strong>Telefon:</strong> {teacher.phone}</p>
                            <p><strong>Pinfl:</strong> {teacher.pinfl}</p>
                            <p><strong>Daraja:</strong> {teacher.degree}</p>
                            <p><strong>Pozitsiya:</strong> {teacher.position}</p>
                            <button onClick={() => setEditing(true)}>✏️ Tahrirlash</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
