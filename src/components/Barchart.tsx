"use client"
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data
const data = [
  { name: "January", Income: 4000, Expense: 2400 },
  { name: "February", Income: 3000, Expense: 1398 },
  { name: "March", Income: 2000, Expense: 9800 },
  { name: "April", Income: 2780, Expense: 3908 },
  { name: "May", Income: 1890, Expense: 4800 },
  { name: "June", Income: 2390, Expense: 3800 },
  { name: "July", Income: 3490, Expense: 4300 },
];

const MyBarChart = () => {
  return (
    <div className="h-[330px] w-full bg-white rounded-lg shadow-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
      
          <Bar dataKey="Income" fill="#9ECE39" />
          <Bar dataKey="Expense" fill="#7D67FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;