
import * as RadixDialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";

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

export default function UpdateProfileDialog({ trigger, user, onUpdate }) {
    const [open, setOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);

    const slides = ["basic", "work", "education"];

    // Initialize formData with user info
    const [formData, setFormData] = useState({
        ...user,
        Work_Experience: user.Work_Experience?.length ? user.Work_Experience : [{}],
        Educations: user.Educations?.length ? user.Educations : [{}],
    });

    const handleNext = () =>
        setSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
    const handlePrev = () => setSlideIndex((prev) => Math.max(prev - 1, 0));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleWorkChange = (e, index, field) => {
        const updated = { ...formData };
        updated.Work_Experience[index][field] = e.target.value;
        setFormData(updated);
    };

    const handleEducationChange = (e, index, field) => {
        const updated = { ...formData };
        updated.Educations[index][field] = e.target.value;
        setFormData(updated);
    };

    const handleSave = () => {
        onUpdate(formData); 
    };

    return (
        <RadixDialog.Root open={open} onOpenChange={setOpen}>
            <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    {/* Basic Info Slide */}
                    <Slide active={slides[slideIndex] === "basic"}>
                        <Section>
                            <h2>Basic Info</h2>
                            <label>First Name</label>
                            <input
                                name="firstName"
                                value={formData.firstName || ""}
                                onChange={handleChange}
                            />
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                value={formData.lastName || ""}
                                onChange={handleChange}
                            />
                            <label>Email</label>
                            <input
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                            />
                            <label>Location</label>
                            <input
                                name="location"
                                value={formData.location || ""}
                                onChange={handleChange}
                            />
                            <label>Mobile</label>
                            <input
                                name="mobile"
                                value={formData.mobile || ""}
                                onChange={handleChange}
                            />
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description || ""}
                                onChange={handleChange}
                            />
                            <label>Profile Photo URL</label>
                            <input
                                name="profilePhoto"
                                value={formData.profilePhoto || ""}
                                onChange={handleChange}
                            />
                            <label>Background Image URL</label>
                            <input
                                name="bg_image"
                                value={formData.bg_image || ""}
                                onChange={handleChange}
                            />
                        </Section>
                    </Slide>

                    {/* Work Experience Slide */}
                    <Slide active={slides[slideIndex] === "work"}>
                        <Section>
                            <h2>Work Experience</h2>
                            {formData.Work_Experience.map((work, index) => (
                                <div key={index}>
                                    <label>Job Title</label>
                                    <input
                                        value={work.jobTitle || ""}
                                        onChange={(e) =>
                                            handleWorkChange(e, index, "jobTitle")
                                        }
                                    />
                                    <label>Company</label>
                                    <input
                                        value={work.company || ""}
                                        onChange={(e) =>
                                            handleWorkChange(e, index, "company")
                                        }
                                    />
                                    <label>From</label>
                                    <input
                                        value={work.from || ""}
                                        onChange={(e) => handleWorkChange(e, index, "from")}
                                    />
                                    <label>To</label>
                                    <input
                                        value={work.to || ""}
                                        onChange={(e) => handleWorkChange(e, index, "to")}
                                    />
                                    <label>Job Level</label>
                                    <input
                                        value={work.jobLevel || ""}
                                        onChange={(e) =>
                                            handleWorkChange(e, index, "jobLevel")
                                        }
                                    />
                                </div>
                            ))}
                        </Section>
                    </Slide>

                    {/* Education Slide */}
                    <Slide active={slides[slideIndex] === "education"}>
                        <Section>
                            <h2>Education</h2>
                            {formData.Educations.map((edu, index) => (
                                <div key={index}>
                                    <label>School</label>
                                    <input
                                        value={edu.school || ""}
                                        onChange={(e) =>
                                            handleEducationChange(e, index, "school")
                                        }
                                    />
                                    <label>Degree</label>
                                    <input
                                        value={edu.educationalAttainment || ""}
                                        onChange={(e) =>
                                            handleEducationChange(
                                                e,
                                                index,
                                                "educationalAttainment"
                                            )
                                        }
                                    />
                                    <label>From</label>
                                    <input
                                        value={edu.from || ""}
                                        onChange={(e) =>
                                            handleEducationChange(e, index, "from")
                                        }
                                    />
                                    <label>To</label>
                                    <input
                                        value={edu.to || ""}
                                        onChange={(e) =>
                                            handleEducationChange(e, index, "to")
                                        }
                                    />
                                    <label>Description</label>
                                    <textarea
                                        value={edu.description || ""}
                                        onChange={(e) =>
                                            handleEducationChange(e, index, "description")
                                        }
                                    />
                                </div>
                            ))}
                        </Section>
                    </Slide>

                    <CarouselControls>
                        <button onClick={handlePrev} disabled={slideIndex === 0}>
                            <FaChevronLeft /> Prev
                        </button>
                        {slideIndex === slides.length - 1 ? (
                            <button onClick={handleSave}>Save</button>
                        ) : (
                            <button onClick={handleNext}>
                                Next <FaChevronRight />
                            </button>
                        )}
                    </CarouselControls>
                </DialogContent>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
