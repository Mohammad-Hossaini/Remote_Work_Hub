import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import styled from "styled-components";

import { storeApplicants } from "../services/apiStoreApplicants";

// Overlay
const DialogOverlay = styled(RadixDialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
`;

// Warning Message
const StyledWarning = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.4rem;
    font-size: 1.4rem;
    color: #b91c1c;

    svg {
        font-size: 1.6rem;
        flex-shrink: 0;
    }
`;

// Content
const DialogContent = styled(RadixDialog.Content)`
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 500px;
    max-height: 85vh;
    padding: 25px;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const DialogTitle = styled(RadixDialog.Title)`
    margin: 0;
    font-size: 17px;
    font-weight: 500;
    color: #111;
`;

const DialogDescription = styled(RadixDialog.Description)`
    margin: 10px 0 20px;
    font-size: 15px;
    color: #555;
`;

// Buttons
const Button = styled.button`
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 15px;
    font-weight: 500;
    height: 35px;
    background-color: ${(props) =>
        props.color === "violet"
            ? "#8b5cf6"
            : props.color === "green"
            ? "#22c55e"
            : "#ccc"};
    color: white;

    &:hover {
        opacity: 0.9;
    }
`;

const IconButton = styled.button`
    all: unset;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #111;
    cursor: pointer;
`;

// Fields
const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 15px;
    border: none;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #333;
`;

const Input = styled.input`
    padding: 8px 10px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid ${(props) => (props.error ? "red" : "#ccc")};
`;

const Select = styled.select`
    padding: 8px 10px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid ${(props) => (props.error ? "red" : "#ccc")};
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
`;

export default function DialogDemo({ open, onOpenChange, jobId }) {
    const [submitError, setSubmitError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setSubmitError(null);

            if (!jobId) throw new Error("Job ID not found"); // Safety check

            await storeApplicants(data, jobId); // Pass jobId

            alert("Application submitted successfully!");
            reset();
            onOpenChange(false);
        } catch (err) {
            console.error(err);
            setSubmitError(err.message || "Failed to submit application.");
        }
    };

    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            <RadixDialog.Trigger asChild></RadixDialog.Trigger>
            <RadixDialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <DialogTitle>Apply for Job</DialogTitle>
                    <DialogDescription>
                        Fill in your details and submit your application.
                    </DialogDescription>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* First Name */}
                        <Fieldset>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                {...register("firstName", {
                                    required: "First name is required",
                                })}
                                error={errors.firstName}
                                placeholder="Your first name"
                            />
                            {errors.firstName && (
                                <StyledWarning>
                                    <CiWarning />
                                    <span>{errors.firstName.message}</span>
                                </StyledWarning>
                            )}
                        </Fieldset>

                        {/* Last Name */}
                        <Fieldset>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                {...register("lastName", {
                                    required: "Last name is required",
                                })}
                                error={errors.lastName}
                                placeholder="Your last name"
                            />
                            {errors.lastName && (
                                <StyledWarning>
                                    <CiWarning />
                                    <span>{errors.lastName.message}</span>
                                </StyledWarning>
                            )}
                        </Fieldset>

                        {/* Country Code */}
                        <Fieldset>
                            <Label htmlFor="countryCode">Country Code</Label>
                            <Select
                                id="countryCode"
                                {...register("countryCode", {
                                    required: "Country code is required",
                                })}
                                error={errors.countryCode}
                            >
                                <option value="">Select code</option>
                                <option value="+1">+1 (USA)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+91">+91 (India)</option>
                                <option value="+61">+61 (Australia)</option>
                                <option value="+93">+93 (Afghanistan)</option>
                            </Select>
                            {errors.countryCode && (
                                <StyledWarning>
                                    <CiWarning />
                                    <span>{errors.countryCode.message}</span>
                                </StyledWarning>
                            )}
                        </Fieldset>

                        {/* Mobile */}
                        <Fieldset>
                            <Label htmlFor="mobile">Mobile Phone Number</Label>
                            <Input
                                id="mobile"
                                {...register("mobile", {
                                    required: "Mobile number is required",
                                })}
                                error={errors.mobile}
                                placeholder="Your phone number"
                            />
                            {errors.mobile && (
                                <StyledWarning>
                                    <CiWarning />
                                    <span>{errors.mobile.message}</span>
                                </StyledWarning>
                            )}
                        </Fieldset>

                        {/* Email */}
                        <Fieldset>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                        message: "Enter a valid email",
                                    },
                                })}
                                error={errors.email}
                                placeholder="Your email address"
                            />
                            {errors.email && (
                                <StyledWarning>
                                    <CiWarning />
                                    <span>{errors.email.message}</span>
                                </StyledWarning>
                            )}
                        </Fieldset>

                        {submitError && (
                            <StyledWarning>
                                <CiWarning />
                                <span>{submitError}</span>
                            </StyledWarning>
                        )}

                        <ButtonContainer>
                            <Button color="green" type="submit">
                                Submit Application
                            </Button>
                        </ButtonContainer>
                    </form>

                    <RadixDialog.Close asChild>
                        <IconButton aria-label="Close">
                            <Cross2Icon />
                        </IconButton>
                    </RadixDialog.Close>
                </DialogContent>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
