import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageNotFound from "./components/PageNotFound";
import Settings from "./components/Settings";
import Applicant from "./pages/home/employer/Applicant";
import EmployerDashboard from "./pages/home/employer/EmployerDashboard";
import PostedJobs from "./pages/home/employer/PostedJobs";
import PostedNewJobs from "./pages/home/employer/PostedNewJobs";
import Home from "./pages/home/Home";
import AllJobs from "./pages/home/job-seeker/AllJobs";
import AppliedJobs from "./pages/home/job-seeker/AppliedJobs";
import JobDetails from "./pages/home/job-seeker/JobDetails";
import JobSeekerDashboard from "./pages/home/job-seeker/JobSeekerDashboard";
import SavedJobs from "./pages/home/job-seeker/SavedJobs";
import Welcome from "./pages/home/welcomPage/Welcome";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import EmployerAppLayout from "./ui/EmployerAppLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          {/* Public pages */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />

          {/* Protected "app" pages */}
          <Route path="/app" element={<AppLayout />}>
            {/* Default page when visiting /app */}
            <Route index element={<JobSeekerDashboard />} />

            {/* Explicit path for jobSeekerDashboard */}
            <Route path="jobSeekerDashboard" element={<JobSeekerDashboard />} />

            <Route path="applicant" element={<Applicant />} />
            <Route path="postedJobs" element={<PostedJobs />} />
            <Route path="postedNewJobs" element={<PostedNewJobs />} />
            <Route path="allJobs" element={<AllJobs />} />
            <Route path="appliedJobs" element={<AppliedJobs />} />
            <Route path="allJobs/jobDetails/:id" element={<JobDetails />} />
            <Route path="appliedJobs" element={<AppliedJobs />} />
            <Route path="savedJobs" element={<SavedJobs />} />
          </Route>
          <Route path="/employerApp" element={<EmployerAppLayout />}>
            <Route index element={<EmployerDashboard />} />
            <Route path="employerDashboard" element={<EmployerDashboard />} />
            <Route path="allJobs" element={<AllJobs />} />{" "}
            <Route path="allJobs/jobDetails/:id" element={<JobDetails />} />{" "}
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
