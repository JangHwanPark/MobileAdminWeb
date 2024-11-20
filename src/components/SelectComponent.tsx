import React from "react";

type selectComponentType = {
    name: string,
    id: string,
    array: Array<string | number>,
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    value: string | number
}

const SelectComponent: React.FC<selectComponentType> = (
    {className,
        name,
        id,
        array,
        onChange,
        value
}) => {
    return (
        <select
            className={className}
            name={name}
            id={id}
            onChange={onChange}
            value={value}
        >
            {array.map((item, i) => (
                <option key={i} value={item}>{item}</option>
            ))}
        </select>
    );
};

export default SelectComponent;