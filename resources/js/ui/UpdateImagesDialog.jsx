import * as RadixDialog from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast"; // <-- import toast
import { MdDelete, MdEdit } from "react-icons/md";
import styled from "styled-components";
import { updateUser } from "../services/apiUsers"; // <-- your API function

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
    width: 32rem;
    max-width: 90vw;
    background-color: var(--color-grey-0);
    border-radius: var(--radius-md);
    padding: 2rem;
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    z-index: 1000;
`;

const PhotoWrapper = styled.div`
    position: relative;
    width: 100%;
    text-align: center;
`;

const ProfileImage = styled.img`
    width: 12rem;
    height: 12rem;
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
            background-color: var(--color-green-600, #16a34a);
            color: #fff;
        }

        &:hover {
            opacity: 0.85;
        }
    }
`;

export default function EditImagesDialog({ trigger, onPhotoUpdate }) {
    const authUser = JSON.parse(localStorage.getItem("authUser"));

    const [previewImage, setPreviewImage] = useState(
        authUser?.profilePhoto || "/profile/default.jpg"
    );
    const fileInputRef = useRef(null);

    const handleDelete = async () => {
        try {
            const updatedUser = await updateUser(authUser.id, {
                profilePhoto: "",
            });

            localStorage.setItem("authUser", JSON.stringify(updatedUser));
            setPreviewImage("/profile/default.jpg");
            if (onPhotoUpdate) onPhotoUpdate("/profile/default.jpg");

            toast.success("Profile photo deleted!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete profile photo.");
        }
    };

    const handleEdit = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            const updatedUser = await updateUser(authUser.id, {
                profilePhoto: previewImage,
            });

            localStorage.setItem("authUser", JSON.stringify(updatedUser));
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
                    <h2>Edit Photo</h2>
                    <PhotoWrapper>
                        <ProfileImage src={previewImage} alt="Profile" />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </PhotoWrapper>
                    <ActionButtons>
                        <button className="delete" onClick={handleDelete}>
                            <MdDelete /> Delete
                        </button>
                        <button className="edit" onClick={handleEdit}>
                            <MdEdit /> Edit
                        </button>
                        <button className="save" onClick={handleSave}>
                            Save
                        </button>
                    </ActionButtons>
                </DialogContent>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
