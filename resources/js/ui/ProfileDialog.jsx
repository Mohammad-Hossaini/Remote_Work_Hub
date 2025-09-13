import * as RadixDialog from "@radix-ui/react-dialog";
import { toast } from "react-hot-toast";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hook/AuthContext";
import UpdateProfileDialog from "./UpdateProfileDialog";

const DialogOverlay = styled(RadixDialog.Overlay)`
    background: transparent;
    position: fixed;
    inset: 0;
`;

const DialogContent = styled(RadixDialog.Content)`
    position: absolute;
    top: 60px;
    right: 2.5rem;
    width: 24rem;
    max-width: 95vw;
    border: 1px solid var(--color-grey-200);
    background-color: var(--color-grey-0);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    padding: var(--space-24);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-16);
    z-index: 1000;
`;

const ProfileImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-bottom: var(--space-12);
    border-bottom: 1px solid var(--color-grey-200);
`;

const ProfileImage = styled.img`
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    border: 2px solid var(--color-grey-300);
    object-fit: cover;
`;

const Description = styled.p`
    text-align: center;
    font-size: var(--font-sm);
    color: var(--color-grey-700);
    margin-top: var(--space-12);
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: var(--space-8);
    margin-top: var(--space-12);
    width: 100%;
`;

const BaseButton = styled(Link)`
    flex: 1;
    text-align: center;
    padding: 0.6rem 0;
    border-radius: var(--radius-xxl);
    font-size: var(--font-sm);
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PrimaryButton = styled(BaseButton)`
    background-color: var(--color-primary);
    color: #fff;

    &:hover {
        background-color: var(--color-primary-dark);
    }
`;

const OutlineButton = styled(BaseButton)`
    border: 1px solid var(--color-primary);
    background-color: transparent;
    color: var(--color-primary);

    &:hover {
        background-color: var(--color-primary-light);
        color: #fff;
    }
`;

const LogoutButton = styled.button`
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.6rem 0;
    border-radius: var(--radius-xxl);
    font-size: var(--font-sm);
    font-weight: 500;
    border: 1px solid var(--color-error);
    background-color: transparent;
    color: var(--color-error);
    margin-top: var(--space-12);
    transition: all 0.2s ease;

    &:hover {
        background-color: var(--color-error);
        color: #fff;
    }
`;

export default function ProfileDialog({ children }) {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("authUser"));
    const role = currentUser?.role || "jobseeker";
    const basePath = role === "employer" ? "/employerApp" : "/app";
    const profilePath = `${basePath}/profile`;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("authUser");
        toast.success("Logged out successfully!");
        navigate("/");
    };

    const handleUserUpdate = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("authUser", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully!"); // only one toast
    };

    return (
        <RadixDialog.Root>
            <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
            <RadixDialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <ProfileImageWrapper>
                        <ProfileImage
                            src={user?.profilePhoto || "/profile/default.jpg"}
                            alt="Profile"
                        />
                    </ProfileImageWrapper>

                    <Description>
                        {user?.description || "No description available."}
                    </Description>

                    <ButtonContainer>
                        <PrimaryButton to={profilePath}>
                            View Profile
                        </PrimaryButton>

                        <UpdateProfileDialog
                            trigger={
                                <OutlineButton asChild>Settings</OutlineButton>
                            }
                            user={user}
                            onUpdate={handleUserUpdate}
                        />
                    </ButtonContainer>

                    <LogoutButton onClick={handleLogout}>
                        <MdOutlineLogout />
                        Logout
                    </LogoutButton>
                </DialogContent>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
