import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (
        <nav className="col-span-1 md:col-span-1 lg:col-span-2">
            <div className="bg-gray-800 overflow-y-auto h-screen">
                <div
                    className="flex lg:space-x-3 justify-center lg:justify-start lg:px-3 border-b border-gray-900 items-center"
                    style={{height: "72px;"}}
                >
                    <h2 className="text-white text-2xl font-semibold hidden lg:inline">
                        Admin
                    </h2>
                </div>
                <div className="px-2 mt-4">
                    <ul className="flex gap-3 flex-col">
                        <li className="hover:bg-gray-100 p-2 rounded">
                            <Link to="/">대시보드</Link>
                        </li>
                        <li className="hover:bg-gray-100 p-2 rounded">
                            <Link to="/user">사용자 통계</Link>
                        </li>
                        <li className="hover:bg-gray-100 p-2 rounded">
                            <Link to="/company">회사 통계</Link>
                        </li>
                        <li className="hover:bg-gray-100 p-2 rounded">
                            <Link to="/question">게시글 통계</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SideMenu;