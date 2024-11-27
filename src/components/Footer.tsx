import {Link} from "react-router-dom";
import {FC, MouseEventHandler} from "react";

type FooterProps = {
    onScrollTop: MouseEventHandler<HTMLAnchorElement>;
};

const Footer: FC<FooterProps> = (props) => {
    return (
        <footer className="flex items-center justify-between px-5 h-20 bg-white flex-shrink-0 mt-auto">
            <span className="text-gray-700 text-opacity-50">Copyright © Website {new Date().getFullYear()}</span>
            <Link to="/#" onClick={props.onScrollTop} className="text-indigo-500 hover:text-indigo-700">
                Back to top
            </Link>
        </footer>
    );
}

export default Footer;
