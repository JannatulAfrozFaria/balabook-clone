"use client";
import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Sample data
const data = [
  { name: "Telephone & Internet", value: 24000, color: "#9ECE39" },
  { name: "Wages and Salaries", value: 15000, color: "#D6C72E" },
  { name: "Travelling Expenses", value: 5000, color: "#999999" },
  { name: "Utilities", value: 5000, color: "#7D67FF" },
  { name: "Repairs and Maintenance", value: 5000, color: "#6957D6" },
];

const MyDoughnutChart = () => {
  return (
    <div className="h-[330px] w-[600px] bg-white rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={80}
            outerRadius={150}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyDoughnutChart;
