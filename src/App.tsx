import './index.css'
import Navbar from "./components/Navbar.tsx";
import {Outlet} from "react-router-dom";

function App() {

    return (
        <div className="h-screen flex">
            <Navbar/>
            <div className="mx-10 my-20 w-full">
                <Outlet/>
            </div>
        </div>
    )
}

export default App
