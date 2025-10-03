import * as RadixDialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import styled from "styled-components";
import { useAuth } from "../hook/AuthContext";

// Styled components
const DialogOverlay = styled(RadixDialog.Overlay)`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
`;

const DialogContent = styled(RadixDialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -120%);
    width: 60rem;
    max-height: 80vh;
    background-color: #fff;
    border-radius: 1rem;
    padding: 3rem 2rem 4rem;
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    position: absolute;
    top: 2rem;
    left: 2rem;
    font-size: 2rem;
    font-weight: 600;
`;

const CloseIcon = styled(RxCross1)`
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-size: 2rem;
    cursor: pointer;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding-top: 1.8rem;

    label {
        font-weight: 600;
        font-size: 1.4rem;
    }

    input,
    textarea {
        padding: 0.8rem;
        border-radius: 0.5rem;
        border: 1px solid #ced4da;
        font-size: 1.4rem;
        width: 100%;
    }
`;

const BottomActions = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 1.5rem;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #ced4da;
    }

    button {
        padding: 0.8rem 1.5rem;
        font-size: 1.4rem;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
    }

    .cancel {
        background-color: #f1f3f5;
        color: #495057;
    }

    .save {
        background-color: #087f5b;
        color: #fff;

        &:hover {
            background-color: #066f4b;
        }
    }
`;

export default function UpdateProfileDialog({ trigger, onUpdate }) {
    const { user, setUser } = useAuth();
    // console.log("user info:", user);
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: user?.data?.user?.profile?.first_name || "",
            lastName: user?.data?.user?.profile?.last_name || "",
            education: user?.data?.user?.profile?.education || "",
            email: user?.data?.user?.email || "",
            mobile: user?.data?.user?.profile?.phone || "",
            description: user?.data?.user?.profile?.description || "",
            skills: user?.data?.user?.profile?.skills || "",
        },
    });

    // Reset form when user changes
    useEffect(() => {
        reset({
            firstName: user?.data?.user?.profile?.first_name || "",
            lastName: user?.data?.user?.profile?.last_name || "",
            education: user?.data?.user?.profile?.education || "",
            email: user?.data?.user?.email || "",
            mobile: user?.data?.user?.profile?.phone || "",
            description: user?.data?.user?.profile?.description || "",
            skills: user?.data?.user?.profile?.skills || "",
        });
    }, [user, reset]);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("first_name", data.firstName);
            formData.append("last_name", data.lastName);
            formData.append("education", data.education);
            formData.append("email", data.email);
            formData.append("phone", data.mobile);
            formData.append("description", data.description);
            formData.append("skills", data.skills);
            data.resume && data.resume.length > 0;

            const res = await fetch(
                `http://127.0.0.1:8000/api/profiles/${user?.data?.user?.profile?.id}`,
                {
                    method: "POST", // or PUT if backend supports
                    headers: {
                        Authorization: `Bearer ${user?.token}`, // do NOT set Content-Type manually
                        Accept: "application/json",
                    },
                    body: formData,
                }
            );

            const updated = await res.json();

            if (setUser) {
                setUser((prev) => ({
                    ...prev,
                    data: {
                        ...prev.data,
                        user: { ...prev.data.user, profile: updated },
                    },
                }));
                localStorage.setItem(
                    "authUser",
                    JSON.stringify({
                        ...user,
                        data: {
                            ...user.data,
                            user: { ...user.data.user, profile: updated },
                        },
                    })
                );
            }

            if (onUpdate) onUpdate(updated);
            setOpen(false);
            toast.success("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile.");
        }
    };

    return (
        <RadixDialog.Root open={open} onOpenChange={setOpen}>
            <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <Title>Basic Info</Title>
                    <RadixDialog.Close asChild>
                        <CloseIcon />
                    </RadixDialog.Close>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Section>
                            <label>First Name</label>
                            <input {...register("firstName")} />
                            <label>Last Name</label>
                            <input {...register("lastName")} />
                            <label>Education</label>
                            <input {...register("education")} />
                            <label>Email</label>
                            <input {...register("email")} />
                            <label>Mobile</label>
                            <input {...register("mobile")} />
                            <label>Description</label>
                            <textarea {...register("description")} />
                            <label>Resume</label>
                            <input
                                type="file"
                                {...register("resume")}
                                accept=".pdf,.doc,.docx"
                            />
                        </Section>

                        <BottomActions>
                            <button
                                type="button"
                                className="cancel"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="save"
                                disabled={isSubmitting}
                            >
                                Save
                            </button>
                        </BottomActions>
                    </form>
                </DialogContent>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
