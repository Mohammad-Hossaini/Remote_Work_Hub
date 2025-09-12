import { FaPen } from "react-icons/fa";
import EditImagesDialog from "../../ui/EditImagesDialog";
import UpdateImagesDialog from "../../ui/UpdateImagesDialog";
import "./Profile.css";

function Profile() {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src="/bg-image2.jfif"
                    alt="Background"
                    className="bg-image"
                />
                <EditImagesDialog
                    trigger={
                        <button className="edit-btn edit-bg">
                            <FaPen />
                        </button>
                    }
                />

                <img
                    src="/profile/default.jpg"
                    alt="Profile"
                    className="profile-photo"
                />
                <UpdateImagesDialog
                    trigger={
                        <button className="edit-btn edit-photo">
                            <FaPen />
                        </button>
                    }
                />
            </div>

            <div className="profile-box">
                <div className="profile-left">
                    <div className="user-details">
                        <h2 className="user-name">Mohammad Sirath</h2>
                        <p className="user-description">
                            Front-End Developer | HTML, CSS, JavaScript, React,
                            SQL | Building Responsive & Interactive Web
                            Experiences | Passionate About User-Centric Design &
                            Database Management
                        </p>

                        <div className="user-tags">
                            <span className="tag">#Frontend</span>
                            <span className="tag">#React</span>
                            <span className="tag">#SQL</span>
                            <span className="tag">#UI/UX</span>
                        </div>
                    </div>
                </div>

                <div className="profile-right">
                    <h3>Additional Info</h3>
                    <p>Here you can place stats, connections, or activity.</p>
                </div>
            </div>

            {/* Bottom boxes */}
            <div className="profile-bottom">
                <div className="activity-box">
                    <h3>User Activity</h3>
                    <div className="activity-stats">
                        <div className="stat">
                            <h4>120</h4>
                            <p>Posts</p>
                        </div>
                        <div className="stat">
                            <h4>45</h4>
                            <p>Comments</p>
                        </div>
                        <div className="stat">
                            <h4>32</h4>
                            <p>Projects</p>
                        </div>
                    </div>
                </div>

                <div className="community-box">
                    <h3>Community Contributions</h3>
                    <ul className="community-list">
                        <li>React Developers Group</li>
                        <li>Open Source Contributors</li>
                        <li>Frontend Mentorship Program</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;
