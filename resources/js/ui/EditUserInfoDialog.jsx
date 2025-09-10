import * as RadixDialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";

const Overlay = styled(RadixDialog.Overlay)`
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    inset: 0;
`;

const Content = styled(RadixDialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -110%);
    width: 50rem;
    max-width: 90vw;
    background-color: var(--color-grey-0);
    border-radius: var(--radius-md);
    padding: var(--space-32);
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    z-index: 1000;
    position: relative;
`;

const CloseButton = styled(RadixDialog.Close)`
    position: absolute;
    top: var(--space-16);
    right: var(--space-16);
    background: var(--color-grey-100);
    border-radius: 50%;
    border: none;
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.6rem;
    color: var(--color-grey-700);
    transition: all 0.2s ease;

    &:hover {
        background: var(--color-grey-200);
    }
`;

const TitleLine = styled.div`
    border-bottom: 1px solid var(--color-grey-200);
    margin-bottom: var(--space-16);
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

const Label = styled.label`
    font-weight: 600;
    font-size: var(--font-sm);
    color: var(--color-grey-900);
`;

const Input = styled.input`
    padding: 0.8rem 1rem;
    font-size: var(--font-sm);
    border: 1px solid var(--color-grey-300);
    border-radius: var(--radius-sm);
    outline: none;
`;

const TextArea = styled.textarea`
    padding: 0.8rem 1rem;
    font-size: var(--font-sm);
    border: 1px solid var(--color-grey-300);
    border-radius: var(--radius-sm);
    outline: none;
    resize: vertical;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: var(--space-12);
    margin-top: var(--space-16);
`;

const SaveButton = styled.button`
    background-color: var(--color-primary);
    color: #fff;
    padding: 0.6rem 1.2rem;
    border-radius: var(--radius-xxl);
    font-weight: 500;
    transition: 0.2s ease;
    cursor: pointer;

    &:hover {
        background-color: var(--color-primary-dark);
    }
`;

const CancelButton = styled(RadixDialog.Close)`
    background-color: transparent;
    border: 1px solid var(--color-grey-400);
    color: var(--color-grey-700);
    padding: 0.6rem 1.2rem;
    border-radius: var(--radius-xxl);
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background-color: var(--color-grey-100);
    }
`;

export default function EditUserInfoDialog({ trigger }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [headline, setHeadline] = useState("");
    const [description, setDescription] = useState("");
    const [education, setEducation] = useState("");
    const [location, setLocation] = useState("");

    const handleSave = () => {
        console.log({
            firstName,
            lastName,
            headline,
            description,
            education,
            location,
        });
        // TODO: call API to save user info
    };

    return (
        <RadixDialog.Root>
            <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <Overlay />
                <Content>
                    <h3>Edit User Info</h3>
                    <TitleLine />

                    <CloseButton asChild>
                        <IoMdClose />
                    </CloseButton>

                    <InputGroup>
                        <Label>First Name</Label>
                        <Input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Last Name</Label>
                        <Input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Headline</Label>
                        <Input
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Description</Label>
                        <TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Education</Label>
                        <Input
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                        />
                    </InputGroup>
                    <ButtonContainer>
                        <CancelButton>Cancel</CancelButton>
                        <SaveButton onClick={handleSave}>Save</SaveButton>
                    </ButtonContainer>
                </Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
