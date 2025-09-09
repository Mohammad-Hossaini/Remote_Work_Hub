import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import styled from "styled-components";

import { createJob } from "../services/apiAllJobs";

// Overlay
const DialogOverlay = styled(RadixDialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
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
      reset();
      onOpenChange(false);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onSubmit = (data) => {
    const jobData = {
      ...data,
      skills: data.skills.split(",").map((s) => s.trim()),
    };
    mutation.mutate(jobData);
  };

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Add New Job</DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset>
              <Label>Title</Label>
              <Input
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <StyledWarning>
                  <CiWarning /> {errors.title.message}
                </StyledWarning>
              )}
            </Fieldset>

            <Fieldset>
              <Label>Position</Label>
              <Input
                {...register("position", { required: "Position is required" })}
              />
              {errors.position && (
                <StyledWarning>
                  <CiWarning /> {errors.position.message}
                </StyledWarning>
              )}
            </Fieldset>

            <Fieldset>
              <Label>Location</Label>
              <Input
                {...register("location", { required: "Location is required" })}
              />
            </Fieldset>

            <Fieldset>
              <Label>Type</Label>
              <Input
                {...register("type")}
                placeholder="Full Time / Part Time"
              />
            </Fieldset>

            <Fieldset>
              <Label>Experience</Label>
              <Input {...register("experience")} placeholder="e.g. 2+ years" />
            </Fieldset>

            <Fieldset>
              <Label>Company Name</Label>
              <Input {...register("companyName")} />
            </Fieldset>

            <Fieldset>
              <Label>Company Logo (URL)</Label>
              <Input {...register("companyLogo")} />
            </Fieldset>

            <Fieldset>
              <Label>Salary</Label>
              <Input {...register("salary")} />
            </Fieldset>

            <Fieldset>
              <Label>Job Summary</Label>
              <Textarea rows={3} {...register("jobSummary")} />
            </Fieldset>

            <Fieldset>
              <Label>Qualification</Label>
              <Textarea rows={3} {...register("qualification")} />
            </Fieldset>

            <Fieldset>
              <Label>Skills (comma separated)</Label>
              <Input {...register("skills")} placeholder="CSS, HTML, C++" />
            </Fieldset>

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
