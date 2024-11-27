import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (
        <nav className="col-span-1 md:col-span-1 lg:col-span-2">
            <div className="bg-gray-800 overflow-y-auto h-screen">
                <div className="h-[72px] flex lg:space-x-3 justify-center lg:justify-start lg:px-6 border-b border-gray-900 items-center">
                    <img src="/logo192.png" alt="" className="w-10 h-10 lg:w-8 lg:h-8"/>
                    <h2 className="text-white text-2xl font-semibold hidden lg:inline">
                        Admin
                    </h2>
                </div>
                <div className="px-2 mt-4">
                    <ul className="flex gap-3 flex-col">
                        <li className="lg:mx-2 py-4 lg:py-2 lg:px-3 flex justify-center lg:justify-start space-x-4 items-center truncate  lg:rounded-md text-white bg-gray-900">
                            <Link to="/">대시보드</Link>
                        </li>
                        <li className="lg:mx-2 py-4 lg:py-2 lg:px-3 flex justify-center lg:justify-start space-x-4 items-center truncate  text-gray-400 lg:rounded-md hover:text-white hover:bg-gray-700">
                            <Link to="/user">사용자 통계</Link>
                        </li>
                        <li className="lg:mx-2 py-4 lg:py-2 lg:px-3 flex justify-center lg:justify-start space-x-4 items-center truncate  text-gray-400 lg:rounded-md hover:text-white hover:bg-gray-700">
                            <Link to="/company">회사 통계</Link>
                        </li>
                        <li className="lg:mx-2 py-4 lg:py-2 lg:px-3 flex justify-center lg:justify-start space-x-4 items-center truncate  text-gray-400 lg:rounded-md hover:text-white hover:bg-gray-700">
                            <Link to="/question">게시글 통계</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SideMenu;