"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { Search } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  registrationDate: string
  status: "Активный" | "Неактивный"
  avatar: string
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Анна Иванова",
    email: "anna@example.com",
    registrationDate: "2023-05-15",
    status: "Активный",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Петр Сидоров",
    email: "petr@example.com",
    registrationDate: "2023-06-20",
    status: "Активный",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Елена Петрова",
    email: "elena@example.com",
    registrationDate: "2023-07-05",
    status: "Неактивный",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Максим Волков",
    email: "maxim@example.com",
    registrationDate: "2023-08-10",
    status: "Активный",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Ольга Соколова",
    email: "olga@example.com",
    registrationDate: "2023-09-01",
    status: "Активный",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = () => {
      setTimeout(() => {
        setUsers(initialUsers)
        setIsLoading(false)
      }, 1000)
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[400px]">Загрузка пользователей...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Пользователи</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Управление пользователями</CardTitle>
          <CardDescription>Просмотр и управление пользователями, зарегистрированными на вашем сайте.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск пользователей..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <div className="w-full overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap min-w-[180px]">Пользователь</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[180px]">Email</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[150px]">Дата регистрации</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Статус</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="whitespace-nowrap min-w-[180px]">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap min-w-[180px]">{user.email}</TableCell>
                        <TableCell className="whitespace-nowrap min-w-[150px]">{user.registrationDate}</TableCell>
                        <TableCell className="whitespace-nowrap min-w-[120px]">
                          <Badge variant={user.status === "Активный" ? "default" : "secondary"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap min-w-[120px]">
                          <Button variant="ghost" size="sm">
                            Подробнее
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">Пользователи не найдены</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

