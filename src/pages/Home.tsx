import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h2>👋 Xush kelibsiz!</h2>
            <p>Iltimos, ro‘yxatdan o‘ting yoki tizimga kiring:</p>
            <div className={styles.buttons}>
                <button onClick={() => navigate("/signup")}>📝 Ro‘yxatdan o‘tish</button>
                <button onClick={() => navigate("/signin")}>🔑 Tizimga kirish</button>
            </div>
        </div>
    );
};

export default Home;
