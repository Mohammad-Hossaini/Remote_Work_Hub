import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";
import styled from "styled-components";
import { useAuth } from "../hook/AuthContext";
import { createJob } from "../services/apiAllJobs";
import Spinner from "./Spinner";

// ===== Styled Components =====
const DialogOverlay = styled(RadixDialog.Overlay)`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
`;

const DialogContent = styled(RadixDialog.Content)`
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 600px;
    height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Body = styled.div`
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
        font-weight: 600;
        font-size: 1.4rem;
    }

    input,
    select,
    textarea {
        padding: 0.8rem;
        border-radius: 0.5rem;
        border: 1px solid #ced4da;
        font-size: 1.4rem;
        width: 100%;
    }

    textarea {
        min-height: 6rem;
        resize: vertical;
    }
`;

const Header = styled.div`
    position: relative;
    padding: 2rem;
    border-bottom: 1px solid #ced4da;
    flex-shrink: 0;

    h2 {
        font-size: 1.8rem;
        font-weight: 600;
    }
`;

const Footer = styled.div`
    flex-shrink: 0;
    padding: 1.5rem 2rem;
    border-top: 1px solid #ced4da;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        padding: 0.8rem 1.5rem;
        font-size: 1.4rem;
        border-radius: var(--radius-lg);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-width: 100px;
        font-weight: 600;
    }

    .cancel {
        background-color: var(--color-grey-200);
        color: var(--color-grey-700);

        &:hover {
            background-color: var(--color-grey-300);
        }
    }

    .save {
        background-color: var(--color-primary);
        color: #fff;

        &:hover {
            background-color: var(--color-primary-dark);
        }
    }
`;

const IconButton = styled.button`
    all: unset;
    position: absolute;
    top: 1rem;
    right: 1rem;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const StyledWarning = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.4rem;
    color: #b91c1c;
`;

export default function JobModal({ open, onOpenChange }) {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const mutation = useMutation({
        mutationFn: createJob,
        onSuccess: () => {
            queryClient.invalidateQueries(["jobs"]);
            toast.success("Job created successfully ✅");
            reset();
            onOpenChange(false);
        },
        onError: (err) => {
            console.error(err);
            toast.error(err.message || "Failed to create job ❌");
        },
    });

    const onSubmit = (data) => {
        const jobData = {
            company_id: user?.data?.user?.company?.id,
            title: data.title,
            description: data.description,
            requirements: data.requirements || "",
            salary_min: parseInt(data.salary_min),
            salary_max: parseInt(data.salary_max),
            job_type: data.job_type,
            location: data.location,
            status: data.status || "draft",
            deadline: data.deadline || null,
        };
        mutation.mutate(jobData);
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            <RadixDialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <Header>
                        <h2>Add New Job</h2>
                        <RadixDialog.Close asChild>
                            <IconButton aria-label="Close">
                                <Cross2Icon
                                    style={{ width: "32px", height: "32px" }}
                                />
                            </IconButton>
                        </RadixDialog.Close>
                    </Header>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: "1 1 auto",
                            minHeight: 0,
                        }}
                    >
                        <Body>
                            <label>Title</label>
                            <input
                                {...register("title", {
                                    required: "Title is required",
                                })}
                            />
                            {errors.title && (
                                <StyledWarning>
                                    <CiWarning /> {errors.title.message}
                                </StyledWarning>
                            )}

                            <label>Description</label>
                            <textarea
                                rows={4}
                                {...register("description", {
                                    required: "Description is required",
                                })}
                            />
                            {errors.description && (
                                <StyledWarning>
                                    <CiWarning /> {errors.description.message}
                                </StyledWarning>
                            )}

                            <label>Requirements</label>
                            <textarea rows={3} {...register("requirements")} />

                            <label>Salary Min</label>
                            <input
                                type="number"
                                {...register("salary_min", {
                                    required: "Salary min required",
                                })}
                            />
                            {errors.salary_min && (
                                <StyledWarning>
                                    <CiWarning /> {errors.salary_min.message}
                                </StyledWarning>
                            )}

                            <label>Salary Max</label>
                            <input
                                type="number"
                                {...register("salary_max", {
                                    required: "Salary max required",
                                })}
                            />
                            {errors.salary_max && (
                                <StyledWarning>
                                    <CiWarning /> {errors.salary_max.message}
                                </StyledWarning>
                            )}

                            <label>Job Type</label>
                            <select
                                {...register("job_type", {
                                    required: "Job type is required",
                                })}
                            >
                                <option value="">-- Select Type --</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                                <option value="remote">Remote</option>
                            </select>
                            {errors.job_type && (
                                <StyledWarning>
                                    <CiWarning /> {errors.job_type.message}
                                </StyledWarning>
                            )}

                            <label>Location</label>
                            <input
                                {...register("location", {
                                    required: "Location is required",
                                })}
                            />
                            {errors.location && (
                                <StyledWarning>
                                    <CiWarning /> {errors.location.message}
                                </StyledWarning>
                            )}

                            <label>Status</label>
                            <select {...register("status")}>
                                <option value="draft">Draft</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>

                            <label>Deadline</label>
                            <input
                                type="date"
                                min={today}
                                {...register("deadline")}
                            />
                        </Body>
                        <Footer>
                            <button
                                type="button"
                                className="cancel"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="save"
                                disabled={mutation.isLoading}
                            >
                                {mutation.isLoading ? (
                                    <Spinner size="18px" color="#fff" />
                                ) : (
                                    "Save Job"
                                )}
                            </button>
                        </Footer>
                    </form>
                </DialogContent>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
