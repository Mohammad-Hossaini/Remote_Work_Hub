import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TiWarningOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../services/apiUsers";
import Footer from "./Footer";
import JobsHeader from "./JobsHeader";

import "./CreateAccountPage.css";

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
        onSuccess: (data) => {
            toast.success("You have registered successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            reset();

            // Save both user and token to sessionStorage
            sessionStorage.setItem(
                "authUser",
                JSON.stringify({
                    ...data.user,
                    token: data.token,
                })
            );

            // Navigate based on role
            if (data.user.role === "employer") navigate("/employerApp");
            else if (data.user.role === "job_seeker") navigate("/app");
            else navigate("/");
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
            <div className="pageWrapper">
                <div className="card">
                    <h2 className="title">Create an Account</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="inputGroup">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="input"
                                {...register("name", {
                                    required: "This field is required",
                                })}
                            />
                            {errors.name && (
                                <span className="errorMessage">
                                    <TiWarningOutline /> {errors.name.message}
                                </span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="inputGroup">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input"
                                {...register("email", {
                                    required: "This field is required",
                                })}
                            />
                            {errors.email && (
                                <span className="errorMessage">
                                    <TiWarningOutline /> {errors.email.message}
                                </span>
                            )}
                        </div>

                        {/* Password */}
                        <div className="inputGroup">
                            <label className="label">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input"
                                {...register("password", {
                                    required: "This field is required",
                                })}
                            />
                            {errors.password && (
                                <span className="errorMessage">
                                    <TiWarningOutline />{" "}
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="inputGroup">
                            <label className="label">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                className="input"
                                {...register("confirmPassword", {
                                    required: "This field is required",
                                    validate: (value) =>
                                        value === password ||
                                        "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <span className="errorMessage">
                                    <TiWarningOutline />{" "}
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>

                        {/* Role */}
                        <div className="inputGroup">
                            <label className="label">Role</label>
                            <select
                                className="select"
                                {...register("role", {
                                    required: "Role is required",
                                })}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="employer">Employer</option>
                                <option value="job_seeker">Job Seeker</option>
                            </select>
                            {errors.role && (
                                <span className="errorMessage">
                                    <TiWarningOutline /> {errors.role.message}
                                </span>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="styledButtons">
                            <button type="reset" className="cancelButton">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="registerButton"
                                disabled={isCreating}
                            >
                                {isCreating ? "Registering..." : "SIGN UP"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
