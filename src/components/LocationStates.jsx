import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export default function LocationStates({ stats }) {
  const cityCount = stats.reduce((acc, item) => {
    if (acc[item.city]) {
      acc[item.city] += 1;
    } else acc[item.city] = 1;

    return acc;
  }, {});

  console.log(cityCount);

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));
  console.log(cities);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart width={500} height={300} data={cities.slice(0, 5)}>
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip labelStyle={{ color: "green " }} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
