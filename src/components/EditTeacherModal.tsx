import React from "react";

interface WiewTeacherModalProps {
    editingTeacher: {
        id: number;
        firstName: string;
        lastName: string;
        phone: string;
        pinfl: string;
        degree: string;
        position: string;
    }
    setEditingTeacher: React.Dispatch<React.SetStateAction<{
        id: number;
        firstName: string;
        lastName: string;
        phone: string;
        pinfl: string;
        degree: string;
        position: string;
    }>>;
    handleUpdate: () => void;
}

const EditTeacherModal: React.FC<WiewTeacherModalProps> = ({ editingTeacher, setEditingTeacher, handleUpdate }) => {
    return (
        editingTeacher && (
            <div className="modal fade" id="editTeacherModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">✏️ O‘qituvchini tahrirlash</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" placeholder="Ism" className="form-control mb-3" value={editingTeacher.firstName} onChange={(e) => setEditingTeacher({ ...editingTeacher, firstName: e.target.value })} />
                            <input type="text" placeholder="Familiya" className="form-control mb-3" value={editingTeacher.lastName} onChange={(e) => setEditingTeacher({ ...editingTeacher, lastName: e.target.value })} />
                            <input type="text" placeholder="Telefon" className="form-control mb-3" value={editingTeacher.phone} onChange={(e) => setEditingTeacher({ ...editingTeacher, phone: e.target.value })} />
                            <input type="text" placeholder="Pinfl" className="form-control mb-3" value={editingTeacher.pinfl} onChange={(e) => setEditingTeacher({ ...editingTeacher, pinfl: e.target.value })} />
                            <input type="text" placeholder="Degre" className="form-control mb-3" value={editingTeacher.degree} onChange={(e) => setEditingTeacher({ ...editingTeacher, degree: e.target.value })} />
                            <input type="text" placeholder="Positsiya" className="form-control mb-3" value={editingTeacher.position} onChange={(e) => setEditingTeacher({ ...editingTeacher, position: e.target.value })} />
                            <button className="btn btn-warning w-100 mb-2" onClick={handleUpdate} data-bs-dismiss="modal">
                                💾 Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default EditTeacherModal