type selectComponentType = {
    name: string,
    id: string,
    array: Array<string | number>
}

const SelectComponent: React.FC<selectComponentType> = ({className, name, id, array}) => {
    return (
        <select className={className} name={name} id={id}>
            {array.map((item, i) => (
                <option key={i} value={item}>{item}</option>
            ))}
        </select>
    );
};

export default SelectComponent;