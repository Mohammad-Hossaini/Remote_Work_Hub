import * as RadixDialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";

/* Overlay */
const Overlay = styled(RadixDialog.Overlay)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
`;

/* Dialog Content */
const Content = styled(RadixDialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40rem; /* increased width */
    max-width: 95vw;
    background-color: var(--color-grey-0);
    border-radius: var(--radius-md);
    padding: 3.5rem 3rem; /* increased padding */
    display: flex;
    flex-direction: column;
    gap: 2rem; /* increased gap */
    z-index: 1000;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--color-grey-200);
    max-height: 90vh;
    overflow-y: auto;
`;

/* Close Button */
const CloseButton = styled(RadixDialog.Close)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--color-grey-100);
    width: 2.4rem; /* slightly bigger */
    height: 2.4rem; 
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem; /* bigger icon */
    color: var(--color-grey-700);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: var(--color-grey-200);
    }
`;

/* Input Group */
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.6rem; /* bigger gap */
`;

/* Label */
const Label = styled.label`
    font-weight: 600;
    font-size: 1.2rem; /* slightly larger */
    color: var(--color-grey-900);
`;

/* Input */
const Input = styled.input`
    padding: 1rem 1.4rem; /* increased padding */
    font-size: 1.1rem; /* larger font */
    border: 1px solid var(--color-grey-300);
    border-radius: var(--radius-sm);
    outline: none;

    &:focus {
        border-color: var(--color-primary);
    }
`;

/* Login Button */
const Button = styled.button`
    margin-top: 1rem;
    background-color: var(--color-primary);
    color: #fff;
    padding: 1rem 1.8rem; /* larger padding */
    border-radius: var(--radius-xxl);
    font-weight: 500;
    font-size: 1.1rem; /* larger font */
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
        background-color: var(--color-primary-dark);
    }
`;

export default function LoginDialog({ trigger }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);

    /* Prevent page scroll when dialog is open */
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    const handleLogin = () => {
        console.log({ name, email, password });
        // TODO: call API to login
    };

    return (
        <RadixDialog.Root open={open} onOpenChange={setOpen}>
            <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <Overlay />
                <Content>
                    <h2>Login</h2>
                    <CloseButton asChild>
                        <IoMdClose />
                    </CloseButton>

                    <InputGroup>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </InputGroup>

                    <Button onClick={handleLogin}>Login</Button>
                </Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
