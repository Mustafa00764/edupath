"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Overview } from "@/app/components/dashboard/overview"
import { RecentActivity } from "@/app/components/dashboard/recent-activity"
import { StatsCards } from "@/app/components/dashboard/stats-cards"
import { mockDashboardStats } from "@/lib/mockData"

interface DashboardStats {
  totalStudents: number
  activeCourses: number
  totalRevenue: number
  completionRate: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = () => {
      try {
        setTimeout(() => {
          setStats(mockDashboardStats)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError("Не удалось загрузить статистику панели управления")
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <div>Загрузка панели управления...</div>
  if (error) return <div>Ошибка: {error}</div>
  if (!stats) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Панель управления</h2>
      </div>

      <StatsCards stats={stats} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Обзор</CardTitle>
            <CardDescription>Зачисление студентов и показатели завершения курсов за последние 30 дней</CardDescription>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Последняя активность</CardTitle>
            <CardDescription>Последние действия в вашем образовательном центре</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

