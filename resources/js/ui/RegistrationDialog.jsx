//v3
import * as RadixDialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { TiWarningOutline } from "react-icons/ti";
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
    border: 1px solid var(--color-grey-300);
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
    border: 1px solid var(--color-grey-300);
    border-radius: var(--radius-sm);
    outline: none;
    background-color: #fff;
    &:focus {
        border-color: var(--color-primary);
    }
`;

/* Buttons Container */
const StyledButtons = styled.div`
    display: flex;
    column-gap: 1.5rem;
    margin-top: 2rem;
`;

/* Register Button */
const RegisterButton = styled.button`
    background-color: var(--color-primary);
    color: #fff;
    padding: 1rem 2rem;
    border-radius: var(--radius-xxl);
    font-weight: 500;
    font-size: 1.1rem;
    cursor: pointer;
    border: none;
    transition: 0.2s ease;
    &:hover {
        background-color: var(--color-primary-dark);
    }
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

/* Cancel Button */
const CancelButton = styled.button`
    background-color: var(--color-grey-200);
    color: var(--color-grey-700);
    padding: 1rem 2rem;
    border-radius: var(--radius-xxl);
    font-weight: 500;
    font-size: 1.1rem;
    cursor: pointer;
    border: none;
    transition: 0.2s ease;
    &:hover {
        background-color: var(--color-grey-300);
    }
`;

/* Error Message */
const ErrorMessage = styled.span`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--color-error);
    font-size: 1rem;
    margin-top: 0.3rem;
`;

