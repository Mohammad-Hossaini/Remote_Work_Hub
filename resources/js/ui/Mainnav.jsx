import { BsBriefcase } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineHeart } from "react-icons/hi";
import { IoFolderOpenOutline } from "react-icons/io5";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { TbMessage2Share } from "react-icons/tb";

import { HiOutlineCheckCircle, HiOutlineHome } from "react-icons/hi2";

import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    border-top: 1px solid var(--color-grey-100);
    padding-top: 2rem;
`;

const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        color: var(--color-grey-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
    }

    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-grey-800);
        background-color: var(--color-grey-30);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;

function MainNav({ children, role = "jobseeker" }) {
    const navigate = useNavigate();
    const profilePath =
        role === "employer" ? "/employerApp/profile" : "/app/profile";
    return (
        <nav>
            <NavList>
                <li>
                    <StyledNavLink to="/app/jobSeekerDashboard">
                        <HiOutlineHome />
                        <span>Home</span>
                    </StyledNavLink>
                </li>

                <li>
                    <StyledNavLink to="/app/allJobs">
                        <BsBriefcase />
                        <span>All Jobs</span>
                    </StyledNavLink>
                </li>

                <li>
                    <StyledNavLink to="/app/savedJobs">
                        <HiOutlineHeart />
                        <span>Favorite Jobs</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/app/appliedJobs">
                        <HiOutlineCheckCircle />
                        <span>Applied Jobs</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/app/sugessteddJobs">
                        <MdOutlineBookmarkAdded />
                        <span>Sugessted Jobs</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/app/application">
                        <IoFolderOpenOutline />
                        <span>Application</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/app/messages">
                        <TbMessage2Share />
                        <span>Messages</span>
                    </StyledNavLink>
                </li>

                <li>
                    <StyledNavLink to={profilePath}>
                        <FaRegUser />
                        <span>Profile</span>
                    </StyledNavLink>
                </li>
            </NavList>
        </nav>
    );
}

export default MainNav;
