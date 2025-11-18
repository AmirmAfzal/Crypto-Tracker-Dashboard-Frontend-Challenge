"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

interface Props {
  data: number[];
  isPositive: boolean;
}

const Sparkline = ({ data, isPositive }: Props) => {
  const chartData = data.map((price, index) => ({ index, price }));
  const color = isPositive ? "var(--success)" : "var(--destructive)";

  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Sparkline;
