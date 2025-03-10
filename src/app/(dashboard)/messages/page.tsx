"use client"

import { DialogFooter } from "@/app/components/ui/dialog"

import { useState } from "react"
import { CrudLayout } from "@/app/components/crud/crud-layout"
import { DataTable } from "@/app/components/crud/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/app/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"

interface Enrollment {
  id: string
  childName: string
  age: number
  parentPhone: string
  courseName: string
  date: string
  status: "Новая" | "В обработке" | "Завершена"
  email: string
}

const initialEnrollments: Enrollment[] = [
  {
    id: "1",
    childName: "Иван Иванов",
    age: 7,
    parentPhone: "+375 29 1234567",
    courseName: "Веб-разработка",
    date: "2023-07-01",
    status: "Новая",
    email: "elena@example.com",
  },
  {
    id: "2",
    childName: "Петр Петров",
    age: 10,
    parentPhone: "+375 33 9876543",
    courseName: "Дизайн UX/UI",
    date: "2023-06-30",
    status: "В обработке",
    email: "alex@example.com",
  },
  {
    id: "3",
    childName: "Сидор Сидоров",
    age: 12,
    parentPhone: "+375 44 5554433",
    courseName: "Мобильная разработка",
    date: "2023-06-29",
    status: "Завершена",
    email: "maria@example.com",
  },
]

const formatPhoneNumber = (input: string) => {
  const cleaned = input.replace(/\D/g, "")
  const match = cleaned.match(/^(\d{3})(\d{2})(\d{7})$/)
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]}`
  }
  return input
}

export default function MessagesPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentEnrollment, setCurrentEnrollment] = useState<Partial<Enrollment>>({})
  const [isEditing, setIsEditing] = useState(false)

  const columns: ColumnDef<Enrollment>[] = [
    {
      accessorKey: "childName",
      header: "ФИ ребенка",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "parentPhone",
      header: "Телефон родителя",
    },
    {
      accessorKey: "courseName",
      header: "Название курса",
    },
    {
      accessorKey: "date",
      header: "Дата",
    },
    {
      accessorKey: "status",
      header: "Статус",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const enrollment = row.original
        return (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(enrollment)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(enrollment.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const handleCreateOrUpdate = () => {
    if (isEditing) {
      setEnrollments(
        enrollments.map((e) => (e.id === currentEnrollment.id ? ({ ...e, ...currentEnrollment } as Enrollment) : e)),
      )
    } else {
      const newEnrollment: Enrollment = {
        id: (enrollments.length + 1).toString(),
        childName: currentEnrollment.childName || "",
        age: currentEnrollment.age || 0,
        parentPhone: currentEnrollment.parentPhone || "",
        courseName: currentEnrollment.courseName || "",
        date: new Date().toISOString().split("T")[0],
        status: currentEnrollment.status || "Новая",
        email: currentEnrollment.email || "",
      }
      setEnrollments([...enrollments, newEnrollment])
    }
    setIsDialogOpen(false)
    setCurrentEnrollment({})
    setIsEditing(false)
  }

  const handleEdit = (enrollment: Enrollment) => {
    setCurrentEnrollment(enrollment)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setEnrollments(enrollments.filter((e) => e.id !== id))
  }

  return (
    <CrudLayout
      title="Заявки"
      description="Управление заявками на курсы от пользователей"
      createButtonLabel="Создать заявку"
      onCreateClick={() => {
        setCurrentEnrollment({})
        setIsEditing(false)
        setIsDialogOpen(true)
      }}
    >
      <DataTable columns={columns} data={enrollments} searchKey="childName" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Редактировать заявку" : "Создать новую заявку"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Измените информацию о заявке здесь." : "Заполните информацию о новой заявке здесь."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="childName">ФИ ребенка</Label>
                <Input
                  id="childName"
                  value={currentEnrollment.childName || ""}
                  onChange={(e) => setCurrentEnrollment({ ...currentEnrollment, childName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Возраст</Label>
                <Input
                  id="age"
                  type="number"
                  value={currentEnrollment.age || ""}
                  onChange={(e) => setCurrentEnrollment({ ...currentEnrollment, age: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentPhone">Телефон родителя</Label>
              <Input
                id="parentPhone"
                value={currentEnrollment.parentPhone || ""}
                onChange={(e) =>
                  setCurrentEnrollment({ ...currentEnrollment, parentPhone: formatPhoneNumber(e.target.value) })
                }
                placeholder="+375 29 1234567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseName">Название курса</Label>
              <Input
                id="courseName"
                value={currentEnrollment.courseName || ""}
                onChange={(e) => setCurrentEnrollment({ ...currentEnrollment, courseName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Дата</Label>
              <Input
                id="date"
                type="date"
                value={currentEnrollment.date || ""}
                onChange={(e) => setCurrentEnrollment({ ...currentEnrollment, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select
                value={currentEnrollment.status}
                onValueChange={(value) =>
                  setCurrentEnrollment({ ...currentEnrollment, status: value as "Новая" | "В обработке" | "Завершена" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Новая">Новая</SelectItem>
                  <SelectItem value="В обработке">В обработке</SelectItem>
                  <SelectItem value="Завершена">Завершена</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={currentEnrollment.email || ""}
                onChange={(e) => setCurrentEnrollment({ ...currentEnrollment, email: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateOrUpdate}>{isEditing ? "Сохранить изменения" : "Создать заявку"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CrudLayout>
  )
}

