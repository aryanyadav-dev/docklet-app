import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BuildTrends } from "@/components/analytics/build-trends"
import { TestCoverage } from "@/components/analytics/test-coverage"
import { PerformanceMetrics } from "@/components/analytics/performance-metrics"
import { ResourceUsage } from "@/components/analytics/resource-usage"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Analytics</h1>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="builds">Build Analytics</TabsTrigger>
              <TabsTrigger value="tests">Test Analytics</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6">
                <BuildTrends />
                <TestCoverage />
                <PerformanceMetrics />
                <ResourceUsage />
              </div>
            </TabsContent>

            <TabsContent value="builds">
              <BuildTrends detailed />
            </TabsContent>

            <TabsContent value="tests">
              <TestCoverage detailed />
            </TabsContent>

            <TabsContent value="performance">
              <PerformanceMetrics detailed />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

