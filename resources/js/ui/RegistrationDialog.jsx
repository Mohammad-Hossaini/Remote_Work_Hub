import * as RadixDialog from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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

/* Select styled like input */
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
`;

// ✅ Initial form data
const initialFormData = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    description: "",
    resume: null,
    skills: "",
    experience: "",
    companyName: "",
    website: "",
    location: "",
    companyLogo: null,
    contactPerson: "",
};

export default function RegistrationDialog({ trigger }) {
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState("");
    const [formData, setFormData] = useState(initialFormData);

    const mutation = useMutation({
        mutationFn: createNewUser,
        onSuccess: (data) => {
            console.log("User created successfully:", data);

            // ✅ Reset form and role after successful submission
            setFormData(initialFormData);
            setRole("");

            setOpen(false);
        },
        onError: (err) => {
            console.error("Error creating user:", err.message);
        },
    });

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const { confirmPassword, ...userData } = formData;
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
                    <FormGrid>
                        {/* First Column */}
                        <InputGroup>
                            <Label>First Name</Label>
                            <Input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label>Phone Number</Label>
                            <Input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </InputGroup>

                        {/* Role / User Type */}
                        <InputGroup>
                            <Label>Role / User Type</Label>
                            <Select
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="jobseeker">Job Seeker</option>
                                <option value="employer">Employer</option>
                            </Select>
                        </InputGroup>
                    </FormGrid>

                    {role === "jobseeker" && (
                        <FormGrid>
                            <InputGroup>
                                <Label>Description</Label>
                                <TextArea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe yourself"
                                    rows={3}
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Resume</Label>
                                <Input
                                    type="file"
                                    name="resume"
                                    onChange={handleChange}
                                    accept=".pdf,.doc,.docx"
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Skills</Label>
                                <Input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="Enter skills"
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Experience (Optional)</Label>
                                <Input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    placeholder="Enter your experience"
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
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Enter company name"
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Website (Optional)</Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="Enter website URL"
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter location"
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Company Logo / Banner</Label>
                                <Input
                                    type="file"
                                    name="companyLogo"
                                    onChange={handleChange}
                                    accept="image/*"
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Contact Person</Label>
                                <Input
                                    type="text"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    placeholder="Enter contact person"
                                />
                            </InputGroup>
                        </FormGrid>
                    )}

                    <Button
                        onClick={handleSubmit}
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? "Registering..." : "Register"}
                    </Button>
                </Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
