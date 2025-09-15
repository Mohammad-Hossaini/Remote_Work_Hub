import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IoMdCamera } from "react-icons/io";
import { useAuth } from "../../hook/AuthContext";
import { getUserById, updateUser } from "../../services/apiUsers";
import EditImagesDialog from "../../ui/EditImagesDialog";
import UpdateImagesDialog from "../../ui/UpdateImagesDialog";
import "./BackGroundInfo.css";

function BackGroundInfo() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const {
        data: fullUser,
        isLoading,
        isError,
    } = useQuery(["user", user?.id], () => getUserById(user.id), {
        enabled: !!user?.id,
        staleTime: 0,
        refetchOnWindowFocus: true,
    });


    const mutation = useMutation(({ id, data }) => updateUser(id, data), {
        onSuccess: (updatedData) => {
            queryClient.setQueryData(["user", user.id], (oldData) => ({
                ...oldData,
                ...updatedData,
            }));
            queryClient.invalidateQueries(["user", user.id]);
        },
    });

    if (isLoading) return <p>Loading profile...</p>;
    if (isError) return <p>Failed to load user</p>;
    if (!fullUser) return <p>No user found</p>;

    const skills = Array.isArray(fullUser.skills) ? fullUser.skills : [];

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src={fullUser.bg_image || "/default_bg_image.jpeg"}
                    alt="Background"
                    className="bg-image"
                />

                <EditImagesDialog
                    trigger={
                        <button className="edit-btn edit-bg">
                            <IoMdCamera />
                        </button>
                    }
                    onBgUpdate={(newBg) =>
                        mutation.mutate({
                            id: user.id,
                            data: { bg_image: newBg },
                        })
                    }
                />

                <img
                    src={fullUser.profilePhoto || "/profile/default.jpg"}
                    alt="Profile"
                    className="profile-photo"
                />

                <UpdateImagesDialog
                    trigger={
                        <button className="edit-btn edit-photo">
                            <IoMdCamera />
                        </button>
                    }
                    onPhotoUpdate={(newPhoto) =>
                        mutation.mutate({
                            id: user.id,
                            data: { profilePhoto: newPhoto },
                        })
                    }
                />
            </div>

            <div className="profile-box">
                <div className="profile-left">
                    <div className="user-details">
                        <h2 className="user-name">
                            {fullUser.firstName || "User"}{" "}
                            {fullUser.lastName || "Name"}
                        </h2>
                        <p className="user-description">
                            {fullUser.description || "User Description"}
                        </p>
                        <div className="user-tags">
                            {skills.map((skill, index) => (
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
                        <strong>Email:</strong> {fullUser.email || "N/A"} <br />
                        <strong>Phone:</strong> {fullUser.phone || "N/A"} <br />
                        <strong>Role:</strong> {fullUser.role || "N/A"} <br />
                        <strong>Experience:</strong>{" "}
                        {fullUser.experience || "N/A"}
                    </p>
                </div>
            </div>

            <div className="profile-bottom">
                <div className="activity-box">
                    <h3>User Activity</h3>
                    <div className="activity-stats">
                        <div className="stat">
                            <h4>{fullUser.posts || 0}</h4>
                            <p>Posts</p>
                        </div>
                        <div className="stat">
                            <h4>{fullUser.comments || 0}</h4>
                            <p>Comments</p>
                        </div>
                        <div className="stat">
                            <h4>{fullUser.projects || 0}</h4>
                            <p>Projects</p>
                        </div>
                    </div>
                </div>

                <div className="community-box">
                    <h3>Community Contributions</h3>
                    <ul className="community-list">
                        {fullUser?.community?.length > 0 ? (
                            fullUser.community.map((item, idx) => (
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
