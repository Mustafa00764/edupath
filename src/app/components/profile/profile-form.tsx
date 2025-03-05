"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Camera, Loader2 } from "lucide-react"
import { useToast } from "@/app/components/ui/use-toast"

import { Button } from "@/app/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  bio: z.string().max(500, {
    message: "Bio must not be longer than 500 characters.",
  }),
  occupation: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// В реальном приложении эти данные будут загружаться с сервера
const defaultValues: Partial<ProfileFormValues> = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  bio: "I'm a passionate learner interested in web development and design. Currently working on improving my frontend skills.",
  occupation: "Software Developer",
}

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg?height=100&width=100")
  const { toast } = useToast()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    try {
      // Имитация API-запроса
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-xl">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={profileImage} alt="Profile picture" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors shadow-md"
            >
              <Camera className="h-5 w-5" />
              <span className="sr-only">Change profile picture</span>
            </label>
            <input id="profile-image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl font-semibold ">John Doe</h2>
            <p className="text-sm ">Update your photo and personal details here</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                <FormControl>
                  <Input placeholder="Your occupation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little about yourself"
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>You can write about your interests, goals, or experience.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}

