import React from "react";

interface WiewTeacherModalProps {
    selectedTeacher: {
        id: number;
        firstName: string;
        lastName: string;
        phone: string;
        degree: string;
        position: string;
    };
    teacherImages: string[];
}

const WiewTeacherModal: React.FC<WiewTeacherModalProps> = ({ selectedTeacher, teacherImages }) => {
    return (
        <div className="modal fade" id="viewTeacherModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">👨‍🏫 O‘qituvchi haqida</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        {selectedTeacher ? (
                            <div>
                                <p><strong>📌 ID:</strong> {selectedTeacher.id}</p>
                                <p><strong>👤 Ism:</strong> {selectedTeacher.firstName} {selectedTeacher.lastName}</p>
                                <p><strong>📞 Telefon:</strong> {selectedTeacher.phone}</p>
                                <p><strong>🎓 Daraja:</strong> {selectedTeacher.degree}</p>
                                <p><strong>🏢 Pozitsiya:</strong> {selectedTeacher.position}</p>

                                {/* 🖼 O‘qituvchi rasmlari */}
                                <h5>📷 Rasmlar</h5>
                                <div className="d-flex flex-wrap">
                                    {teacherImages.length > 0 ? (
                                        teacherImages.map((imgSrc, index) => (
                                            <img key={index} src={imgSrc} alt="Teacher" className="img-thumbnail me-2 object-fit-contain" style={{ width: "220px", height: "220px" }} />
                                        ))
                                    ) : (
                                        <p>📌 Rasm mavjud emas</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p>⏳ Ma’lumotlar yuklanmoqda...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WiewTeacherModal;