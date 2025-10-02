import * as RadixDialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
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
    transform: translate(-50%, -120%);
    width: 80rem;
    height: 70vh;
    background-color: var(--color-grey-900);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Title = styled.h2`
    position: absolute;
    top: 2rem;
    left: 3rem;
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-grey-0);
`;

const CloseIcon = styled(RxCross1)`
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-size: 2rem;
    color: var(--color-grey-0);
    cursor: pointer;
`;

const PhotoWrapper = styled.div`
    position: relative;
`;

const ProfileImage = styled.img`
    width: 25rem;
    height: 25rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--color-grey-200);
`;

const BottomActions = styled.div`
    position: absolute;
    bottom: 2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8rem;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        width: 100%;
        height: 1px;
        background-color: var(--color-grey-0);
    }
`;

const ActionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.2rem 2.4rem;
    color: var(--color-grey-0);

    svg {
        font-size: 2.5rem;
    }

    span {
        margin-top: 0.4rem;
        font-size: 1.4rem;
        font-weight: 500;
    }
`;

export default function UpdateImagesDialog({ trigger, onPhotoUpdate }) {
    const { user, setUser } = useAuth();
    const [previewImage, setPreviewImage] = useState("/profile/profile-6.jpg");
    const fileInputRef = useRef(null);

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

    return (
        <RadixDialog.Root>
            <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <Title>Profile Photo</Title>
                    <RadixDialog.Close asChild>
                        <CloseIcon />
                    </RadixDialog.Close>

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

                    <BottomActions>
                        <ActionWrapper onClick={handleEditPhoto}>
                            <MdEdit />
                            <span>Edit</span>
                        </ActionWrapper>

                        <ActionWrapper onClick={handleDelete}>
                            <RiDeleteBin6Line />
                            <span>Delete</span>
                        </ActionWrapper>
                    </BottomActions>
                </DialogContent>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
