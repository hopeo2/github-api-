import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import Logout from "./Logout";
import { useAuthContext } from "../context/AuthContext";

const Sidebar = () => {

    return (
        <aside
            className="flex flex-col items-center min-w-12 sm:w-16 sticky top-0 left-0 h-screen py-8
      overflow-y-auto border-r bg-glass"
        >
            <nav className="h-full flex flex-col gap-3">
                <Link to="/" className="flex justify-center">
                    <img className="h-8" src="/github.svg" alt="Github Logo" />
                </Link>

                <Link
                    to="/"
                    className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800"
                >
                    <IoHomeSharp size={20} />
                </Link>
                

                
                    <Link
                        to="/explore"
                        className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800"
                    >
                        <MdOutlineExplore size={25} />
                    </Link>
              
                
            </nav>
        </aside>
    );
};

export default Sidebar;
