import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const dataDetails = [
  { name: "Pending - New", value: 15 },
  { name: "Pending - Follow-up", value: 25 },
  { name: "Reviewed - Shortlisted", value: 10 },
  { name: "Reviewed - Not shortlisted", value: 15 },
  { name: "Hired - Full-time", value: 12 },
  { name: "Hired - Part-time", value: 8 },
  { name: "Rejected - Not qualified", value: 10 },
  { name: "Rejected - Withdrew", value: 5 },
];

// Define a unique color for each slice
const COLORS = [
  "#ffd43b",
  "#b91c1c",
  "#6bcB77",
  "#0369a1",
  "#a16207",
  "#c084fc",
  "#15803d",
  "#f06595",
];

export default function ApplicationStatus() {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Pie
          data={dataDetails}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={65}
          stroke="#fff"
          label = "first"
        >
          {dataDetails.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />{" "}
      </PieChart>
    </ResponsiveContainer>
  );
}
