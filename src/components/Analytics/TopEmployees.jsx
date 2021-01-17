import React from "react";
import {BarChart,Bar,Cell,XAxis,YAxis,CartesianGrid,Tooltip,Legend, ResponsiveContainer,} from "recharts";

function TopEmployees(props) {
  const { data,clr } = props;
  
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill={clr || "#8884d8"} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TopEmployees