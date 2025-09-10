import * as RadixDialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Overlay = styled(RadixDialog.Overlay)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
`;

const Content = styled(RadixDialog.Content)`
    position: fixed;
    top: 50%;
    left: 80%;
    transform: translate(-50%, -310%);
    width: 48rem;
    background: var(--color-grey-0);
    padding: 1.5rem 2rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
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

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;

const Label = styled.label`
    font-weight: 600;
    font-size: var(--font-sm);
    color: var(--color-grey-900);
`;

const FileInput = styled.input`
    padding: 0.4rem 0.6rem;
    font-size: var(--font-sm);
    border: 1px solid var(--color-grey-300);
    border-radius: var(--radius-sm);
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
`;

const SaveButton = styled.button`
    background-color: var(--color-primary);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-xxl);
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
        background-color: var(--color-primary-dark);
    }
`;

export default function EditImagesDialog({ trigger }) {
    const [profileImage, setProfileImage] = useState(null);
    const [bgImage, setBgImage] = useState(null);

    const handleSave = () => {
        console.log({ profileImage, bgImage });
        // TODO: call API to save images
    };

    return (
        <RadixDialog.Root>
            <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <Overlay />
                <Content>
                    <h2>Edit Images</h2>
                    <TitleLine />

                    <CloseButton asChild>
                        <FaTimes />
                    </CloseButton>
                    <InputGroup>
                        <Label>Background Image</Label>
                        <FileInput
                            type="file"
                            accept="image/*"
                            onChange={(e) => setBgImage(e.target.files[0])}
                        />
                    </InputGroup>

                    <ButtonContainer>
                        <SaveButton onClick={handleSave}>Save</SaveButton>
                    </ButtonContainer>
                </Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
