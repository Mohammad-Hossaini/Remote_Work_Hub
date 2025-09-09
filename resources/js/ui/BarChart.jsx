import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { job: "Frontend Developer", applicants: 25 },
  { job: "UX Designer", applicants: 15 },
  { job: "Mobile Developer", applicants: 10 },
  { job: "Product Designer", applicants: 8 },
  { job: "Backend Developer", applicants: 18 },
  { job: "Full Stack Developer", applicants: 22 },
  { job: "Data Analyst", applicants: 12 },
  { job: "DevOps Engineer", applicants: 7 },
];

const JobApplicantsChart = () => {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      {" "}
      {/* fixed container height */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 80, right: -10, left: -15, bottom: 50 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-grey-300)" />
          <XAxis
            dataKey="job"
            tick={{ fontSize: 10 }}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
          />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="applicants"
            fill="var(--color-primary)" // primary color from global style
            radius={[0, 0, 0, 0]} // rounded corners
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JobApplicantsChart;
