import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { HiMiniHeart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { putSavedJobs } from "../../../services/apiGetSavedJobs";
import { getJobs } from "../../../services/apiAllJobs"; 
import Button from "../../../ui/Button";

// ================== Styled Components ==================
const JobsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
`;

const ControlsWrapper = styled.div`
  flex-shrink: 0;
  /* background-color: var(--color-grey-30); */
  z-index: 10;
  padding-bottom: 1rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SearchBar = styled.input`
  width: 70%;
  padding: 1.2rem 1.6rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  font-size: 1.6rem;
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
  }
`;

const StyledSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
  padding: 1rem 0;
`;

const FilterTags = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const TagButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  background-color: var(--color-grey-100);
  font-size: 1.4rem;
  font-weight: 500;
  border: 1px solid var(--color-grey-300);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-primary-light);
    color: #fff;
    border-color: var(--color-primary-light);
  }

  &.active {
    background-color: var(--color-primary);
    color: #fff;
    border-color: var(--color-primary);
  }
`;

const SortSelect = styled.select`
  padding: 0.8rem 1.2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-grey-300);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  cursor: pointer;

  &:hover {
    border-color: var(--color-primary);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-sm);
  }
`;

const JobList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 1rem;
`;

const JobsCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-grey-0);
  padding: 1.6rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  max-width: 100%;
  margin: 0 auto 1.6rem;
  gap: 1.6rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
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
  font-size: 1.8rem;
  font-weight: 600;
`;

const JobPosition = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const JobDetails = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const StyledLinkButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const HeartIcon = styled(HiMiniHeart)`
  cursor: pointer;
  font-size: 2rem;
  color: ${(props) => (props.active ? "#2b8a3e" : "var(--color-grey-400)")};
  transition: color 0.2s ease;

  &:hover {
    color: #2b8a3e;
  }
`;

// ... keep all your styled components unchanged ...

// ================== Component ==================
function AllJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const queryClient = useQueryClient();

  // ✅ Use React Query to fetch jobs
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
    select: (data) => data.map((job) => ({ ...job, isFavorite: false })),
  });

  // Mutation to save job
  const saveJobMutation = useMutation({
    mutationFn: putSavedJobs,
    onSuccess: () => {
      queryClient.invalidateQueries(["savedJobs"]);
    },
  });

  // Toggle favorite and save job
  const toggleFavorite = (job) => {
    queryClient.setQueryData(["jobs"], (oldJobs) =>
      oldJobs.map((j) =>
        j.id === job.id ? { ...j, isFavorite: !j.isFavorite } : j
      )
    );
    if (!job.isFavorite) {
      saveJobMutation.mutate(job);
    }
  };

  // Handle loading & error states
  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Failed to load jobs 😢</p>;

  // Filter jobs
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOption === "date") return new Date(b.date) - new Date(a.date);
    if (sortOption === "relevance") return b.relevance - a.relevance;
    if (sortOption === "location") return a.location.localeCompare(b.location);
    if (sortOption === "type") return a.type.localeCompare(b.type);
    return 0;
  });

  return (
    <JobsContainer>
      {/* Search + Filter + Sort */}
      <ControlsWrapper>
        <SearchWrapper>
          <SearchBar
            type="search"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        <StyledSortContainer>
          <FilterTags>
            <TagButton onClick={() => setSearchTerm("Kabul")}>Kabul</TagButton>
            <TagButton onClick={() => setSearchTerm("Full Time")}>
              Full Time
            </TagButton>
            <TagButton onClick={() => setSearchTerm("Part Time")}>
              Part Time
            </TagButton>
            <TagButton onClick={() => setSearchTerm("Remote")}>
              Remote
            </TagButton>
            <TagButton onClick={() => setSearchTerm("Internship")}>
              Internship
            </TagButton>
            <TagButton onClick={() => setSearchTerm("Junior")}>Junior</TagButton>
            <TagButton onClick={() => setSearchTerm("Senior")}>Senior</TagButton>
            <TagButton onClick={() => setSearchTerm("")}>Clear</TagButton>
          </FilterTags>

          <SortSelect
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="relevance">Sort by Relevance</option>
            <option value="location">Sort by Location</option>
            <option value="type">Sort by Job Type</option>
          </SortSelect>
        </StyledSortContainer>
      </ControlsWrapper>

      {/* Job Cards */}
      <JobList>
        {sortedJobs.map((job) => (
          <JobsCard key={job.id}>
            <JobLeft>
              <JobImg src={job.companyLogo} alt="Company Logo" />
              <JobText>
                <JobTitle>{job.title}</JobTitle>
                <JobPosition>{job.position}</JobPosition>
                <JobDetails>
                  {job.location} | {job.type} | {job.experience} experience
                </JobDetails>
              </JobText>
            </JobLeft>

            <StyledLinkButtons>
              <HeartIcon
                active={job.isFavorite}
                onClick={() => toggleFavorite(job)}
              />
              <Link to={`jobDetails/${job.id}`}>
                <Button variation="secondary" size="medium">
                  Learn More
                </Button>
              </Link>
            </StyledLinkButtons>
          </JobsCard>
        ))}
      </JobList>
    </JobsContainer>
  );
}

export default AllJobs;
