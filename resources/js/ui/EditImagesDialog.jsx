import * as RadixDialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { useAuth } from "../hook/AuthContext";
import { updateUser } from "../services/apiUsers";

// Styled components
const Overlay = styled(RadixDialog.Overlay)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
`;

const Content = styled(RadixDialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48rem;
    background: var(--color-grey-0);
    padding: 2rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
`;

const TitleLine = styled.div`
    border-bottom: 1px solid var(--color-grey-200);
    margin-bottom: 1rem;
`;

const CloseButton = styled(RadixDialog.Close)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--color-grey-100);
    border-radius: 50%;
    border: none;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    color: var(--color-grey-700);
    transition: all 0.2s ease;

    &:hover {
        background: var(--color-grey-200);
    }
`;

const ImagePreview = styled.img`
    width: 100%;
    max-height: 12rem;
    object-fit: cover;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-grey-200);
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 1rem;
`;

const ChooseButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    background-color: var(--color-primary);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-xxl);
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: 0.2s ease;

    &:hover {
        background-color: var(--color-primary-dark);
    }
`;

const SaveButton = styled.button`
    background-color: #ffd43b;
    color: var(--color-green-600);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-xxl);
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
        opacity: 0.85;
    }
`;

const DeleteButton = styled.button`
    background-color: var(--color-error);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-xxl);
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: 0.2s ease;

    &:hover {
        opacity: 0.85;
    }
`;

export default function EditImagesDialog({ trigger, onBgUpdate }) {
    const { user, setUser } = useAuth();
    const [preview, setPreview] = useState("/default_bg_image.jpeg");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setPreview(user.bg_image || "/default_bg_image.jpeg");
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setPreview(event.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleChooseClick = () => {
        fileInputRef.current.click();
    };

    const handleSave = async () => {
        try {
            const updatedUser = await updateUser(user.id, {
                bg_image: preview,
            });
            if (setUser) {
                setUser(updatedUser);
                localStorage.setItem("authUser", JSON.stringify(updatedUser));
            }

            toast.success("Background image updated!");
            if (onBgUpdate) onBgUpdate(preview);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update background image.");
        }
    };

    const handleDelete = async () => {
        try {
            const updatedUser = await updateUser(user.id, { bg_image: "" });
            if (setUser) {
                setUser(updatedUser);
                localStorage.setItem("authUser", JSON.stringify(updatedUser));
            }

            setPreview("/default_bg_image.jpeg");
            toast.success("Background image deleted!");
            if (onBgUpdate) onBgUpdate("/default_bg_image.jpeg");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete background image.");
        }
    };

    return (
        <RadixDialog.Root>
            <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <Overlay />
                <Content>
                    <h2>Edit Your Background Image</h2>
                    <TitleLine />
                    <CloseButton asChild>
                        <FaTimes />
                    </CloseButton>

                    <ImagePreview src={preview} alt="Background Preview" />

                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />

                    <ButtonContainer>
                        <ChooseButton onClick={handleChooseClick}>
                            <FaEdit /> Choose
                        </ChooseButton>
                        <DeleteButton onClick={handleDelete}>
                            Delete
                        </DeleteButton>
                        <SaveButton onClick={handleSave}>Save</SaveButton>
                    </ButtonContainer>
                </Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
