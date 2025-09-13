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
    width: 36rem;
    max-width: 90vw;
    background-color: var(--color-grey-0);
    border-radius: var(--radius-md);
    padding: 2rem;
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

const Input = styled.input`
    padding: 0.8rem 1rem;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--radius-sm);
    font-size: 1rem;
    outline: none;
    width: 100%;
`;

const Textarea = styled.textarea`
    padding: 0.8rem 1rem;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--radius-sm);
    font-size: 1rem;
    outline: none;
    width: 100%;
    min-height: 100px;
    resize: vertical;
`;

const Label = styled.label`
    font-weight: 500;
    margin-bottom: 0.3rem;
    display: block;
`;

const Row = styled.div`
    display: flex;
    gap: 1rem;
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: flex-end;
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

export default function UpdateImagesDialog({ trigger }) {
    const { user, login } = useAuth();
    const [previewImage, setPreviewImage] = useState("/profile/default.jpg");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [description, setDescription] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setPreviewImage(user.profilePhoto || "/profile/default.jpg");
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setDescription(user.description || "");
        }
    }, [user]);

    const handleDelete = async () => {
        try {
            const updatedUser = await updateUser(user.id, { profilePhoto: "" });
            login(updatedUser);
            setPreviewImage("/profile/default.jpg");
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
            reader.onload = (event) => {
                setPreviewImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            const updatedUser = await updateUser(user.id, {
                profilePhoto: previewImage,
                firstName,
                lastName,
                description,
            });
            login(updatedUser);
            toast.success("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile.");
        }
    };

    return (
        <RadixDialog.Root>
            <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <h2>Edit Profile</h2>

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

                    <Row>
                        <div style={{ flex: 1 }}>
                            <Label>First Name</Label>
                            <Input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </Row>

                    <div>
                        <Label>Description</Label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <ActionButtons>
                        <button className="delete" onClick={handleDelete}>
                            <MdDelete /> Delete Photo
                        </button>
                        <button className="edit" onClick={handleEditPhoto}>
                            <MdEdit /> Edit Photo
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
