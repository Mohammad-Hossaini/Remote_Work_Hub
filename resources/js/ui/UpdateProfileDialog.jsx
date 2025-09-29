import * as RadixDialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import { useAuth } from "../hook/AuthContext";
import { updateUser } from "../services/apiUsers";

const DialogOverlay = styled(RadixDialog.Overlay)`
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    inset: 0;
`;

const DialogContent = styled(RadixDialog.Content)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 70rem;
    max-height: 90vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Slide = styled.div`
    display: ${(props) => (props.active ? "block" : "none")};
`;

const CarouselControls = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.6rem;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 1.6rem;
        padding: 0.8rem 1.2rem;
        background: #087f5b;
        color: #fff;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &:hover:not(:disabled) {
            background: #066f4b;
        }
    }
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    font-family: "Inter", sans-serif;

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

export default function UpdateProfileDialog({ trigger, onUpdate }) {
    const { user, setUser } = useAuth();
    const [open, setOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const slides = ["basic", "work", "education"];

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            ...user,
            Work_Experience: user?.Work_Experience?.length
                ? user.Work_Experience
                : [{}],
            Educations: user?.Educations?.length ? user.Educations : [{}],
        },
    });

    const workArray = useFieldArray({ control, name: "Work_Experience" });
    const eduArray = useFieldArray({ control, name: "Educations" });

    // Reset form when user changes
    useEffect(() => {
        reset({
            ...user,
            Work_Experience: user?.Work_Experience?.length
                ? user.Work_Experience
                : [{}],
            Educations: user?.Educations?.length ? user.Educations : [{}],
        });
    }, [user, reset]);

    const handleNext = () =>
        setSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
    const handlePrev = () => setSlideIndex((prev) => Math.max(prev - 0, 0));

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                Work_Experience: data.Work_Experience.map((w) => ({
                    jobTitle: w.jobTitle || "",
                    company: w.company || "",
                    from: w.from || "",
                    to: w.to || "",
                    jobLevel: w.jobLevel || "",
                })),
                Educations: data.Educations.map((e) => ({
                    school: e.school || "",
                    educationalAttainment: e.educationalAttainment || "",
                    from: e.from || "",
                    to: e.to || "",
                    description: e.description || "",
                })),
            };

            const updated = await updateUser(user.id, payload);

            // Update AuthContext & localStorage
            if (setUser) {
                setUser(updated);
                localStorage.setItem("authUser", JSON.stringify(updated));
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Basic Info */}
                        <Slide active={slides[slideIndex] === "basic"}>
                            <Section>
                                <h2>Basic Info</h2>
                                <label>First Name</label>
                                <input {...register("firstName")} />
                                <label>Last Name</label>
                                <input {...register("lastName")} />
                                <label>Email</label>
                                <input {...register("email")} />
                                <label>Location</label>
                                <input {...register("location")} />
                                <label>Mobile</label>
                                <input {...register("mobile")} />
                                <label>Description</label>
                                <textarea {...register("description")} />
                                <label>Profile Photo URL</label>
                                <input {...register("profilePhoto")} />
                                <label>Background Image URL</label>
                                <input {...register("bg_image")} />
                            </Section>
                        </Slide>

                        {/* Work Experience */}
                        <Slide active={slides[slideIndex] === "work"}>
                            <Section>
                                <h2>Work Experience</h2>
                                {workArray.fields.map((field, index) => (
                                    <div key={field.id}>
                                        <label>Job Title</label>
                                        <input
                                            {...register(
                                                `Work_Experience.${index}.jobTitle`
                                            )}
                                        />
                                        <label>Company</label>
                                        <input
                                            {...register(
                                                `Work_Experience.${index}.company`
                                            )}
                                        />
                                        <label>From</label>
                                        <input
                                            {...register(
                                                `Work_Experience.${index}.from`
                                            )}
                                        />
                                        <label>To</label>
                                        <input
                                            {...register(
                                                `Work_Experience.${index}.to`
                                            )}
                                        />
                                        <label>Job Level</label>
                                        <input
                                            {...register(
                                                `Work_Experience.${index}.jobLevel`
                                            )}
                                        />
                                    </div>
                                ))}
                            </Section>
                        </Slide>

                        {/* Education */}
                        <Slide active={slides[slideIndex] === "education"}>
                            <Section>
                                <h2>Education</h2>
                                {eduArray.fields.map((field, index) => (
                                    <div key={field.id}>
                                        <label>School</label>
                                        <input
                                            {...register(
                                                `Educations.${index}.school`
                                            )}
                                        />
                                        <label>Degree</label>
                                        <input
                                            {...register(
                                                `Educations.${index}.educationalAttainment`
                                            )}
                                        />
                                        <label>From</label>
                                        <input
                                            {...register(
                                                `Educations.${index}.from`
                                            )}
                                        />
                                        <label>To</label>
                                        <input
                                            {...register(
                                                `Educations.${index}.to`
                                            )}
                                        />
                                        <label>Description</label>
                                        <textarea
                                            {...register(
                                                `Educations.${index}.description`
                                            )}
                                        />
                                    </div>
                                ))}
                            </Section>
                        </Slide>

                        <CarouselControls>
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={slideIndex === 0}
                            >
                                <FaChevronLeft /> Prev
                            </button>

                            {slideIndex === slides.length - 1 ? (
                                <button type="submit" disabled={isSubmitting}>
                                    Save
                                </button>
                            ) : (
                                <button type="button" onClick={handleNext}>
                                    Next <FaChevronRight />
                                </button>
                            )}
                        </CarouselControls>
                    </form>
                </DialogContent>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
