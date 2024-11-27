import './index.css';
import SideMenu from "./components/SideMenu.tsx";
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer.tsx";
import {MouseEventHandler, useRef} from "react";

function App() {
    const contentRef = useRef<HTMLDivElement | null>(null);

    const scrollToTop: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    };

    return (
        <div className="grid grid-cols-6 md:grid-cols-10 gap-0 h-full">
            {/* 사이드바 */}
            <SideMenu/>
            {/* 콘텐츠 영역 */}
            <main ref={contentRef} className="col-span-5 md:col-span-9 lg:col-span-8 h-full">
                <div className="overflow-y-auto h-screen flex flex-col">
                    <div className="flex-shrink-0 p-5" style={{ marginTop: "72px" }}>
                        <Outlet/>
                    </div>
                    {/* Footer */}
                    <Footer onScrollTop={scrollToTop}/>
                </div>
            </main>


        </div>
    );
}

export default App;
