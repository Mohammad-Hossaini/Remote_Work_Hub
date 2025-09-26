// // CreateAccountPage.jsx
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { TiWarningOutline } from "react-icons/ti";
// import styled from "styled-components";
// import { createNewUser } from "../services/apiUsers";
// import Footer from "./Footer";
// import JobsHeader from "./JobsHeader";

// /* Page Wrapper */
// const PageWrapper = styled.div`
//     display: flex;
//     justify-content: center;
//     padding: 5rem 2rem 5rem;
//     background-color: var(--color-grey-30);
// `;

// /* Card */
// const Card = styled.div`
//     background-color: var(--color-grey-0);
//     padding: 3rem 3rem;
//     border-radius: var(--radius-md);
//     box-shadow: var(--shadow-md);
//     width: 50rem;
//     max-width: 95%;
//     height: 48rem;
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
// `;

// /* Title */
// const Title = styled.h2`
//     font-size: 2.4rem;
//     font-weight: 700;
//     text-align: center;
//     color: var(--color-grey-900);
// `;

// /* Input Group */
// const InputGroup = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 0.3rem;
//     margin-bottom: 1rem;
// `;

// /* Label */
// const Label = styled.label`
//     font-weight: 600;
//     font-size: 1.2rem;
//     color: var(--color-grey-900);
// `;

// /* Input */
// const Input = styled.input`
//     padding: 1rem 1.4rem;
//     font-size: 1.1rem;
//     border: 1px solid var(--color-grey-300);
//     border-radius: var(--radius-sm);
//     outline: none;
//     &:focus {
//         border-color: var(--color-primary);
//     }
// `;

// /* Select */
// const Select = styled.select`
//     padding: 1rem 1.4rem;
//     font-size: 1.1rem;
//     border: 1px solid var(--color-grey-300);
//     border-radius: var(--radius-sm);
//     outline: none;
//     background-color: #fff;
//     &:focus {
//         border-color: var(--color-primary);
//     }
// `;

// /* Buttons */
// const StyledButtons = styled.div`
//     display: flex;
//     justify-content: space-between;
//     margin-top: 2rem;
// `;

// const RegisterButton = styled.button`
//     background-color: var(--color-primary);
//     color: #fff;
//     padding: 1rem 2rem;
//     border-radius: var(--radius-xxl);
//     font-weight: 500;
//     font-size: 1.1rem;
//     cursor: pointer;
//     border: none;
//     transition: 0.2s ease;
//     &:hover {
//         background-color: var(--color-primary-dark);
//     }
//     &:disabled {
//         opacity: 0.6;
//         cursor: not-allowed;
//     }
// `;

// const CancelButton = styled.button`
//     background-color: var(--color-grey-200);
//     color: var(--color-grey-700);
//     padding: 1rem 2rem;
//     border-radius: var(--radius-xxl);
//     font-weight: 500;
//     font-size: 1.1rem;
//     cursor: pointer;
//     border: none;
//     transition: 0.2s ease;
//     &:hover {
//         background-color: var(--color-grey-300);
//     }
// `;

// /* Error Message */
// const ErrorMessage = styled.span`
//     display: flex;
//     align-items: center;
//     gap: 0.4rem;
//     color: var(--color-error);
//     font-size: 1rem;
//     margin-top: 0.3rem;
// `;

// export default function CreateAccountPage() {
//     const {
//         handleSubmit,
//         reset,
//         register,
//         watch,
//         formState: { errors },
//     } = useForm();

//     const password = watch("password");

