import React from "react";
import styles from "./Admin.module.css";

const Admin: React.FC = () => {
    return (
        <div className={styles.container}>
            <h2>🛠 Admin Panel</h2>
            <p>Bu yerda admin funksiyalari bo‘ladi.</p>
        </div>
    );
};

export default Admin;
