import './index.css';
import Navbar from "./components/Navbar.tsx";
import { Outlet } from "react-router-dom";
import {CiSearch} from "react-icons/ci";

function App() {
    return (
        <section className="flex">
            {/* 사이드바 */}
            <Navbar />
            {/* 콘텐츠 영역 */}
            <div className="w-[83%] px-[25px]">
                <header className="w-[83%] fixed top-0 right-0 bg-white py-3 z-[100] flex items-center justify-between px-4">
                    <div className="w-full h-[40px] relative">
                        <CiSearch />
                        <input type="text"/>
                    </div>
                </header>
                <div className="mt-[100px]"></div>
                <Outlet />
            </div>
        </section>
    );
}

export default App;
