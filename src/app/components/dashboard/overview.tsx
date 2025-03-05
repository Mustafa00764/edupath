"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    enrollments: 45,
    completions: 35,
  },
  {
    name: "Feb",
    enrollments: 52,
    completions: 41,
  },
  {
    name: "Mar",
    enrollments: 61,
    completions: 45,
  },
  {
    name: "Apr",
    enrollments: 67,
    completions: 50,
  },
  {
    name: "May",
    enrollments: 71,
    completions: 55,
  },
  {
    name: "Jun",
    enrollments: 85,
    completions: 61,
  },
  {
    name: "Jul",
    enrollments: 91,
    completions: 68,
  },
  {
    name: "Aug",
    enrollments: 99,
    completions: 75,
  },
  {
    name: "Sep",
    enrollments: 110,
    completions: 80,
  },
  {
    name: "Oct",
    enrollments: 102,
    completions: 85,
  },
  {
    name: "Nov",
    enrollments: 95,
    completions: 78,
  },
  {
    name: "Dec",
    enrollments: 87,
    completions: 72,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="enrollments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="completions" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

