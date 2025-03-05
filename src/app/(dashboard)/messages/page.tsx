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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"

interface Enrollment {
  id: string
  name: string
  email: string
  phone: string
  course: string
  date: string
  status: "Новая" | "В обработке" | "Завершена"
}

const initialEnrollments: Enrollment[] = [
  {
    id: "1",
    name: "Елена Иванова",
    email: "elena@example.com",
    phone: "+7 (999) 123-45-67",
    course: "Веб-разработка",
    date: "2023-07-01",
    status: "Новая",
  },
  {
    id: "2",
    name: "Александр Петров",
    email: "alex@example.com",
    phone: "+7 (999) 987-65-43",
    course: "Дизайн UX/UI",
    date: "2023-06-30",
    status: "В обработке",
  },
  {
    id: "3",
    name: "Мария Сидорова",
    email: "maria@example.com",
    phone: "+7 (999) 456-78-90",
    course: "Мобильная разработка",
    date: "2023-06-29",
    status: "Завершена",
  },
]

export default function MessagesPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentEnrollment, setCurrentEnrollment] = useState<Partial<Enrollment>>({})
  const [isEditing, setIsEditing] = useState(false)

  const columns: ColumnDef<Enrollment>[] = [
    {
      accessorKey: "name",
      header: "Имя",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Телефон",
    },
    {
      accessorKey: "course",
      header: "Курс",
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
        name: currentEnrollment.name || "",
        email: currentEnrollment.email || "",
        phone: currentEnrollment.phone || "",
        course: currentEnrollment.course || "",
        date: new Date().toISOString().split("T")[0],
        status: currentEnrollment.status || "Новая",
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
      <DataTable columns={columns} data={enrollments} searchKey="name" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Редактировать заявку" : "Создать новую заявку"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Измените информацию о заявке здесь." : "Заполните информацию о новой заявке здесь."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Имя
              </Label>
              <Input
                id="name"
                value={currentEnrollment.name || ""}
                onChange={(e) => setCurrentEnrollment({ ...currentEnrollment, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={currentEnrollment.email || ""}
                onChange={(e) => setCurrentEnrollment({ ...currentEnrollment, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Телефон
              </Label>
              <Input
                id="phone"
                value={currentEnrollment.phone || ""}
                onChange={(e) => setCurrentEnrollment({ ...currentEnrollment, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">
                Курс
              </Label>
              <Input
                id="course"
                value={currentEnrollment.course || ""}
                onChange={(e) => setCurrentEnrollment({ ...currentEnrollment, course: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Статус
              </Label>
              <Select
                value={currentEnrollment.status}
                onValueChange={(value) =>
                  setCurrentEnrollment({ ...currentEnrollment, status: value as "Новая" | "В обработке" | "Завершена" })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Новая">Новая</SelectItem>
                  <SelectItem value="В обработке">В обработке</SelectItem>
                  <SelectItem value="Завершена">Завершена</SelectItem>
                </SelectContent>
              </Select>
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

