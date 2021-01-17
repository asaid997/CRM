import React from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  } from 'recharts'
  



export default function Sales(props) {
    const {salesByDate} = props
    salesByDate.reverse()

    return (
        <ResponsiveContainer width="100%" height={200}  >
            <LineChart
            data={salesByDate}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#F42C04" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}
