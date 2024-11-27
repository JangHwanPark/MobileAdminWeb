import {Link} from "react-router-dom";

type Props = {
    title: string;
    data: number;
    icon?: JSX.Element;
}

const DataCard = ({title, data, icon}: Props) => {
    return (
        <div className="rounded-md shadow bg-white flex flex-col">
            <div className="flex space-x-4 items-center px-4 py-3">
                {icon}
                <div className="flex flex-col space-y-1">
                    <h3 className="font-lg text-gray-500">{title}</h3>
                    <span className="font-semibold text-2xl text-gray-600">{data}</span>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-b-md">
                <Link to="/" className="text-sm text-indigo-500 hover:text-indigo-700">View all</Link>
            </div>
        </div>
    );
};

export default DataCard;