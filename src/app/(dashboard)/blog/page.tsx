"use client"

import { useState } from "react"
import { CrudLayout } from "@/app/components/crud/crud-layout"
import { DataTable } from "@/app/components/crud/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/app/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import Image from "next/image"

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  date: string
  image: string
  category: string
  tags: string[]
  status: "Опубликовано" | "Черновик"
}

const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Введение в веб-разработку",
    content:
      "Веб-разработка - это процесс создания веб-сайтов или веб-приложений. Она включает в себя front-end разработку (то, что видит пользователь) и back-end разработку (серверная часть).",
    author: "Анна Петрова",
    date: "2023-07-01",
    image: "/placeholder.svg?height=100&width=100",
    category: "Веб-разработка",
    tags: ["HTML", "CSS", "JavaScript"],
    status: "Опубликовано",
  },
  {
    id: "2",
    title: "Продвинутые техники JavaScript",
    content:
      "JavaScript - мощный язык программирования, который позволяет создавать динамический контент на веб-страницах. В этой статье мы рассмотрим некоторые продвинутые техники.",
    author: "Иван Сидоров",
    date: "2023-07-15",
    image: "/placeholder.svg?height=100&width=100",
    category: "Программирование",
    tags: ["JavaScript", "ES6", "Асинхронность"],
    status: "Опубликовано",
  },
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({})
  const [isEditing, setIsEditing] = useState(false)

  const columns: ColumnDef<BlogPost>[] = [
    {
      accessorKey: "image",
      header: "Изображение",
      cell: ({ row }) => (
        <Image
          src={row.original.image || "/placeholder.svg"}
          alt={row.original.title}
          width={50}
          height={50}
          className="rounded-md"
        />
      ),
    },
    {
      accessorKey: "title",
      header: "Заголовок",
    },
    {
      accessorKey: "author",
      header: "Автор",
    },
    {
      accessorKey: "date",
      header: "Дата",
    },
    {
      accessorKey: "category",
      header: "Категория",
    },
    {
      accessorKey: "status",
      header: "Статус",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const post = row.original
        return (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const handleCreateOrUpdate = () => {
    if (isEditing) {
      setPosts(posts.map((p) => (p.id === currentPost.id ? ({ ...p, ...currentPost } as BlogPost) : p)))
    } else {
      const newPost: BlogPost = {
        id: (posts.length + 1).toString(),
        title: currentPost.title || "",
        content: currentPost.content || "",
        author: currentPost.author || "",
        date: new Date().toISOString().split("T")[0],
        image: currentPost.image || "/placeholder.svg?height=100&width=100",
        category: currentPost.category || "",
        tags: currentPost.tags || [],
        status: currentPost.status || "Черновик",
      }
      setPosts([...posts, newPost])
    }
    setIsDialogOpen(false)
    setCurrentPost({})
    setIsEditing(false)
  }

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  return (
    <CrudLayout
      title="Блог"
      description="Управление постами в блоге вашего образовательного центра"
      createButtonLabel="Создать пост"
      onCreateClick={() => {
        setCurrentPost({})
        setIsEditing(false)
        setIsDialogOpen(true)
      }}
    >
      <DataTable columns={columns} data={posts} searchKey="title" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Редактировать пост" : "Создать новый пост"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Измените информацию о посте здесь." : "Заполните информацию о новом посте здесь."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                value={currentPost.title || ""}
                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Содержание</Label>
              <Textarea
                id="content"
                value={currentPost.content || ""}
                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Автор</Label>
                <Input
                  id="author"
                  value={currentPost.author || ""}
                  onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Дата</Label>
                <Input
                  id="date"
                  type="date"
                  value={currentPost.date || ""}
                  onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Изображение</Label>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2 bg-primary/5 hover:bg-primary/10"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-upload"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    Выбрать изображение
                  </Button>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const imageUrl = URL.createObjectURL(file)
                        setCurrentPost({ ...currentPost, image: imageUrl })
                      }
                    }}
                  />
                  {currentPost.image && <span className="text-sm text-muted-foreground">Изображение выбрано</span>}
                </div>
                {currentPost.image && (
                  <div className="relative h-40 w-full max-w-md rounded-md overflow-hidden border">
                    <Image
                      src={currentPost.image || "/placeholder.svg"}
                      alt="Предпросмотр"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                value={currentPost.category || ""}
                onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Теги (разделенные запятой)</Label>
              <Input
                id="tags"
                value={currentPost.tags?.join(", ") || ""}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, tags: e.target.value.split(",").map((tag) => tag.trim()) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select
                value={currentPost.status}
                onValueChange={(value) =>
                  setCurrentPost({ ...currentPost, status: value as "Опубликовано" | "Черновик" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Опубликовано">Опубликовано</SelectItem>
                  <SelectItem value="Черновик">Черновик</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateOrUpdate}>{isEditing ? "Сохранить изменения" : "Создать пост"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CrudLayout>
  )
}

