import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="w-[17%] h-[100vh]">
            <div className="w-[17%] h-[100vh] fixed top-0 left-0 z-[100]">
                <div className="px-2 mt-4">
                    <ul className="flex gap-3 flex-col">
                        <li className="hover:bg-gray-100 p-2 rounded">
                            <Link to="/">대시보드</Link>
                        </li>
                        <li className="hover:bg-gray-100 p-2 rounded">
                            <Link to="/topic">주제별 활동</Link>
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

export default Navbar;