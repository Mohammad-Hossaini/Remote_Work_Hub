import * as RadixDialog from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
    gap: 0.3rem;
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
    border: 1px solid
        ${(props) => (props.error ? "red" : "var(--color-grey-300)")};
    border-radius: var(--radius-sm);
    outline: none;

    &:focus {
        border-color: var(--color-primary);
    }
`;

/* Warning message */
const StyledWarning = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.95rem;
    color: #b91c1c;
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
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (user) => {
            if (!user || !user.token) {
                toast.error("Invalid credentials!");
                return;
            }
            localStorage.setItem("authUser", JSON.stringify(user));
            toast.success("Login successful!");
            reset();
            setOpen(false);
            if (user.role === "employer") navigate("/employerApp");
            else navigate("/app");
        },
        onError: (err) => {
            toast.error("Login failed: " + (err.message || "Server error"));
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <>
            <RadixDialog.Root open={open} onOpenChange={setOpen}>
                <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
                <RadixDialog.Portal>
                    <Overlay />
                    <Content>
                        <h2>Login</h2>
                        <CloseButton asChild>
                            <IoMdClose />
                        </CloseButton>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Name */}
                            <InputGroup>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                    error={errors.name}
                                    placeholder="Enter your name"
                                />
                                {errors.name && (
                                    <StyledWarning>
                                        <CiWarning />
                                        {errors.name.message}
                                    </StyledWarning>
                                )}
                            </InputGroup>

                            {/* Email */}
                            <InputGroup>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    error={errors.email}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <StyledWarning>
                                        <CiWarning />
                                        {errors.email.message}
                                    </StyledWarning>
                                )}
                            </InputGroup>

                            {/* Password */}
                            <InputGroup>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    error={errors.password}
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <StyledWarning>
                                        <CiWarning />
                                        {errors.password.message}
                                    </StyledWarning>
                                )}
                            </InputGroup>

                            <Button type="submit" disabled={mutation.isLoading}>
                                {mutation.isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </Content>
                </RadixDialog.Portal>
            </RadixDialog.Root>
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    );
}
