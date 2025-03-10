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

interface NewsItem {
  id: string
  title: string
  content: string
  author: string
  date: string
  image: string
  category: string
  status: "Опубликовано" | "Черновик"
}

const initialNews: NewsItem[] = [
  {
    id: "1",
    title: "Запуск нового курса по программированию",
    content:
      "Мы рады объявить о запуске нового курса по программированию на Python. Курс начнется в следующем месяце и будет доступен как онлайн, так и офлайн.",
    author: "Иван Иванов",
    date: "2024-03-01",
    image: "/placeholder.svg?height=100&width=100",
    category: "Новые курсы",
    status: "Опубликовано",
  },
  {
    id: "2",
    title: "Успехи наших выпускников",
    content:
      "Мы гордимся успехами наших выпускников! Трое из них недавно получили работу в ведущих технологических компаниях.",
    author: "Мария Петрова",
    date: "2024-02-28",
    image: "/placeholder.svg?height=100&width=100",
    category: "Достижения",
    status: "Опубликовано",
  },
]

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<Partial<NewsItem>>({})
  const [isEditing, setIsEditing] = useState(false)

  const columns: ColumnDef<NewsItem>[] = [
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
        const item = row.original
        return (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const handleCreateOrUpdate = () => {
    if (isEditing) {
      setNews(news.map((item) => (item.id === currentItem.id ? ({ ...item, ...currentItem } as NewsItem) : item)))
    } else {
      const newItem: NewsItem = {
        id: (news.length + 1).toString(),
        title: currentItem.title || "",
        content: currentItem.content || "",
        author: currentItem.author || "",
        date: new Date().toISOString().split("T")[0],
        image: currentItem.image || "/placeholder.svg?height=100&width=100",
        category: currentItem.category || "",
        status: currentItem.status || "Черновик",
      }
      setNews([...news, newItem])
    }
    setIsDialogOpen(false)
    setCurrentItem({})
    setIsEditing(false)
  }

  const handleEdit = (item: NewsItem) => {
    setCurrentItem(item)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setNews(news.filter((item) => item.id !== id))
  }

  return (
    <CrudLayout
      title="Новости"
      description="Управление новостями вашего образовательного центра"
      createButtonLabel="Создать новость"
      onCreateClick={() => {
        setCurrentItem({})
        setIsEditing(false)
        setIsDialogOpen(true)
      }}
    >
      <DataTable columns={columns} data={news} searchKey="title" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Редактировать новость" : "Создать новую новость"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Измените информацию о новости здесь." : "Заполните информацию о новой новости здесь."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                value={currentItem.title || ""}
                onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Содержание</Label>
              <Textarea
                id="content"
                value={currentItem.content || ""}
                onChange={(e) => setCurrentItem({ ...currentItem, content: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Автор</Label>
                <Input
                  id="author"
                  value={currentItem.author || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, author: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Дата</Label>
                <Input
                  id="date"
                  type="date"
                  value={currentItem.date || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, date: e.target.value })}
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
                        setCurrentItem({ ...currentItem, image: imageUrl })
                      }
                    }}
                  />
                  {currentItem.image && <span className="text-sm text-muted-foreground">Изображение выбрано</span>}
                </div>
                {currentItem.image && (
                  <div className="relative h-40 w-full max-w-md rounded-md overflow-hidden border">
                    <Image
                      src={currentItem.image || "/placeholder.svg"}
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
                value={currentItem.category || ""}
                onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select
                value={currentItem.status}
                onValueChange={(value) =>
                  setCurrentItem({ ...currentItem, status: value as "Опубликовано" | "Черновик" })
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
            <Button onClick={handleCreateOrUpdate}>{isEditing ? "Сохранить изменения" : "Создать новость"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CrudLayout>
  )
}

