import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="w-2/12 p-10 border border-gray-200">
            <ul className="w-full flex flex-col gap-2">
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
        </nav>
    );
};

export default Navbar;