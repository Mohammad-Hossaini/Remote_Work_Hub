import { IoIosMoon, IoMdNotifications } from "react-icons/io";
import { RxCaretRight } from "react-icons/rx";
import { Link } from "react-router-dom";
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
        <div className="nav-link">
          <p>Jobs</p>
          <RxCaretRight className="arrow-icon" />{" "}
        </div>
        <div className="nav-link">
          <p>Applicants</p>
          <RxCaretRight className="arrow-icon" />{" "}
        </div>
      </div>

      {/* Center search bar */}
      <div className="center">
        <input
          className="headerInput"
          type="search"
          placeholder="Search jobs, applicants..."
        />
      </div>

      {/* Right side icons & avatar */}
      <div className="right">
        <div className="icons">
          <IoMdNotifications className="Icon" />
          <IoIosMoon className="Icon" />
        </div>
        <div className="Avatar">
          <img src="/profile/profile-3.jpg" alt="Profile" />
          <p>Alexandra</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
