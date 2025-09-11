import * as RadixDialog from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { loginUser } from "../features/authintication/apiLogin";

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
    width: 40rem;
    max-width: 95vw;
    background-color: var(--color-grey-0);
    border-radius: var(--radius-md);
    padding: 3.5rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
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
    gap: 0.6rem;
`;

/* Label */
const Label = styled.label`
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--color-grey-900);
`;

/* Input */
const Input = styled.input`
    padding: 1rem 1.4rem;
    font-size: 1.1rem;
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
    padding: 1rem 1.8rem;
    border-radius: var(--radius-xxl);
    font-weight: 500;
    font-size: 1.1rem;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
        background-color: var(--color-primary-dark);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export default function LoginDialog({ trigger }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    const validate = () => {
        let result = true;
        if (!name) {
            result = false;
            toast.error("Name is required!");
        }
        if (!email) {
            result = false;
            toast.error("Email is required!");
        }
        if (!password) {
            result = false;
            toast.error("Password is required!");
        }
        return result;
    };

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (user) => {
            if (!user) {
                toast.error("Invalid credentials!");
                return;
            }

            toast.success("Login successful!");

            // Navigate based on role
            if (user.role === "employer") navigate("/employerApp");
            else if (user.role === "jobseeker") navigate("/app");

            setOpen(false);
            setName("");
            setEmail("");
            setPassword("");
        },
        onError: (err) => {
            toast.error("Login failed: " + err.message);
        },
    });

    const handleLogin = (e) => {
        e.preventDefault();
        if (!validate()) return;
        mutation.mutate({ name, email, password });
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
                            autoComplete="name"
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </InputGroup>

                    <Button
                        onClick={handleLogin}
                        disabled={mutation.isLoading} // disable button while loading
                    >
                        {mutation.isLoading ? "Logging in..." : "Login"}
                    </Button>
                </Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
