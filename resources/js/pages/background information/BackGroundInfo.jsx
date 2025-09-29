import { FiEdit } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useAuth } from "../../hook/AuthContext";
import "./BackGroundInfo.css";
function BackGroundInfo() {
    const { user } = useAuth();

    if (!user || !user.data?.user) return <p>No user found</p>;

    const fullUser = user.data.user;
    const profile = fullUser.profile || {};

    const skills = profile.skills
        ? profile.skills.split(",").map((s) => s.trim())
        : [];

    return (
        <div className="profile-container">
            {/* HEADER */}
            <div className="profile-header">
                <img
                    src={"/default_bg_image.jpeg"}
                    alt="Background"
                    className="bg-image"
                />

                {/* Edit button for background */}
                <button className="edit-btn edit-bg-bottom">
                    <MdOutlineCameraAlt />
                </button>

                <img
                    src={"/profile/default.jpg"}
                    alt="Profile"
                    className="profile-photo"
                />

                {/* Edit button for profile photo */}
                <button className="edit-btn edit-profile">
                    <MdOutlineCameraAlt />
                </button>

                {/* ✅ Edit button for profile info (name, desc, skills …) */}
                <button className="edit-btn edit-info">
                    <FiEdit />
                </button>
            </div>

            {/* BASIC INFO */}
            <div className="profile-box">
                {/* LEFT SIDE */}
                <div className="profile-left">
                    <div className="user-details">
                        <h2 className="user-name">
                            {profile.first_name || ""} {profile.last_name || ""}
                        </h2>

                        <p className="user-description">
                            {profile.description || "User Description"}
                        </p>

                        {/* ✅ Skills on left side */}
                        <div className="user-tags">
                            {skills.map((skill, index) => (
                                <span key={index} className="tag">
                                    #{skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="profile-right">
                    <h3>Additional Info</h3>
                    <p>
                        <strong>Email:</strong> {fullUser.email || "N/A"} <br />
                        <strong>Phone:</strong> {profile.phone || "N/A"} <br />
                        <strong>Role:</strong> {fullUser.role || "N/A"} <br />
                        <strong>Resume:</strong>{" "}
                        {profile.resume ? (
                            <a
                                href={`/${profile.resume}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Resume
                            </a>
                        ) : (
                            "N/A"
                        )}
                        <br />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BackGroundInfo;