//     const queryClient = useQueryClient();
//     const { mutate, isLoading: isCreating } = useMutation({
//         mutationFn: createNewUser,
//         onSuccess: () => {
//             toast.success("You have registered successfully");
//             queryClient.invalidateQueries({ queryKey: ["users"] });
//             reset();
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const onSubmit = (data, e) => {
//         e.preventDefault();
//         mutate(data);
//     };

//     return (
//         <>
//             <JobsHeader />
//             <PageWrapper>
//                 <Card>
//                     <Title>Create an Account</Title>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         {/* Name */}
//                         <InputGroup>
//                             <Label>Name</Label>
//                             <Input
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 {...register("name", {
//                                     required: "This field is required",
//                                 })}
//                             />
//                             {errors.name && (
//                                 <ErrorMessage>
//                                     <TiWarningOutline /> {errors.name.message}
//                                 </ErrorMessage>
//                             )}
//                         </InputGroup>

//                         {/* Email */}
//                         <InputGroup>
//                             <Label>Email</Label>
//                             <Input
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 {...register("email", {
//                                     required: "This field is required",
//                                 })}
//                             />
//                             {errors.email && (
//                                 <ErrorMessage>
//                                     <TiWarningOutline /> {errors.email.message}
//                                 </ErrorMessage>
//                             )}
//                         </InputGroup>

//                         {/* Password */}
//                         <InputGroup>
//                             <Label>Password</Label>
//                             <Input
//                                 type="password"
//                                 placeholder="Enter your password"
//                                 {...register("password", {
//                                     required: "This field is required",
//                                 })}
//                             />
//                             {errors.password && (
//                                 <ErrorMessage>
//                                     <TiWarningOutline />{" "}
//                                     {errors.password.message}
//                                 </ErrorMessage>
//                             )}
//                         </InputGroup>

//                         {/* Confirm Password */}
//                         <InputGroup>
//                             <Label>Confirm Password</Label>
//                             <Input
//                                 type="password"
//                                 placeholder="Confirm your password"
//                                 {...register("confirmPassword", {
//                                     required: "This field is required",
//                                     validate: (value) =>
//                                         value === password ||
//                                         "Passwords do not match",
//                                 })}
//                             />
//                             {errors.confirmPassword && (
//                                 <ErrorMessage>
//                                     <TiWarningOutline />{" "}
//                                     {errors.confirmPassword.message}
//                                 </ErrorMessage>
//                             )}
//                         </InputGroup>

//                         {/* Role */}
//                         <InputGroup>
//                             <Label>Role</Label>
//                             <Select
//                                 {...register("role", {
//                                     required: "Role is required",
//                                 })}
//                             >
//                                 <option value="">Select Role</option>
//                                 <option value="admin">Admin</option>
//                                 <option value="employer">Employer</option>
//                                 <option value="job_seeker">Job Seeker</option>
//                             </Select>
//                             {errors.role && (
//                                 <ErrorMessage>
//                                     <TiWarningOutline /> {errors.role.message}
//                                 </ErrorMessage>
//                             )}
//                         </InputGroup>

//                         <StyledButtons>
//                             <CancelButton type="reset">Cancel</CancelButton>
//                             <RegisterButton type="submit" disabled={isCreating}>
//                                 SIGN UP
//                             </RegisterButton>
//                         </StyledButtons>
//                     </form>
//                 </Card>
//             </PageWrapper>
//             <Footer />
//         </>
//     );
// }

// CreateAccountPage.jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TiWarningOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createNewUser } from "../services/apiUsers";
import Footer from "./Footer";
import JobsHeader from "./JobsHeader";

/* Page Wrapper */
const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 5rem 2rem 5rem;
    background-color: var(--color-grey-30);
`;

/* Card */
const Card = styled.div`
    background-color: var(--color-grey-0);
    padding: 3rem 3rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    width: 50rem;
    max-width: 95%;
    height: 48rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

/* Title */
const Title = styled.h2`
    font-size: 2.4rem;
    font-weight: 700;
    text-align: center;
    color: var(--color-grey-900);
`;

/* Input Group */
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-bottom: 1rem;
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

/* Select */
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

/* Buttons */
const StyledButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
`;

const RegisterButton = styled.button`
    background-color: var(--color-primary);
    color: #fff;
    padding: 1rem 2rem;
    border-radius: var(--radius-xxl);
    font-weight: 500;
    font-size: 1.1rem;
    cursor: pointer;
    border: none;
    transition: 0.2s ease;
    &:hover {
        background-color: var(--color-primary-dark);
    }
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const CancelButton = styled.button`
    background-color: var(--color-grey-200);
    color: var(--color-grey-700);
    padding: 1rem 2rem;
    border-radius: var(--radius-xxl);
    font-weight: 500;
    font-size: 1.1rem;
    cursor: pointer;
    border: none;
    transition: 0.2s ease;
    &:hover {
        background-color: var(--color-grey-300);
    }
`;

/* Error Message */
const ErrorMessage = styled.span`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--color-error);
    font-size: 1rem;
    margin-top: 0.3rem;
`;

export default function CreateAccountPage() {
    const {
        handleSubmit,
        reset,
        register,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const password = watch("password");

    const queryClient = useQueryClient();
    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createNewUser,
        // onSuccess: (data) => {
        //     toast.success("You have registered successfully");
        //     queryClient.invalidateQueries({ queryKey: ["users"] });
        //     reset();

        //     // Navigate based on role after registration
        //     if (data.user.role === "employer") navigate("/employerApp");
        //     else if (data.user.role === "job_seeker") navigate("/app");
        //     else navigate("/"); // fallback
        // },
        onSuccess: (data) => {
            toast.success("You have registered successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            reset();

            // Save both user and token to sessionStorage
            sessionStorage.setItem(
                "authUser",
                JSON.stringify({
                    ...data.user,
                    token: data.token, // <- make sure token exists here
                })
            );

            // Navigate based on role
            if (data.user.role === "employer") navigate("/employerApp");
            else if (data.user.role === "job_seeker") navigate("/app");
            else navigate("/"); // fallback
        },

        onError: (err) => toast.error(err.message),
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        mutate(data);
    };

    return (
        <>
            <JobsHeader />
            <PageWrapper>
                <Card>
                    <Title>Create an Account</Title>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <InputGroup>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter your name"
                                {...register("name", {
                                    required: "This field is required",
                                })}
                            />
                            {errors.name && (
                                <ErrorMessage>
                                    <TiWarningOutline /> {errors.name.message}
                                </ErrorMessage>
                            )}
                        </InputGroup>

                        {/* Email */}
                        <InputGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "This field is required",
                                })}
                            />
                            {errors.email && (
                                <ErrorMessage>
                                    <TiWarningOutline /> {errors.email.message}
                                </ErrorMessage>
                            )}
                        </InputGroup>

                        {/* Password */}
                        <InputGroup>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "This field is required",
                                })}
                            />
                            {errors.password && (
                                <ErrorMessage>
                                    <TiWarningOutline />{" "}
                                    {errors.password.message}
                                </ErrorMessage>
                            )}
                        </InputGroup>

                        {/* Confirm Password */}
                        <InputGroup>
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                placeholder="Confirm your password"
                                {...register("confirmPassword", {
                                    required: "This field is required",
                                    validate: (value) =>
                                        value === password ||
                                        "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <ErrorMessage>
                                    <TiWarningOutline />{" "}
                                    {errors.confirmPassword.message}
                                </ErrorMessage>
                            )}
                        </InputGroup>

                        {/* Role */}
                        <InputGroup>
                            <Label>Role</Label>
                            <Select
                                {...register("role", {
                                    required: "Role is required",
                                })}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="employer">Employer</option>
                                <option value="job_seeker">Job Seeker</option>
                            </Select>
                            {errors.role && (
                                <ErrorMessage>
                                    <TiWarningOutline /> {errors.role.message}
                                </ErrorMessage>
                            )}
                        </InputGroup>

                        <StyledButtons>
                            <CancelButton type="reset">Cancel</CancelButton>
                            <RegisterButton type="submit" disabled={isCreating}>
                                {isCreating ? "Registering..." : "SIGN UP"}
                            </RegisterButton>
                        </StyledButtons>
                    </form>
                </Card>
            </PageWrapper>
            <Footer />
        </>
    );
}
