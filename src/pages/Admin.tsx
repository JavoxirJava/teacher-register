import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import WiewTeacherModal from "../components/WiewTeacherModal";
import EditTeacherModal from "../components/EditTeacherModal";
import AddTeacherModal from "../components/AddTeacherModal";
import Pagination from "../components/Pagination";
import FilterForm from "../components/FilterForm";

const Admin: React.FC = () => {
    const url = "http://217.114.4.62:30300/api/";
    const pageSize = 10;
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTeacher, setEditingTeacher] = useState<any | null>(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState({ 
        keyword: "",
        id: "",
        phone: "",
        firstName: "",
        lastName: "",
        pinfl: "",
    }); 
    const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);
    const [teacherImages, setTeacherImages] = useState<string[]>([]);

    useEffect(() => {
        fetchTeachers();
    }, [currentPage, filter]);

    // 🔄 O‘qituvchilar ro‘yxatini olish
    const fetchTeachers = async () => {
        try {
            const response = await fetch(`${url}teachers/filter`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    keyword: filter.keyword,
                    filter: {
                        id: filter.id ? Number(filter.id) : undefined,
                        phone: filter.phone || undefined,
                        firstName: filter.firstName || undefined,
                        lastName: filter.lastName || undefined,
                        pinfl: filter.pinfl || undefined,
                    },
                    paging: { page: currentPage, size: pageSize },
                }),
            });
            const data = await response.json();
            setTeachers(data.content);
            setTotalPages(data.paging.totalPages - 1);
            setLoading(false);
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    const fetchTeacherImages = async (id: number) => {
        try {
            const response = await fetch(`${url}v1/teacher/face/list/${id}`);
            const data = await response.json();
            const images = data.data.map((img: any) => `${url}v1/file/view/${img.imgId}`);
            setTeacherImages(images);
        } catch (error) {
            console.error("Rasm yuklashda xatolik:", error);
        }
    };

    const fetchTeacherDetails = async (id: number) => {
        try {
            const response = await fetch(`${url}teachers/one/${id}`);
            const data = await response.json();
            setSelectedTeacher(data);
            fetchTeacherImages(id);
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    const handleCreate = async (newTeacher: any) => {
        try {
            const response = await fetch(`${url}teachers/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTeacher),
            });

            if (response.ok) {
                toast.success("O‘qituvchi qo‘shildi!");
                fetchTeachers();
            } else toast.error("Xatolik yuz berdi.");
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${url}teachers/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingTeacher),
            });

            if (response.ok) {
                toast.success("O‘qituvchi yangilandi!");
                fetchTeachers();
                setEditingTeacher(null);
            } else toast.error("Xatolik yuz berdi.");
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("O‘qituvchini o‘chirishni tasdiqlaysizmi?")) return;
        try {
            const response = await fetch(`${url}teachers/delete/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("O‘qituvchi o‘chirildi!");
                fetchTeachers();
            } else toast.error("Xatolik yuz berdi.");
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            setLoading(true);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
        setCurrentPage(1);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 10; // Tugmalar soni

        if (totalPages <= maxPagesToShow) 
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        else {
            pages.push(1); // Boshlanishi
            if (currentPage > 3) pages.push("...");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages); // Oxirgi sahifa
        }

        return pages;
    };

    if (loading) return <p className="text-center">⏳ Yuklanmoqda...</p>;

    return (
        <div className="container mt-4">
            <h2 className="text-center">📋 Admin Panel</h2>

            <button className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addTeacherModal">
                ➕ Yangi o‘qituvchi qo‘shish
            </button>
            {/* 🔍 Filter form */}
            <FilterForm filter={filter} handleFilterChange={handleFilterChange} fetchTeachers={fetchTeachers} />

            <h2 className="text-center my-4">👨‍🏫 O‘qituvchilar</h2>

            <table className="table table-bordered">
                <thead className="table-primary">
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Ism</th>
                        <th>Familiya</th>
                        <th>Telefon</th>
                        <th>Pinfl</th>
                        <th>Degre</th>
                        <th>Positsiya</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher.id}>
                            <td>{teacher.id}</td>
                            <td>{teacher.firstName}</td>
                            <td>{teacher.lastName}</td>
                            <td>{teacher.phone}</td>
                            <td>{teacher.pinfl}</td>
                            <td>{teacher.degree}</td>
                            <td>{teacher.position}</td>
                            <td className="d-flex justify-content-center">
                                <button
                                    className="btn btn-info btn-sm mx-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#viewTeacherModal"
                                    onClick={() => fetchTeacherDetails(teacher.id)}
                                >
                                    👁 Ko‘rish
                                </button>
                                <button className="btn btn-warning btn-sm mx-3 w-50" data-bs-toggle="modal" data-bs-target="#editTeacherModal" onClick={() => setEditingTeacher(teacher)}>
                                    ✏️ Tahrirlash
                                </button>
                                <button className="btn btn-danger btn-sm mx-3 w-50" onClick={() => handleDelete(teacher.id)}>
                                    🗑️ O‘chirish
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                getPageNumbers={getPageNumbers}
                totalPages={totalPages}
            />

            {/* 🆕 Yangi o‘qituvchi qo‘shish MODAL */}
            <AddTeacherModal onSave={handleCreate} />

            {/* ✏️ O‘qituvchini tahrirlash MODAL */}
            <EditTeacherModal editingTeacher={editingTeacher} setEditingTeacher={setEditingTeacher} handleUpdate={handleUpdate} />

            {/* 👁 O‘qituvchi haqida MODAL */}
            <WiewTeacherModal selectedTeacher={selectedTeacher} teacherImages={teacherImages} />
        </div>
    );
};

export default Admin;
