import * as RadixDialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import styled from "styled-components";
import { useAuth } from "../hook/AuthContext";
import { updateUser } from "../services/apiUsers";

// Styled components
const DialogOverlay = styled(RadixDialog.Overlay)`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
`;

const DialogContent = styled(RadixDialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40rem;
    max-width: 95vw;
    background-color: var(--color-grey-0);
    border-radius: var(--radius-md);
    padding: 3rem;
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    z-index: 1000;
    text-align: center;
`;

const PhotoWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const ProfileImage = styled.img`
    width: 16rem;
    height: 16rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--color-grey-200);
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;

    button {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.6rem 1rem;
        border-radius: var(--radius-md);
        font-size: var(--font-sm);
        font-weight: 500;
        cursor: pointer;
        border: none;
        transition: all 0.2s ease;

        &.delete {
            background-color: var(--color-error);
            color: #fff;
        }

        &.edit {
            background-color: var(--color-primary);
            color: #fff;
        }

        &.save {
            background-color: #ffd43b;
            color: var(--color-green-600);
        }

        &:hover {
            opacity: 0.85;
        }
    }
`;

export default function UpdateImagesDialog({ trigger, onPhotoUpdate }) {
    const { user, setUser } = useAuth();
    const [previewImage, setPreviewImage] = useState("/profile/default.jpg");
    const fileInputRef = useRef(null);

    // Load actual user photo
    useEffect(() => {
        if (user && user.profilePhoto) {
            setPreviewImage(user.profilePhoto);
        }
    }, [user]);

    const handleDelete = async () => {
        try {
            const updatedUser = await updateUser(user.id, { profilePhoto: "" });
            if (setUser) {
                setUser(updatedUser);
                localStorage.setItem("authUser", JSON.stringify(updatedUser));
            }
            setPreviewImage("/profile/default.jpg");
            if (onPhotoUpdate) onPhotoUpdate("/profile/default.jpg");
            toast.success("Profile photo deleted!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete profile photo.");
        }
    };

    const handleEditPhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setPreviewImage(event.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            const updatedUser = await updateUser(user.id, {
                profilePhoto: previewImage,
            });
            if (setUser) {
                setUser(updatedUser);
                localStorage.setItem("authUser", JSON.stringify(updatedUser));
            }
            if (onPhotoUpdate) onPhotoUpdate(previewImage);
            toast.success("Profile photo updated!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile photo.");
        }
    };

    return (
        <RadixDialog.Root>
            <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <h2>Update Your Profile Photo</h2>

                    <PhotoWrapper>
                        <ProfileImage src={previewImage} alt="Profile" />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </PhotoWrapper>

                    <ActionButtons>
                        <button className="delete" onClick={handleDelete}>
                            <MdDelete /> Delete
                        </button>
                        <button className="edit" onClick={handleEditPhoto}>
                            <MdEdit /> Choose
                        </button>
                        <button className="save" onClick={handleSave}>
                            <MdSave /> Save
                        </button>
                    </ActionButtons>
                </DialogContent>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
