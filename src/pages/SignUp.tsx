import React, { useState } from "react";

const SignUp: React.FC = () => {
    const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign Up ma'lumotlari:", form);
        // API ga yuborish logikasi yoziladi
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>📝 Ro‘yxatdan o‘tish</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="Ism" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Familiya" onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Telefon" onChange={handleChange} required />
                <button type="submit">✅ Ro‘yxatdan o‘tish</button>
            </form>
        </div>
    );
};

export default SignUp;
