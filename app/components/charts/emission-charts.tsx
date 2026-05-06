"use client";

import { useCompanyByIdQuery } from "@/app/hooks/tanstacks/query/useCompanyQuery";
import useEmissionCharts from "@/app/hooks/useEmissionCharts";
import { useCompanyStore } from "@/app/stores/useCompanyStore";
import { Company } from "@/app/types/types";
import { EMISSION_UNIT } from "@/app/utils/emission-factor";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function EmissionCharts() {
  const selectedId = useCompanyStore((state) => state.selectedId);
  const { data: selectedCompany } = useCompanyByIdQuery(selectedId);
  const { data, barKeys } = useEmissionCharts(selectedCompany as Company);

  if (!data || data.length === 0) return <div>데이터가 없습니다.</div>;
  return (
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="yearMonth"
            tickFormatter={(value) => value.substring(0, 7)}
          />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
            formatter={(value, name) => {
              if (!value || !name) return [];
              return [
                `${value.toLocaleString()} kgCO₂e / ${EMISSION_UNIT[name]}`,
                name,
              ];
            }}
          />
          <Legend
            iconType="circle"
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: "20px" }}
          />
          {barKeys.map((key, idx) => (
            <Bar
              key={key}
              dataKey={key}
              stackId={"a"}
              barSize={40}
              fill={["#6366f1", "#10b981", "#f59e0b", "#64748b"][idx % 4]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
