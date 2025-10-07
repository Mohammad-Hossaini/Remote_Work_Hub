import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";
import styled, { keyframes } from "styled-components";
import { applyForJob } from "../services/application";

// ==== Animations ====
const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

// ==== Styled Components ====
const DialogOverlay = styled(RadixDialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.55);
    position: fixed;
    inset: 0;
    backdrop-filter: blur(2px);
`;

const DialogContent = styled(RadixDialog.Content)`
    background-color: #ffffff;
    border-radius: 14px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 92vw;
    max-width: 520px;
    padding: 30px 28px;
    animation: ${fadeIn} 0.25s ease-out;
`;

const DialogTitle = styled(RadixDialog.Title)`
    font-size: 20px;
    font-weight: 600;
    color: #111;
`;

const DialogDescription = styled(RadixDialog.Description)`
    margin: 8px 0 22px;
    font-size: 15px;
    color: #555;
`;

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 18px;
    border: none;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #333;
`;

const Input = styled.input`
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 6px;
    border: 1.6px solid ${(props) => (props.error ? "#ef4444" : "#d1d5db")};
    transition: all 0.2s ease;
    background-color: #fff;

    &:hover {
        border-color: #9ca3af;
    }
    &:focus {
        outline: none;
        border-color: #16a34a;
        box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.2);
    }
`;

const Textarea = styled.textarea`
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 6px;
    border: 1.6px solid ${(props) => (props.error ? "#ef4444" : "#d1d5db")};
    resize: vertical;
    min-height: 110px;
    transition: all 0.2s ease;

    &:hover {
        border-color: #9ca3af;
    }
    &:focus {
        outline: none;
        border-color: #16a34a;
        box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.2);
    }
`;

const StyledWarning = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.35rem;
    font-size: 1.35rem;
    color: #b91c1c;

    svg {
        font-size: 1.5rem;
        flex-shrink: 0;
    }
`;

const FileName = styled.span`
    font-size: 13px;
    color: #444;
    margin-top: 4px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 25px;
`;

const Button = styled.button`
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 15px;
    font-weight: 500;
    height: 42px;
    background-color: #16a34a;
    color: white;
    transition: all 0.25s ease;

    &:hover {
        background-color: #15803d;
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.65;
        cursor: not-allowed;
    }
`;

const IconButton = styled.button`
    all: unset;
    position: absolute;
    top: 12px;
    right: 12px;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
    color: #111;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #e5e7eb;
    }
`;

// ==== Main Component ====
export default function JobApplyDialog({ open, onOpenChange, jobId }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const [fileName, setFileName] = useState("");
    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append("cover_letter", values.cover_letter);
            if (values.resume_path[0]) {
                formData.append("resume_path", values.resume_path[0]);
            }

            const response = await applyForJob(jobId, formData);
            console.log("✅ Applied successfully:", response);
            toast.success("Application submitted successfully!");
            reset();
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    };

    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            <RadixDialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <DialogTitle>Apply for Job</DialogTitle>
                    <DialogDescription>
                        Please upload your resume and write a short cover
                        letter.
                    </DialogDescription>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Cover Letter */}
                        <Fieldset>
                            <Label htmlFor="cover_letter">Cover Letter</Label>
                            <Textarea
                                id="cover_letter"
                                placeholder="Write a short cover letter..."
                                {...register("cover_letter")}
                                error={errors.cover_letter}
                            />
                        </Fieldset>

                        {/* Resume Upload */}
                        <Fieldset>
                            <Label htmlFor="resume_path">
                                Upload Resume (PDF/DOC)
                            </Label>
                            <Input
                                id="resume_path"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                {...register("resume_path", {
                                    required: "Please upload your resume",
                                    onChange: (e) =>
                                        setFileName(
                                            e.target.files[0]?.name || ""
                                        ),
                                })}
                                error={errors.resume_path}
                            />
                            {fileName && <FileName>📄 {fileName}</FileName>}
                            {errors.resume_path && (
                                <StyledWarning>
                                    <CiWarning />
                                    <span>{errors.resume_path.message}</span>
                                </StyledWarning>
                            )}
                        </Fieldset>

                        <ButtonContainer>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Submit Application"}
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
