import * as RadixDialog from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CiWarning } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { createNewUser } from "../services/apiUsers";

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
    width: 60rem;
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

/* Form Grid */
const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    width: 100%;
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

/* TextArea */
const TextArea = styled.textarea`
    padding: 1rem 1.4rem;
    font-size: 1.1rem;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--radius-sm);
    outline: none;
    resize: vertical;

    &:focus {
        border-color: var(--color-primary);
    }
`;

/* Select */
const Select = styled.select`
    padding: 1rem 1.4rem;
    font-size: 1.1rem;
    border: 1px solid
        ${(props) => (props.error ? "red" : "var(--color-grey-300)")};
    border-radius: var(--radius-sm);
    outline: none;
    background-color: #fff;

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

/* Button */
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

export default function RegistrationDialog({ trigger }) {
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const mutation = useMutation({
        mutationFn: createNewUser,
        onSuccess: (data) => {
            toast.success("User registered successfully!");
            reset();
            setRole("");
            setOpen(false);
        },
        onError: (err) => {
            toast.error(
                "Registration failed: " + (err.message || "Server error")
            );
        },
    });

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const { confirmPassword, ...userData } = data;
        userData.role = role;
        mutation.mutate(userData);
    };

    return (
        <RadixDialog.Root open={open} onOpenChange={setOpen}>
            <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <Overlay />
                <Content>
                    <h2>Register</h2>
                    <CloseButton asChild>
                        <IoMdClose />
                    </CloseButton>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGrid>
                            <InputGroup>
                                <Label>First Name</Label>
                                <Input
                                    type="text"
                                    {...register("firstName", {
                                        required: "First name is required",
                                    })}
                                    error={errors.firstName}
                                    placeholder="Enter your first name"
                                />
                                {errors.firstName && (
                                    <StyledWarning>
                                        <CiWarning /> {errors.firstName.message}
                                    </StyledWarning>
                                )}
                            </InputGroup>

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
                                        <CiWarning /> {errors.password.message}
                                    </StyledWarning>
                                )}
                            </InputGroup>

                            <InputGroup>
                                <Label>Last Name</Label>
                                <Input
                                    type="text"
                                    {...register("lastName", {
                                        required: "Last name is required",
                                    })}
                                    error={errors.lastName}
                                    placeholder="Enter your last name"
                                />
                                {errors.lastName && (
                                    <StyledWarning>
                                        <CiWarning /> {errors.lastName.message}
                                    </StyledWarning>
                                )}
                            </InputGroup>

                            <InputGroup>
                                <Label>Confirm Password</Label>
                                <Input
                                    type="password"
                                    {...register("confirmPassword", {
                                        required: "Confirm password",
                                    })}
                                    error={errors.confirmPassword}
                                    placeholder="Confirm your password"
                                />
                                {errors.confirmPassword && (
                                    <StyledWarning>
                                        <CiWarning />{" "}
                                        {errors.confirmPassword.message}
                                    </StyledWarning>
                                )}
                            </InputGroup>

                            <InputGroup>
                                <Label>Phone Number</Label>
                                <Input
                                    type="tel"
                                    {...register("phone")}
                                    placeholder="Enter your phone number"
                                />
                            </InputGroup>

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
                                        <CiWarning /> {errors.email.message}
                                    </StyledWarning>
                                )}
                            </InputGroup>

                            <InputGroup>
                                <Label>Role / User Type</Label>
                                <Select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    error={!role && errors.role}
                                >
                                    <option value="">Select Role</option>
                                    <option value="jobseeker">
                                        Job Seeker
                                    </option>
                                    <option value="employer">Employer</option>
                                </Select>
                                {!role && errors.role && (
                                    <StyledWarning>
                                        <CiWarning /> {errors.role.message}
                                    </StyledWarning>
                                )}
                            </InputGroup>
                        </FormGrid>

                        {/* Role-specific fields */}
                        {role === "jobseeker" && (
                            <FormGrid>
                                <InputGroup>
                                    <Label>Description</Label>
                                    <TextArea
                                        {...register("description")}
                                        placeholder="Describe yourself"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Resume (Optional)</Label>
                                    <Input
                                        type="file"
                                        {...register("resume")}
                                        accept=".pdf,.doc,.docx"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Skills</Label>
                                    <Input
                                        type="text"
                                        {...register("skills")}
                                        placeholder="Enter skills"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Experience (Optional)</Label>
                                    <Input
                                        type="text"
                                        {...register("experience")}
                                        placeholder="Enter experience"
                                    />
                                </InputGroup>
                            </FormGrid>
                        )}

                        {role === "employer" && (
                            <FormGrid>
                                <InputGroup>
                                    <Label>Company Name</Label>
                                    <Input
                                        type="text"
                                        {...register("companyName")}
                                        placeholder="Enter company name"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Website (Optional)</Label>
                                    <Input
                                        type="text"
                                        {...register("website")}
                                        placeholder="Enter website"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Location</Label>
                                    <Input
                                        type="text"
                                        {...register("location")}
                                        placeholder="Enter location"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Company Logo</Label>
                                    <Input
                                        type="file"
                                        {...register("companyLogo")}
                                        accept="image/*"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Contact Person</Label>
                                    <Input
                                        type="text"
                                        {...register("contactPerson")}
                                        placeholder="Enter contact person"
                                    />
                                </InputGroup>
                            </FormGrid>
                        )}

                        <Button type="submit" disabled={mutation.isLoading}>
                            {mutation.isLoading ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
