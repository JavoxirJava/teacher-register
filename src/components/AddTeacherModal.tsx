import React, { useState } from "react";

interface AddTeacherModalProps {
    onSave: (newTeacher: {firstName: string; lastName: string; phone: string; pinfl: string; degree: string; position: string}) => void;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({ onSave }) => {
    const [newTeacher, setNewTeacher] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        pinfl: "",
        degree: "",
        position: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(newTeacher);
        setNewTeacher({
            firstName: "",
            lastName: "",
            phone: "",
            pinfl: "",
            degree: "",
            position: "",
        });
    };

    return (
        <div className="modal fade" id="addTeacherModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between">
                        <h5 className="modal-title">➕ Yangi o‘qituvchi qo‘shish</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body d-flex flex-column justify-content-center px-4">
                        <input type="text" placeholder="Ism" className="form-control mb-3" value={newTeacher.firstName} onChange={handleChange} name="firstName" />
                        <input type="text" placeholder="Familiya" className="form-control mb-3" value={newTeacher.lastName} onChange={handleChange} name="lastName" />
                        <input type="text" placeholder="Telefon" className="form-control mb-3" value={newTeacher.phone} onChange={handleChange} name="phone" />
                        <input type="text" placeholder="Pinfl" className="form-control mb-3" value={newTeacher.pinfl} onChange={handleChange} name="pinfl" />
                        <input type="text" placeholder="Degre" className="form-control mb-3" value={newTeacher.degree} onChange={handleChange} name="degree" />
                        <input type="text" placeholder="Positsiya" className="form-control mb-3" value={newTeacher.position} onChange={handleChange} name="position" />
                        <button className="btn btn-success w-100 mb-2" onClick={handleSave} data-bs-dismiss="modal">
                            ✅ Qo‘shish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTeacherModal;