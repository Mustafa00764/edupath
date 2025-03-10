"use client"

import { useState } from "react"
import { CrudLayout } from "@/app/components/crud/crud-layout"
import { DataTable } from "@/app/components/crud/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/app/components/ui/button"
import { Pencil, Trash2, Calendar } from "lucide-react"
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
import { Card } from "@/app/components/ui/card"

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
  groups?: {
    id: string
    groupNumber: string
    ageRange: string
    schedule: {
      [key: string]: { start: string; end: string } | undefined
    }
    maxStudents: number
    currentStudents: number
  }[]
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
    groups: [
      {
        id: "1",
        groupNumber: "Группа 1",
        ageRange: "18+",
        schedule: {
          Понедельник: { start: "18:00", end: "20:00" },
          Вторник: undefined,
          Среда: { start: "18:00", end: "20:00" },
          Четверг: undefined,
          Пятница: undefined,
          Суббота: undefined,
          Воскресенье: undefined,
        },
        maxStudents: 20,
        currentStudents: 15,
      },
      {
        id: "2",
        groupNumber: "Группа 2",
        ageRange: "18+",
        schedule: {
          Понедельник: undefined,
          Вторник: undefined,
          Среда: undefined,
          Четверг: undefined,
          Пятница: { start: "19:00", end: "21:00" },
          Суббота: { start: "10:00", end: "12:00" },
          Воскресенье: undefined,
        },
        maxStudents: 20,
        currentStudents: 12,
      },
    ],
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
    groups: [
      {
        id: "1",
        groupNumber: "Группа 1",
        ageRange: "18+",
        schedule: {
          Понедельник: undefined,
          Вторник: { start: "19:00", end: "21:00" },
          Среда: undefined,
          Четверг: { start: "19:00", end: "21:00" },
          Пятница: undefined,
          Суббота: undefined,
          Воскресенье: undefined,
        },
        maxStudents: 15,
        currentStudents: 10,
      },
    ],
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<Partial<Course>>({})
  const [isEditing, setIsEditing] = useState(false)

  // Состояние для модального окна расписания
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState<Course["groups"]>([])

  // Функция для открытия модального окна с расписанием
  const openScheduleModal = (groups: Course["groups"]) => {
    setSelectedGroups(groups)
    setScheduleModalOpen(true)
  }

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
          className="rounded-md object-cover"
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
      id: "schedule",
      header: "Расписание",
      cell: ({ row }) => {
        const course = row.original
        if (!course.groups || course.groups.length === 0) {
          return "Нет групп"
        }

        return (
          <div className="flex items-center">
            <div className="max-w-[150px] text-xs mr-2 truncate">{course.groups.length} групп(ы)</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                openScheduleModal(course.groups)
              }}
              className="h-6 w-6"
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        )
      },
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
        groups: currentCourse.groups || [],
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

  const handleAddGroup = () => {
    const newGroup = {
      id: Date.now().toString(),
      groupNumber: `Группа ${(currentCourse.groups?.length || 0) + 1}`,
      ageRange: "",
      schedule: {
        Понедельник: undefined,
        Вторник: undefined,
        Среда: undefined,
        Четверг: undefined,
        Пятница: undefined,
        Суббота: undefined,
        Воскресенье: undefined,
      },
      maxStudents: 15,
      currentStudents: 0,
    }
    setCurrentCourse({
      ...currentCourse,
      groups: [...(currentCourse.groups || []), newGroup],
    })
  }

  const handleUpdateGroup = (groupId: any, updates: any) => {
    setCurrentCourse({
      ...currentCourse,
      groups: (currentCourse.groups || []).map((group) => (group.id === groupId ? { ...group, ...updates } : group)),
    })
  }

  const handleUpdateGroupSchedule = (groupId: any, day: any, time: any) => {
    setCurrentCourse({
      ...currentCourse,
      groups: (currentCourse.groups || []).map((group) =>
        group.id === groupId ? { ...group, schedule: { ...group.schedule, [day]: time } } : group,
      ),
    })
  }

  const handleRemoveGroup = (groupId: any) => {
    setCurrentCourse({
      ...currentCourse,
      groups: (currentCourse.groups || []).filter((group) => group.id !== groupId),
    })
  }

  return (
    <CrudLayout
      title="Курсы"
      description="Управление курсами вашего образовательного центра"
      createButtonLabel="Создать курс"
      onCreateClick={() => {
        setCurrentCourse({ groups: [] })
        setIsEditing(false)
        setIsDialogOpen(true)
      }}
    >
      <DataTable columns={columns} data={courses} searchKey="name" />

      {/* Модальное окно расписания групп */}
      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Расписание групп</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedGroups?.map((group, index) => (
              <div key={index} className="border rounded-md p-4">
                <h3 className="font-semibold text-lg mb-2">{group.groupNumber}</h3>
                <p className="text-sm mb-2">Возраст: {group.ageRange}</p>
                <div className="space-y-1">
                  {Object.entries(group.schedule)
                    .filter(([_, time]) => time !== undefined)
                    .map(([day, time]) => (
                      <div key={day} className="grid grid-cols-3 text-sm">
                        <span className="font-medium">{day}:</span>
                        <span>
                          {time?.start} - {time?.end}
                        </span>
                      </div>
                    ))}
                </div>
                <p className="text-sm mt-2">
                  Студенты: {group.currentStudents} / {group.maxStudents}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="px-2">
            <DialogTitle>{isEditing ? "Редактировать курс" : "Создать новый курс"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Измените информацию о курсе здесь." : "Заполните информацию о новом курсе здесь."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 px-2 py-4 overflow-y-auto" style={{ maxHeight: "calc(80vh - 200px)" }}>
            {/* Основные поля формы */}
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
                        setCurrentCourse({ ...currentCourse, image: imageUrl })
                      }
                    }}
                  />
                  {currentCourse.image && <span className="text-sm text-muted-foreground">Изображение выбрано</span>}
                </div>
                {currentCourse.image && (
                  <div className="relative h-40 w-full max-w-md rounded-md overflow-hidden border">
                    <Image
                      src={currentCourse.image || "/placeholder.svg"}
                      alt="Предпросмотр"
                      fill
                      className="object-cover"
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
            {/* Раздел групп */}
            <div className="space-y-4 flex flex-col">
              <Label>Группы и расписание</Label>
              {currentCourse.groups?.map((group, index) => (
                <Card key={group.id} className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`group-name-${index}`}>Название группы</Label>
                      <Input
                        id={`group-name-${index}`}
                        value={group.groupNumber}
                        onChange={(e) => handleUpdateGroup(group.id, { groupNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`group-age-${index}`}>Возрастной диапазон</Label>
                      <Input
                        id={`group-age-${index}`}
                        value={group.ageRange}
                        onChange={(e) => handleUpdateGroup(group.id, { ageRange: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Расписание</Label>
                    {["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"].map((day) => (
                      <div key={day} className="grid grid-cols-3 gap-2 items-center">
                        <span>{day}</span>
                        <Input
                          type="time"
                          value={group.schedule[day]?.start || ""}
                          onChange={(e) =>
                            handleUpdateGroupSchedule(group.id, day, {
                              start: e.target.value,
                              end: group.schedule[day]?.end || "",
                            })
                          }
                        />
                        <Input
                          type="time"
                          value={group.schedule[day]?.end || ""}
                          onChange={(e) =>
                            handleUpdateGroupSchedule(group.id, day, {
                              start: group.schedule[day]?.start || "",
                              end: e.target.value,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveGroup(group.id)} className="mt-4">
                    Удалить группу
                  </Button>
                </Card>
              ))}
              <Button onClick={handleAddGroup}>Добавить группу</Button>
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

