"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar} alt={activity.user} />
            <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}

const activities = [
  {
    id: "1",
    user: "Emma Wilson",
    action: "Enrolled in Web Development Fundamentals",
    time: "2 minutes ago",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "2",
    user: "James Rodriguez",
    action: "Completed Advanced JavaScript course",
    time: "1 hour ago",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "3",
    user: "Sophia Chen",
    action: "Submitted an assignment for UX/UI Design",
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "4",
    user: "Marcus Johnson",
    action: "Asked a question in Data Science forum",
    time: "5 hours ago",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "5",
    user: "Sarah Johnson",
    action: "Created a new course: Mobile App Development",
    time: "1 day ago",
    avatar: "/placeholder.svg?height=36&width=36",
  },
]

