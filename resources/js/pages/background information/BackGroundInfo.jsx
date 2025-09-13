// import { useEffect, useState } from "react";
// import { FaPen } from "react-icons/fa";
// import { useAuth } from "../../hook/AuthContext";
// import EditImagesDialog from "../../ui/EditImagesDialog";
// import UpdateImagesDialog from "../../ui/UpdateImagesDialog";
// import "./BackGroundInfo.css";

// function BackGroundInfo() {
//     const { user } = useAuth();
//     const [profilePhoto, setProfilePhoto] = useState("/profile/default.jpg");

//     useEffect(() => {
//         if (user?.profilePhoto) setProfilePhoto(user.profilePhoto);
//     }, [user]);

//     return (
//         <div className="profile-container">
//             <div className="profile-header">
//                 <img
//                     src="/bg-image2.jfif"
//                     alt="Background"
//                     className="bg-image"
//                 />

//                 <EditImagesDialog
//                     trigger={
//                         <button className="edit-btn edit-bg">
//                             <FaPen />
//                         </button>
//                     }
//                 />

//                 <img
//                     src={profilePhoto}
//                     alt="Profile"
//                     className="profile-photo"
//                 />

//                 <UpdateImagesDialog
//                     trigger={
//                         <button className="edit-btn edit-photo">
//                             <FaPen />
//                         </button>
//                     }
//                     onPhotoUpdate={(newPhoto) => setProfilePhoto(newPhoto)} // updates immediately
//                 />
//             </div>

//             <div className="profile-box">
//                 <div className="profile-left">
//                     <div className="user-details">
//                         <h2 className="user-name">
//                             {user?.firstName || "User"}{" "}
//                             {user?.lastName || "Name"}
//                         </h2>
//                         <p className="user-description">
//                             {user?.description || "User Description"}
//                         </p>
//                         <div className="user-tags">
//                             {user?.skills?.map((skill, index) => (
//                                 <span key={index} className="tag">
//                                     #{skill}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="profile-right">
//                     <h3>Additional Info</h3>
//                     <p>
//                         <strong>Email:</strong> {user?.gmail || "N/A"} <br />
//                         <strong>Phone:</strong> {user?.mobile || "N/A"} <br />
//                         <strong>Role:</strong> {user?.role || "N/A"} <br />
//                         <strong>Experience:</strong> {user?.experience || "N/A"}
//                     </p>
//                 </div>
//             </div>

//             <div className="profile-bottom">
//                 <div className="activity-box">
//                     <h3>User Activity</h3>
//                     <div className="activity-stats">
//                         <div className="stat">
//                             <h4>{user?.user_posts || 0}</h4>
//                             <p>Posts</p>
//                         </div>
//                         <div className="stat">
//                             <h4>{user?.comments || 0}</h4>
//                             <p>Comments</p>
//                         </div>
//                         <div className="stat">
//                             <h4>{user?.projects || 0}</h4>
//                             <p>Projects</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="community-box">
//                     <h3>Community Contributions</h3>
//                     <ul className="community-list">
//                         {user?.community?.length > 0 ? (
//                             user.community.map((item, idx) => (
//                                 <li key={idx}>{item}</li>
//                             ))
//                         ) : (
//                             <>
//                                 <li>React Developers Group</li>
//                                 <li>Open Source Contributors</li>
//                                 <li>Frontend Mentorship Program</li>
//                             </>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default BackGroundInfo;



import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { useAuth } from "../../hook/AuthContext";
import EditImagesDialog from "../../ui/EditImagesDialog";
import UpdateImagesDialog from "../../ui/UpdateImagesDialog";
import "./BackGroundInfo.css";

function BackGroundInfo() {
    const { user } = useAuth();
    const [profilePhoto, setProfilePhoto] = useState("/profile/default.jpg");
    const [bgPhoto, setBgPhoto] = useState("/bg-image2.jfif"); // default bg

    // Set initial profile photo
    useEffect(() => {
        if (user?.profilePhoto) setProfilePhoto(user.profilePhoto);
    }, [user]);

    // Set initial background photo
    useEffect(() => {
        if (user?.bg_image) setBgPhoto(user.bg_image);
        else setBgPhoto("/bg-image2.jfif"); // fallback default
    }, [user]);

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src={bgPhoto || "/bg-image2.jfif"}
                    alt="Background"
                    className="bg-image"
                />

                <EditImagesDialog
                    trigger={
                        <button className="edit-btn edit-bg">
                            <FaPen />
                        </button>
                    }
                    onBgUpdate={(newBg) => setBgPhoto(newBg)} // immediately update bg
                />

                <img
                    src={profilePhoto}
                    alt="Profile"
                    className="profile-photo"
                />

                <UpdateImagesDialog
                    trigger={
                        <button className="edit-btn edit-photo">
                            <FaPen />
                        </button>
                    }
                    onPhotoUpdate={(newPhoto) => setProfilePhoto(newPhoto)} // immediately update profile
                />
            </div>

            <div className="profile-box">
                <div className="profile-left">
                    <div className="user-details">
                        <h2 className="user-name">
                            {user?.firstName || "User"}{" "}
                            {user?.lastName || "Name"}
                        </h2>
                        <p className="user-description">
                            {user?.description || "User Description"}
                        </p>
                        <div className="user-tags">
                            {user?.skills?.map((skill, index) => (
                                <span key={index} className="tag">
                                    #{skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="profile-right">
                    <h3>Additional Info</h3>
                    <p>
                        <strong>Email:</strong> {user?.gmail || "N/A"} <br />
                        <strong>Phone:</strong> {user?.mobile || "N/A"} <br />
                        <strong>Role:</strong> {user?.role || "N/A"} <br />
                        <strong>Experience:</strong> {user?.experience || "N/A"}
                    </p>
                </div>
            </div>

            <div className="profile-bottom">
                <div className="activity-box">
                    <h3>User Activity</h3>
                    <div className="activity-stats">
                        <div className="stat">
                            <h4>{user?.user_posts || 0}</h4>
                            <p>Posts</p>
                        </div>
                        <div className="stat">
                            <h4>{user?.comments || 0}</h4>
                            <p>Comments</p>
                        </div>
                        <div className="stat">
                            <h4>{user?.projects || 0}</h4>
                            <p>Projects</p>
                        </div>
                    </div>
                </div>

                <div className="community-box">
                    <h3>Community Contributions</h3>
                    <ul className="community-list">
                        {user?.community?.length > 0 ? (
                            user.community.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))
                        ) : (
                            <>
                                <li>React Developers Group</li>
                                <li>Open Source Contributors</li>
                                <li>Frontend Mentorship Program</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BackGroundInfo;
