import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { EnrollmentChart } from "@/app/components/statistics/enrollment-chart"
import { RevenueChart } from "@/app/components/statistics/revenue-chart"
import { CompletionRateChart } from "@/app/components/statistics/completion-rate-chart"
import { StudentDemographicsChart } from "@/app/components/statistics/student-demographics-chart"

export default function StatisticsPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
      </div>

      <Tabs defaultValue="enrollment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="completion">Completion Rates</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="enrollment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Enrollment</CardTitle>
              <CardDescription>Monthly student enrollment data for the past year</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <EnrollmentChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Monthly revenue breakdown by course category and payment method</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <RevenueChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Completion Rates</CardTitle>
              <CardDescription>Percentage of students who complete each course</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <CompletionRateChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Demographics</CardTitle>
              <CardDescription>Breakdown of student demographics by age, location, and background</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <StudentDemographicsChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