export default function RegistrationDialog({ trigger }) {
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    const {
        handleSubmit,
        reset,
        register,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");

    const queryClient = useQueryClient();
    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createNewUser,
        onSuccess: () => {
            toast.success("You have registered successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            reset();
            setOpen(false);
        },
        onError: (err) => toast.error(err.message),
    });

    const onSubmit = (data, e) => {
        e.preventDefault();

        // Convert skills string to array
        if (data.skills && typeof data.skills === "string") {
            data.skills = data.skills.split(",").map((s) => s.trim());
        }

        // Add role
        data.role = role;

        // Default values
        data.Work_Experience = data.Work_Experience || [
            { jobTitle: "", company: "", from: "", to: "", jobLevel: "" },
        ];
        data.Educations = data.Educations || [
            {
                school: "",
                educationalAttainment: "",
                from: "",
                to: "",
                description: "",
            },
        ];
        data.mobile = data.mobile || "";

        // Generate simple token
        data.token = Math.random().toString(36).substring(2, 15);

        // Handle resume file (optional)
        if (data.resume && data.resume.length > 0) {
            data.resume = data.resume[0].name;
        }

        mutate(data);
    };

    const onError = (err) => console.log(err);

    return (
        <RadixDialog.Root open={open} onOpenChange={setOpen}>
            <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <Overlay />
                <Content>
                    <RadixDialog.Title>Register</RadixDialog.Title>
                    <CloseButton asChild>
                        <IoMdClose />
                    </CloseButton>

                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <FormGrid>
                            {/* First Name */}
                            <InputGroup>
                                <Label>First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="Enter your first name"
                                    {...register("firstName", {
                                        required: "This field is required",
                                    })}
                                />
                                {errors.firstName && (
                                    <ErrorMessage>
                                        <TiWarningOutline />{" "}
                                        {errors.firstName.message}
                                    </ErrorMessage>
                                )}
                            </InputGroup>

                            {/* Last Name */}
                            <InputGroup>
                                <Label>Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Enter your last name"
                                    {...register("lastName", {
                                        required: "This field is required",
                                    })}
                                />
                                {errors.lastName && (
                                    <ErrorMessage>
                                        <TiWarningOutline />{" "}
                                        {errors.lastName.message}
                                    </ErrorMessage>
                                )}
                            </InputGroup>

                            {/* Password */}
                            <InputGroup>
                                <Label>Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "This field is required",
                                    })}
                                />
                                {errors.password && (
                                    <ErrorMessage>
                                        <TiWarningOutline />{" "}
                                        {errors.password.message}
                                    </ErrorMessage>
                                )}
                            </InputGroup>

                            {/* Confirm Password */}
                            <InputGroup>
                                <Label>Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    {...register("confirmPassword", {
                                        required: "This field is required",
                                        validate: (value) =>
                                            value === password ||
                                            "Passwords do not match",
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <ErrorMessage>
                                        <TiWarningOutline />{" "}
                                        {errors.confirmPassword.message}
                                    </ErrorMessage>
                                )}
                            </InputGroup>

                            {/* Phone */}
                            <InputGroup>
                                <Label>Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    {...register("phone", {
                                        required: "This field is required",
                                    })}
                                />
                                {errors.phone && (
                                    <ErrorMessage>
                                        <TiWarningOutline />{" "}
                                        {errors.phone.message}
                                    </ErrorMessage>
                                )}
                            </InputGroup>

                            {/* Email */}
                            <InputGroup>
                                <Label>Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "This field is required",
                                    })}
                                />
                                {errors.email && (
                                    <ErrorMessage>
                                        <TiWarningOutline />{" "}
                                        {errors.email.message}
                                    </ErrorMessage>
                                )}
                            </InputGroup>

                            {/* Role */}
                            <InputGroup>
                                <Label>Role / User Type</Label>
                                <Select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    <option value="jobseeker">
                                        Job Seeker
                                    </option>
                                    <option value="employer">Employer</option>
                                </Select>
                            </InputGroup>
                        </FormGrid>

                        {/* Jobseeker Fields */}
                        {role === "jobseeker" && (
                            <FormGrid>
                                <InputGroup>
                                    <Label>Description</Label>
                                    <TextArea
                                        placeholder="Describe yourself"
                                        {...register("description")}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label>Resume (Optional)</Label>
                                    <Input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        {...register("resume")}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label>Skills (comma separated)</Label>
                                    <Input
                                        type="text"
                                        placeholder="JavaScript, React, Node.js"
                                        {...register("skills", {
                                            required: "This field is required",
                                        })}
                                    />
                                    {errors.skills && (
                                        <ErrorMessage>
                                            <TiWarningOutline />{" "}
                                            {errors.skills.message}
                                        </ErrorMessage>
                                    )}
                                </InputGroup>

                                <InputGroup>
                                    <Label>Experience (Optional)</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter experience"
                                        {...register("experience")}
                                    />
                                </InputGroup>
                            </FormGrid>
                        )}

                        {/* Employer Fields */}
                        {role === "employer" && (
                            <FormGrid>
                                <InputGroup>
                                    <Label>Company Name</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter company name"
                                        {...register("company_name", {
                                            required: "This field is required",
                                        })}
                                    />
                                    {errors.company_name && (
                                        <ErrorMessage>
                                            <TiWarningOutline />{" "}
                                            {errors.company_name.message}
                                        </ErrorMessage>
                                    )}
                                </InputGroup>

                                <InputGroup>
                                    <Label>Website (Optional)</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter website"
                                        {...register("website")}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label>Location</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter location"
                                        {...register("location", {
                                            required: "This field is required",
                                        })}
                                    />
                                    {errors.location && (
                                        <ErrorMessage>
                                            <TiWarningOutline />{" "}
                                            {errors.location.message}
                                        </ErrorMessage>
                                    )}
                                </InputGroup>

                                <InputGroup>
                                    <Label>Religon (Optional)</Label>
                                    <Input
                                        type="text"
                                        {...register("religon")}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label>Contact Person</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter contact person"
                                        {...register("contact_person", {
                                            required: "This field is required",
                                        })}
                                    />
                                    {errors.contact_person && (
                                        <ErrorMessage>
                                            <TiWarningOutline />{" "}
                                            {errors.contact_person.message}
                                        </ErrorMessage>
                                    )}
                                </InputGroup>
                            </FormGrid>
                        )}

                        <StyledButtons>
                            <CancelButton type="reset">Cancel</CancelButton>
                            <RegisterButton type="submit" disabled={isCreating}>
                                Register
                            </RegisterButton>
                        </StyledButtons>
                    </form>
                </Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
