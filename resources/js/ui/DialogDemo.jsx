
// components/DialogDemo.jsx
import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { storeApplicant } from "../services/apiStoreApplicants";
import { useAuth } from "../hook/AuthContext";

// ... (styled components همان‌هایی که شما گذاشته‌اید)

export default function DialogDemo({ open, onOpenChange, jobId }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitError, setSubmitError] = useState(null);

  const mutation = useMutation({
    mutationFn: (payload) => storeApplicant(payload),
    onSuccess: () => {
      reset();
      onOpenChange(false);
      toast.success("Application submitted successfully!");
      // رفرش لیست وظایف اپلای شده فقط برای همین کاربر
      queryClient.invalidateQueries(["appliedJobs", user?.id]);
    },
    onError: (err) => {
      setSubmitError(err.message || "Failed to submit application");
      toast.error(err.message || "Failed to submit application");
    },
  });

  const onSubmit = (formData) => {
    setSubmitError(null);

    if (!user?.id) {
      setSubmitError("You must be logged in to apply.");
      toast.error("Please login first.");
      return;
    }
    if (!jobId) {
      setSubmitError("Job id not found.");
      return;
    }

    const payload = {
      userId: String(user.id),
      jobId: String(jobId),
      appliedAt: new Date().toISOString(),
      status: "Under Review",
      form: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        countryCode: formData.countryCode,
      },
    };

    mutation.mutate(payload);
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
                {...register("countryCode", { required: "Country code is required" })}
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
                {...register("mobile", { required: "Mobile number is required" })}
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
              <Button color="green" type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Submitting..." : "Submit Application"}
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
