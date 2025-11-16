import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";

type BaseChartProps = {
  data: { value: number | undefined }[];
};

function BaseChart({ data }: BaseChartProps) {
  return (
    <div style={{ width: "100%", height: 250 }}> {/* MUST have fixed height */}
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid stroke="#333" strokeDasharray="5.5" />

          {/* keep axes inside chart */}
          <XAxis stroke="transparent" height={0} />
          <YAxis domain={[0, 100]} stroke="transparent" width={0} />

          <Area
            fillOpacity={0.3}
            fill="#0A4d5C"
            stroke="#5DD4EE"
            strokeWidth={3}
            type="monotone"
            dataKey="value"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BaseChart;
