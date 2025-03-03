import React from "react";

interface FilterFormProps {
    filter: {
        keyword: string;
        id: string;
        phone: string;
        firstName: string;
        lastName: string;
        pinfl: string;
    };
    handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fetchTeachers: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ filter, handleFilterChange, fetchTeachers }) => {
    return (
        <div className="mb-3 row">
            <div className="col-md-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="ID"
                    name="id"
                    value={filter.id}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="col-md-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ism"
                    name="firstName"
                    value={filter.firstName}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="col-md-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Familiya"
                    name="lastName"
                    value={filter.lastName}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="col-md-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Telefon"
                    name="phone"
                    value={filter.phone}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="col-md-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="PINFL"
                    name="pinfl"
                    value={filter.pinfl}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="col-md-2">
                <button className="btn btn-primary w-100" onClick={fetchTeachers}>
                    🔍 Qidirish
                </button>
            </div>
        </div>
    );
};

export default FilterForm;