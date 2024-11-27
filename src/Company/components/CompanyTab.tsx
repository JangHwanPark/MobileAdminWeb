import React from 'react';

const CompanyTab = ({ title, active, onClick }) => {
    let itemClass = " text-gray-500";

    if (active) {
        itemClass = " bg-indigo-100 text-indigo-700";
    }

    return (
        <li className={"px-4 py-2 rounded-md truncate" + itemClass}>
            <button onClick={onClick} className="focus:outline-none">
                {title}
            </button>
        </li>
    );
};

export default CompanyTab;