import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="m-7">
            <ul className="flex flex-col">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/user">User</Link></li>
                <li><Link to="/company">Company</Link></li>
                <li><Link to="/question">Question</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;