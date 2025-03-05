"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Web Development", value: 85, color: "#3b82f6" },
  { name: "Advanced JavaScript", value: 78, color: "#10b981" },
  { name: "UX/UI Design", value: 72, color: "#f59e0b" },
  { name: "Data Science", value: 65, color: "#8b5cf6" },
  { name: "Mobile App Dev", value: 60, color: "#ec4899" },
]

export function CompletionRateChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

