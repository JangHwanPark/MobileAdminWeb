type selectComponentType = {
    name: string,
    id: string,
    array: Array<string | number>
}

const SelectComponent: React.FC<selectComponentType> = ({name, id, array}) => {
    return (
        <select name={name} id={id}>
            {array.map((item, i) => (
                <option key={i} value={item}>{item}</option>
            ))}
        </select>
    );
};

export default SelectComponent;