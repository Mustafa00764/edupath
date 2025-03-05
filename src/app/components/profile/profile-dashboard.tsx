"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import ProfileForm from "./profile-form"
import EnrolledCourses from "./enrolled-courses"
import AccountSettings from "./account-settings"
import { User, BookOpen, Settings } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="flex justify-between p-1 mb-4  rounded-xl">
            <div>
            <TabsTrigger
              value="profile"
              className="px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-in-out rounded-lg text-purple-700 hover:bg-purple-200 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
            >
              <User size={18} className="inline-block mr-1 -mt-0.5" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-in-out rounded-lg text-purple-700 hover:bg-purple-200 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
            >
              <BookOpen size={18} className="inline-block mr-1 -mt-0.5" />
              <span>Courses</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-in-out rounded-lg text-purple-700 hover:bg-purple-200 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
            >
              <Settings size={18} className="inline-block mr-1 -mt-0.5" />
              <span>Settings</span>
            </TabsTrigger>
            </div>
            <Link href={"/dashboard"}>
            <button type="submit" className="bg-purple-600 px-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-purple-700 h-8 text-white">
              Admin Panel
            </button>
            </Link>
          </TabsList>
          <div className="rounded-xl shadow-lg overflow-hidden">
            <TabsContent value="profile" className="p-4 sm:p-6 lg:p-8 focus:outline-none">
              <ProfileForm />
            </TabsContent>
            <TabsContent value="courses" className="p-4 sm:p-6 lg:p-8 focus:outline-none">
              <EnrolledCourses />
            </TabsContent>
            <TabsContent value="settings" className="p-4 sm:p-6 lg:p-8 focus:outline-none">
              <AccountSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

