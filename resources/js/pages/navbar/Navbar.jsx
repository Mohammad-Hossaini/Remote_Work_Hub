import { FaCaretDown } from "react-icons/fa6";
import { IoIosMoon, IoMdNotifications } from "react-icons/io";
import { RxCaretRight } from "react-icons/rx";
import { Link } from "react-router-dom";
import ProfileDialog from "../../ui/ProfileDialog";

import "./Navbar.css";

function Navbar() {
    return (
        <div className="navbar-container">
            {/* Left links */}
            <div className="left">
                <Link to="/employerApp">
                    <div className="nav-link">
                        <p>EmpDashboard</p>
                        <RxCaretRight className="arrow-icon" />
                    </div>
                </Link>
            </div>

            <div className="center">
                <input
                    className="headerInput"
                    type="search"
                    placeholder="Search jobs, applicants..."
                />
            </div>
            <div className="right">
                <div className="icons">
                    <IoMdNotifications className="Icon" />
                    <IoIosMoon className="Icon" />
                </div>
                <ProfileDialog>
                    <div className="avatar-wrapper">
                        <img
                            src="/profile/profile-2.jpg"
                            alt="Profile"
                            className="avatar-img"
                        />
                        <span className="avatar-name">Mohammad</span>
                        <FaCaretDown className="avatar-caret" />
                    </div>
                </ProfileDialog>
            </div>
        </div>
    );
}

export default Navbar;
