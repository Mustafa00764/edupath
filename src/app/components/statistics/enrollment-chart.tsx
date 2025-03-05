"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", enrollments: 45 },
  { month: "Feb", enrollments: 52 },
  { month: "Mar", enrollments: 61 },
  { month: "Apr", enrollments: 67 },
  { month: "May", enrollments: 71 },
  { month: "Jun", enrollments: 85 },
  { month: "Jul", enrollments: 91 },
  { month: "Aug", enrollments: 99 },
  { month: "Sep", enrollments: 110 },
  { month: "Oct", enrollments: 102 },
  { month: "Nov", enrollments: 95 },
  { month: "Dec", enrollments: 87 },
]

export function EnrollmentChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="enrollments" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

