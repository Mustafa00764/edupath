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
import { mockCategories } from "@/lib/mockData"

interface Category {
  id: string
  name: string
  courses: number
  students: number
  status: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Partial<Category>>({})
  const [isEditing, setIsEditing] = useState(false)

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Название",
    },
    {
      accessorKey: "courses",
      header: "Курсы",
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
        const category = row.original
        return (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const handleCreateOrUpdate = () => {
    if (isEditing) {
      setCategories(
        categories.map((c) => (c.id === currentCategory.id ? ({ ...c, ...currentCategory } as Category) : c)),
      )
    } else {
      const newCategory: Category = {
        id: (categories.length + 1).toString(),
        name: currentCategory.name || "",
        courses: currentCategory.courses || 0,
        students: currentCategory.students || 0,
        status: currentCategory.status || "Черновик",
      }
      setCategories([...categories, newCategory])
    }
    setIsDialogOpen(false)
    setCurrentCategory({})
    setIsEditing(false)
  }

  const handleEdit = (category: Category) => {
    setCurrentCategory(category)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id))
  }

  return (
    <CrudLayout
      title="Категории"
      description="Управление категориями курсов вашего образовательного центра"
      createButtonLabel="Создать категорию"
      onCreateClick={() => {
        setCurrentCategory({})
        setIsEditing(false)
        setIsDialogOpen(true)
      }}
    >
      <DataTable columns={columns} data={categories} searchKey="name" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Редактировать категорию" : "Создать новую категорию"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Измените информацию о категории здесь." : "Заполните информацию о новой категории здесь."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Название
              </Label>
              <Input
                id="name"
                value={currentCategory.name || ""}
                onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Статус
              </Label>
              <Input
                id="status"
                value={currentCategory.status || ""}
                onChange={(e) =>
                  setCurrentCategory({ ...currentCategory, status: e.target.value as "Активная" | "Черновик" })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateOrUpdate}>{isEditing ? "Сохранить изменения" : "Создать категорию"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CrudLayout>
  )
}

