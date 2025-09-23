import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiMiniHeart } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../../hook/AuthContext";
import { getJobs } from "../../../services/apiAllJobs";
import {
    deleteSavedJob,
    getSavedJobsByUser,
    putSavedJobs,
} from "../../../services/apiGetSavedJobs";
import Button from "../../../ui/Button";
import Footer from "../../Footer";
import JobsHeader from "../../JobsHeader";

// ================= Styled Components =================
const AllJobsWrapper = styled.div`
    background-color: #f8f9fa;
    min-height: 100vh;
`;

const JobsContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
`;

const JobList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding-top: 1rem;
    padding-right: 1.6rem;
`;

const JobsCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: var(--color-grey-0);
    padding: 1.6rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-grey-300);
    max-width: 100%;
    margin: 0 auto 1.6rem;
    gap: 1.6rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;

    &:hover {
        transform: translateX(10px);
        box-shadow: var(--shadow-sm);

        .hover-buttons {
            opacity: 1;
            pointer-events: auto;
        }
    }
`;

const JobLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;
`;

const JobImg = styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: var(--radius-md);
`;

const JobText = styled.div`
    display: flex;
    flex-direction: column;
`;

const JobTitle = styled.h3`
    font-size: var(--font-lg);
    font-weight: 600;
    color: var(--color-grey-900);
    margin-bottom: var(--space-4);
`;

const JobPosition = styled.p`
    font-size: var(--font-base);
    font-weight: 500;
    color: var(--color-grey-700);
`;

const JobInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-12);
    margin-top: var(--space-8);
    font-size: var(--font-sm);
    color: var(--color-grey-500);
`;

const ImportantInfo = styled.span`
    font-weight: 600;
    color: var(--color-primary-dark);
`;

const CompanyName = styled.span`
    font-weight: 700;
    color: var(--color-grey-900);
`;

const Salary = styled.span`
    font-weight: 600;
    color: var(--color-success);
`;

const Location = styled.span`
    font-weight: 600;
    color: var(--color-grey-700);
`;

const PostedAt = styled.span`
    font-size: var(--font-xs);
    color: var(--color-grey-400);
`;

const StyledLinkButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    position: absolute;
    top: 50%;
    right: 1.6rem;
    transform: translateY(-50%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
`;

const HeartIcon = styled(HiMiniHeart)`
    cursor: pointer;
    font-size: 2rem;
    color: ${(props) => (props.active ? "#2b8a3e" : "var(--color-grey-400)")};
    transition: color 0.2s ease;
    position: absolute;
    top: 1rem;
    right: 1rem;
    &:hover {
        color: #2b8a3e;
    }
`;

// ================= Modal =================
const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ModalContent = styled.div`
    background: #fff;
    padding: 2rem;
    border-radius: var(--radius-lg);
    max-width: 500px;
    width: 90%;
    text-align: center;
`;

const ModalTitle = styled.h2`
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1rem;
`;

const ModalDescription = styled.p`
    font-size: 1.4rem;
    color: var(--color-grey-700);
    margin-bottom: 2rem;
`;

const ModalButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

// ================= Main Component =================
export default function AllJobs() {
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [levelFilter, setLevelFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [educationFilter, setEducationFilter] = useState("");
    const [companyFilter, setCompanyFilter] = useState("");
    const [salaryFilter, setSalaryFilter] = useState("");
    const [sortOption, setSortOption] = useState("date");
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [modalData, setModalData] = useState(null);

    const queryClient = useQueryClient();
    const { user } = useAuth();
    const location = useLocation();

    const {
        data: jobs = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["jobs"],
        queryFn: getJobs,
    });

    useEffect(() => {
        if (!user?.id) return;
        getSavedJobsByUser(user.id)
            .then((saved) => setSavedJobIds(saved.map((s) => s.jobId)))
            .catch(console.error);
    }, [user]);

    const saveJobMutation = useMutation({
        mutationFn: putSavedJobs,
        onSuccess: (data, variables) => {
            setSavedJobIds((prev) => [...prev, variables.id]);
            toast.success("Job saved successfully!");
            queryClient.invalidateQueries(["savedJobs", user?.id]);
        },
        onError: (err) => toast.error(err.message),
    });

    const deleteJobMutation = useMutation({
        mutationFn: deleteSavedJob,
        onSuccess: (_, savedJobId) => {
            setSavedJobIds((prev) => prev.filter((id) => id !== savedJobId));
            toast.success("Job removed from saved!");
            queryClient.invalidateQueries(["savedJobs", user?.id]);
        },
        onError: (err) => toast.error(err.message),
    });

    const toggleFavorite = (job) => {
        if (!user?.id && location.pathname === "/") {
            setModalData({
                type: "save",
                title: "Save this job with a Remote Work Hub account",
                description:
                    "Save this job and other opportunities like this with a free Remote Work Hub account.",
            });
            return;
        }

        if (!savedJobIds.includes(job.id)) {
            saveJobMutation.mutate({ ...job, userId: user?.id });
        } else {
            getSavedJobsByUser(user.id).then((saved) => {
                const savedEntry = saved.find((s) => s.jobId === job.id);
                if (savedEntry) deleteJobMutation.mutate(savedEntry.id);
            });
        }
    };

    const handleApplyNow = (job) => {
        if (!user?.id && location.pathname === "/") {
            setModalData({
                type: "apply",
                title: "Apply to this job with a Remote Work Hub account",
                description:
                    "Build your profile, apply to this job, and track your application status with a free Remote Work Hub account.",
            });
            return;
        }
    };

    if (isLoading) return <p>Loading jobs...</p>;
    if (error) return <p>Failed to load jobs 😢</p>;

    // ================= Apply Search, Filter & Sort =================
    const filteredJobs = jobs
        .filter((job) => {
            return (
                (searchTerm === "" ||
                    job.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    job.companyName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())) &&
                (locationFilter === "" || job.location === locationFilter) &&
                (levelFilter === "" || job.experience === levelFilter) &&
                (typeFilter === "" || job.type === typeFilter) &&
                (educationFilter === "" || job.education === educationFilter) &&
                (companyFilter === "" || job.companyName === companyFilter) &&
                (salaryFilter === "" || job.salaryType === salaryFilter)
            );
        })
        .sort((a, b) => {
            switch (sortOption) {
                case "date":
                    return new Date(b.postedAt) - new Date(a.postedAt);
                case "az":
                    return a.title.localeCompare(b.title);
                case "relevance":
                    return 0; // شما می‌توانید الگوریتم دلخواه برای Relevance اضافه کنید
                case "location":
                    return a.location.localeCompare(b.location);
                case "type":
                    return a.type.localeCompare(b.type);
                default:
                    return 0;
            }
        });

    return (
        <AllJobsWrapper>
            <JobsContainer>
                <JobsHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    locationFilter={locationFilter}
                    setLocationFilter={setLocationFilter}
                    levelFilter={levelFilter}
                    setLevelFilter={setLevelFilter}
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    educationFilter={educationFilter}
                    setEducationFilter={setEducationFilter}
                    companyFilter={companyFilter}
                    setCompanyFilter={setCompanyFilter}
                    salaryFilter={salaryFilter}
                    setSalaryFilter={setSalaryFilter}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                />

                <JobList>
                    {filteredJobs.map((job) => (
                        <JobsCard key={job.id}>
                            <HeartIcon
                                active={savedJobIds.includes(job.id)}
                                onClick={() => toggleFavorite(job)}
                            />
                            <JobLeft>
                                <JobImg
                                    src={job.companyLogo}
                                    alt="Company Logo"
                                />
                                <JobText>
                                    <JobTitle>{job.title}</JobTitle>
                                    <JobPosition>{job.position}</JobPosition>
                                    <JobInfo>
                                        <Location>{job.location}</Location> |{" "}
                                        <ImportantInfo>
                                            {job.type}
                                        </ImportantInfo>{" "}
                                        |{" "}
                                        <ImportantInfo>
                                            {job.experience} experience
                                        </ImportantInfo>
                                    </JobInfo>
                                    <JobInfo>
                                        <CompanyName>
                                            {job.companyName}
                                        </CompanyName>{" "}
                                        | <Salary>{job.salary}</Salary> |{" "}
                                        <PostedAt>{job.postedAt}</PostedAt>
                                    </JobInfo>
                                </JobText>
                            </JobLeft>

                            <StyledLinkButtons className="hover-buttons">
                                <Link to={`jobDetails/${job.id}`}>
                                    <Button variation="secondary" size="medium">
                                        Learn More
                                    </Button>
                                </Link>
                                <Button
                                    variation="primary"
                                    size="medium"
                                    onClick={() => handleApplyNow(job)}
                                >
                                    Apply Now
                                </Button>
                            </StyledLinkButtons>
                        </JobsCard>
                    ))}
                </JobList>
            </JobsContainer>
            <Footer />

            {/* Modal */}
            {modalData && (
                <ModalOverlay onClick={() => setModalData(null)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalTitle>{modalData.title}</ModalTitle>
                        <ModalDescription>
                            {modalData.description}
                        </ModalDescription>
                        <ModalButtons>
                            <Link to="/login">
                                <Button variation="secondary">Log In</Button>
                            </Link>
                            <Link to="/createAccount">
                                <Button variation="primary">Sign Up</Button>
                            </Link>
                        </ModalButtons>
                    </ModalContent>
                </ModalOverlay>
            )}
        </AllJobsWrapper>
    );
}
