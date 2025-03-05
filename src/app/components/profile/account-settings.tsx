"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Switch } from "@/app/components/ui/switch"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"
import { useToast } from "@/app/components/ui/use-toast"
import { Bell, Mail, Lock, Trash2 } from "lucide-react"

export default function AccountSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const { toast } = useToast()

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Здесь будет логика изменения пароля
    toast({
      title: "Password changed",
      description: "Your password has been successfully updated.",
    })
  }

  const handleNotificationChange = () => {
    // Здесь будет логика сохранения настроек уведомлений
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
        <div className=" p-6 shadow-lg rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Mail className="text-purple-600 flex-shrink-0" />
              <div>
                <Label htmlFor="email-notifications" className="font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm">Receive email updates about your account</p>
              </div>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={(checked) => {
                setEmailNotifications(checked)
                handleNotificationChange()
              }}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Bell className="text-purple-600 flex-shrink-0" />
              <div>
                <Label htmlFor="sms-notifications" className="font-medium">
                  SMS Notifications
                </Label>
                <p className="text-sm">Receive text messages about your account</p>
              </div>
            </div>
            <Switch
              id="sms-notifications"
              checked={smsNotifications}
              onCheckedChange={(checked) => {
                setSmsNotifications(checked)
                handleNotificationChange()
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Lock className="mr-2 text-purple-600" />
          Change Password
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4 p-6 rounded-xl shadow-md">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" required className="mt-1" />
          </div>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
            Change Password
          </Button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Trash2 className="mr-2 text-red-600" />
          Delete Account
        </h3>
        <div className=" shadow-lg p-6 rounded-xl">
          <p className="text-sm  mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive" className="w-full sm:w-auto">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}

