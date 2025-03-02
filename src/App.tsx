import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import TeacherProfile from "./pages/TeacherProfile";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />        {/* 🏠 Sign Up yoki Sign In tanlash */}
          <Route path="/signup" element={<SignUp />} />  {/* 📝 Ro‘yxatdan o‘tish */}
          <Route path="/signin" element={<SignIn />} />  {/* 🔑 Tizimga kirish */}
          <Route path="/admin" element={<Admin />} />    {/* 🛠 Admin sahifasi */}
          <Route path="/profile" element={<TeacherProfile />} /> {/* 👨‍🏫 Teacher profili qo‘shildi */}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
