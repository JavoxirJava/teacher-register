import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>👋 Xush kelibsiz!</h2>
            <p>Iltimos, ro‘yxatdan o‘ting yoki tizimga kiring:</p>
            <button onClick={() => navigate("/signup")}>📝 Ro‘yxatdan o‘tish</button>
            <button onClick={() => navigate("/signin")}>🔑 Tizimga kirish</button>
        </div>
    );
};

export default Home;
