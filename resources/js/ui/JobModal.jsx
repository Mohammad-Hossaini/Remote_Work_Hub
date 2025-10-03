import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";
import styled from "styled-components";
import { useAuth } from "../hook/AuthContext";
import { createJob } from "../services/apiAllJobs";

// Styled components
const DialogOverlay = styled(RadixDialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
`;

const DialogContent = styled(RadixDialog.Content)`
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 600px;
    max-height: 90vh;
    padding: 25px;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const DialogTitle = styled(RadixDialog.Title)`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111;
`;

const StyledWarning = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.4rem;
    font-size: 1.4rem;
    color: #b91c1c;
`;

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
    background-color: white;
`;

const Textarea = styled.textarea`
    padding: 8px 10px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid ${(props) => (props.error ? "red" : "#ccc")};
    resize: vertical;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
`;

const Button = styled.button`
    all: unset;
    cursor: pointer;
    padding: 8px 15px;
    border-radius: 4px;
    background-color: #22c55e;
    color: white;
    font-weight: 500;

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
    cursor: pointer;
`;

export default function JobModal({ open, onOpenChange }) {
    const { user } = useAuth();
    // console.log("compnay data :", user?.data?.user?.company?.id);
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

    // تاریخ امروز برای validation deadline
    const today = new Date().toISOString().split("T")[0];

    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            <RadixDialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <DialogTitle>Add New Job</DialogTitle>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Company ID */}
                        {/* <Fieldset>
                            <Label>Company ID</Label>
                            <Input type="number" {...register("company_id")} />
                            {errors.company_id && (
                                <StyledWarning>
                                    <CiWarning /> {errors.company_id.message}
                                </StyledWarning>
                            )}
                        </Fieldset> */}

                        {/* Title */}
                        <Fieldset>
                            <Label>Title</Label>
                            <Input
                                {...register("title", {
                                    required: "Title is required",
                                })}
                            />
                            {errors.title && (
                                <StyledWarning>
                                    <CiWarning /> {errors.title.message}
                                </StyledWarning>
                            )}
                        </Fieldset>

                        {/* Description */}
                        <Fieldset>
                            <Label>Description</Label>
                            <Textarea
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
                        </Fieldset>

                        {/* Requirements */}
                        <Fieldset>
                            <Label>Requirements</Label>
                            <Textarea rows={3} {...register("requirements")} />
                        </Fieldset>

                        {/* Salary Min */}
                        <Fieldset>
                            <Label>Salary Min</Label>
                            <Input
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
                        </Fieldset>

                        {/* Salary Max */}
                        <Fieldset>
                            <Label>Salary Max</Label>
                            <Input
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
                        </Fieldset>

                        {/* Job Type */}
                        <Fieldset>
                            <Label>Job Type</Label>
                            <Select
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
                            </Select>
                            {errors.job_type && (
                                <StyledWarning>
                                    <CiWarning /> {errors.job_type.message}
                                </StyledWarning>
                            )}
                        </Fieldset>

                        {/* Location */}
                        <Fieldset>
                            <Label>Location</Label>
                            <Input
                                {...register("location", {
                                    required: "Location is required",
                                })}
                            />
                            {errors.location && (
                                <StyledWarning>
                                    <CiWarning /> {errors.location.message}
                                </StyledWarning>
                            )}
                        </Fieldset>

                        {/* Status */}
                        <Fieldset>
                            <Label>Status</Label>
                            <Select {...register("status")}>
                                <option value="draft">Draft</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </Select>
                        </Fieldset>

                        {/* Deadline */}
                        <Fieldset>
                            <Label>Deadline</Label>
                            <Input
                                type="date"
                                min={today} // 👈 فقط تاریخ‌های بعد از امروز
                                {...register("deadline")}
                            />
                        </Fieldset>

                        {/* Submit */}
                        <ButtonContainer>
                            <Button type="submit">
                                {mutation.isLoading ? "Saving..." : "Save Job"}
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
