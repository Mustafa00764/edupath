"use client"

import { useState } from "react"
import { CrudLayout } from "@/app/components/crud/crud-layout"
import { DataTable } from "@/app/components/crud/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/app/components/ui/button"
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

interface Course {
  id: string
  name: string
  description: string
  category: string
  price: number
  duration: string
  level: string
  image: string
  instructor: string
  students: number
  status: "Активный" | "Черновик"
}

const initialCourses: Course[] = [
  {
    id: "1",
    name: "Введение в веб-разработку",
    description: "Базовый курс по HTML, CSS и JavaScript",
    category: "Веб-разработка",
    price: 9900,
    duration: "8 недель", 
    level: "Начинающий",
    image: "/placeholder.svg?height=100&width=100",
    instructor: "Иван Петров",
    students: 50,
    status: "Активный",
  },
  {
    id: "2",
    name: "Продвинутый JavaScript",
    description: "Углубленное изучение JavaScript и современных фреймворков",
    category: "Программирование",
    price: 14900,
    duration: "10 недель",
    level: "Продвинутый",
    image: "/placeholder.svg?height=100&width=100",
    instructor: "Мария Сидорова",
    students: 30,
    status: "Активный",
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<Partial<Course>>({})
  const [isEditing, setIsEditing] = useState(false)

  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "image",
      header: "Изображение",
      cell: ({ row }) => (
        <Image
          src={row.original.image || "/placeholder.svg"}
          alt={row.original.name}
          width={50}
          height={50}
          className="rounded-md"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Название",
    },
    {
      accessorKey: "category",
      header: "Категория",
    },
    {
      accessorKey: "price",
      header: "Цена",
      cell: ({ row }) => `${row.original.price.toLocaleString()} ₽`,
    },
    {
      accessorKey: "students",
      header: "Студенты",
    },
    {
      accessorKey: "status",
      header: "Статус",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const course = row.original
        return (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(course)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const handleCreateOrUpdate = () => {
    if (isEditing) {
      setCourses(courses.map((c) => (c.id === currentCourse.id ? ({ ...c, ...currentCourse } as Course) : c)))
    } else {
      const newCourse: Course = {
        id: (courses.length + 1).toString(),
        name: currentCourse.name || "",
        description: currentCourse.description || "",
        category: currentCourse.category || "",
        price: currentCourse.price || 0,
        duration: currentCourse.duration || "",
        level: currentCourse.level || "",
        image: currentCourse.image || "/placeholder.svg?height=100&width=100",
        instructor: currentCourse.instructor || "",
        students: 0,
        status: currentCourse.status || "Черновик",
      }
      setCourses([...courses, newCourse])
    }
    setIsDialogOpen(false)
    setCurrentCourse({})
    setIsEditing(false)
  }

  const handleEdit = (course: Course) => {
    setCurrentCourse(course)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id))
  }

  return (
    <CrudLayout
      title="Курсы"
      description="Управление курсами вашего образовательного центра"
      createButtonLabel="Создать курс"
      onCreateClick={() => {
        setCurrentCourse({})
        setIsEditing(false)
        setIsDialogOpen(true)
      }}
    >
      <DataTable columns={columns} data={courses} searchKey="name" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Редактировать курс" : "Создать новый курс"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Измените информацию о курсе здесь." : "Заполните информацию о новом курсе здесь."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название</Label>
                <Input
                  id="name"
                  value={currentCourse.name || ""}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Input
                  id="category"
                  value={currentCourse.category || ""}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, category: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={currentCourse.description || ""}
                onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Цена</Label>
                <Input
                  id="price"
                  type="number"
                  value={currentCourse.price || ""}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, price: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Продолжительность</Label>
                <Input
                  id="duration"
                  value={currentCourse.duration || ""}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, duration: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Уровень</Label>
                <Input
                  id="level"
                  value={currentCourse.level || ""}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, level: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Инструктор</Label>
                <Input
                  id="instructor"
                  value={currentCourse.instructor || ""}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, instructor: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Изображение</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const imageUrl = URL.createObjectURL(file)
                      setCurrentCourse({ ...currentCourse, image: imageUrl })
                    }
                  }}
                />
                {currentCourse.image && (
                  <div className="relative h-20 w-20">
                    <Image
                      src={currentCourse.image || "/placeholder.svg"}
                      alt="Preview"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select
                value={currentCourse.status}
                onValueChange={(value) =>
                  setCurrentCourse({ ...currentCourse, status: value as "Активный" | "Черновик" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Активный">Активный</SelectItem>
                  <SelectItem value="Черновик">Черновик</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateOrUpdate}>{isEditing ? "Сохранить изменения" : "Создать курс"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CrudLayout>
  )
}

