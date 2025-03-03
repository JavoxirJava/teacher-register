import React from "react";

interface PaginaionProps {
    currentPage: number;
    handlePageChange: (page: number) => void;
    getPageNumbers: () => (number | string)[];
    totalPages: number;
}

const Pagination = ({ currentPage, handlePageChange, getPageNumbers, totalPages }: PaginaionProps) => {
    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link w-auto" onClick={() => handlePageChange(currentPage - 1)}>⬅️</button>
                </li>
                {getPageNumbers().map((page, index) =>
                    typeof page === "number" ? (
                        <li key={index} className={`page-item ${currentPage === page ? "active" : ""}`}>
                            <button className="page-link w-auto" onClick={() => handlePageChange(page)}>{page}</button>
                        </li>
                    ) : (
                        <li key={index} className="page-item disabled">
                            <span className="page-link w-auto">...</span>
                        </li>
                    )
                )}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link w-auto" onClick={() => handlePageChange(currentPage + 1)}>➡️</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;