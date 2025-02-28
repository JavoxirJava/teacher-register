import React, { useState } from "react";
import styles from "./Auth.module.css";

const SignIn: React.FC = () => {
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign In ma'lumotlari:", phone);
        // API ga yuborish logikasi yoziladi
    };

    return (
        <div className={styles.container}>
            <h2>🔑 Tizimga kirish</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Telefon" onChange={(e) => setPhone(e.target.value)} required />
                <button type="submit">🔓 Kirish</button>
            </form>
        </div>
    );
};

export default SignIn;
