import { MdTask, MdUpcoming } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";

import {
    HiOutlineBookmark,
    HiOutlineBriefcase,
    HiOutlineClipboardList,
    HiOutlineUserGroup,
} from "react-icons/hi";
import { useAuth } from "../../../hook/AuthContext";
import "./JobSeekerDashboard.css";

function JobSeekerDashboard() {
    const { user } = useAuth();
    console.log(user);
    return (
        <div className="dashboardContainer">
            {/* Welcome Section */}
            <div className="messageBox">
                <h1 className="welcomeMessage">
                    Welcome back,{" "}
                    {user?.data?.user?.profile?.first_name || user?.user?.name}{" "}
                    {user?.data?.user?.profile?.last_name}
                    👋
                </h1>
                <p>Today is July 23, 2025</p>
            </div>

            {/* Statistics Section */}
            <div className="statisticsBox">
                <div className="box projects">
                    <HiOutlineBriefcase className="icon" />
                    <div>
                        <p className="number">18</p>
                        <p className="name">Projects</p>
                    </div>
                </div>

                <div className="box jobSaved">
                    <HiOutlineBookmark className="icon" />
                    <div>
                        <p className="number">40</p>
                        <p className="name">Job Saved</p>
                    </div>
                </div>

                <div className="box totalJobs">
                    <HiOutlineClipboardList className="icon" />
                    <div>
                        <p className="number">39</p>
                        <p className="name">Total Jobs</p>
                    </div>
                </div>

                <div className="box recent">
                    <HiOutlineUserGroup className="icon" />
                    <div>
                        <p className="number">56</p>
                        <p className="name">Recent Tasks</p>
                    </div>
                </div>
            </div>

            {/* Active Section */}
            <div className="activeBox">
                {/* Left Side - Recent Projects */}
                <div className="recentProjects">
                    <h3>
                        <MdTask /> Recent Projects
                    </h3>
                    <ul>
                        <li>
                            <p>Job Board Redesign</p>
                            <span className="status in-progress">
                                In Progress
                            </span>
                        </li>
                        <li>
                            <p>Freelance Portal</p>
                            <span className="status completed">Completed</span>
                        </li>
                        <li>
                            <p>Company Careers Page</p>
                            <span className="status pending">Pending</span>
                        </li>
                    </ul>
                </div>

                {/* Right Side */}
                <div className="rightSide">
                    <div className="upcomingProjects">
                        <h3>
                            <MdUpcoming /> Upcoming Projects
                        </h3>
                        <ul>
                            <li>
                                <strong>UI Update</strong> – Aug 1
                            </li>
                            <li>
                                <strong>Dashboard Revamp</strong> – Aug 7
                            </li>
                            <li>
                                <strong>Mobile App Launch</strong> – Aug 15
                            </li>
                        </ul>
                    </div>

                    <div className="teamActivity">
                        <h3>
                            <PiUsersThreeFill /> Team Activity
                        </h3>
                        <ul>
                            <li>
                                <span className="avatar">M</span> You applied
                                for “Frontend Engineer”
                            </li>
                            <li>
                                <span className="avatar">S</span> Sara saved a
                                new job
                            </li>
                            <li>
                                <span className="avatar">A</span> Ahmad
                                completed project “Redesign”
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobSeekerDashboard;
