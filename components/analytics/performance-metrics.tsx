"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function PerformanceMetrics({ detailed = false }) {
  const performanceData = [
    { month: "Jan", buildTime: 320, testTime: 180, deployTime: 60 },
    { month: "Feb", buildTime: 280, testTime: 160, deployTime: 55 },
    { month: "Mar", buildTime: 250, testTime: 150, deployTime: 50 },
    { month: "Apr", buildTime: 310, testTime: 170, deployTime: 58 },
    { month: "May", buildTime: 290, testTime: 165, deployTime: 54 },
    { month: "Jun", buildTime: 270, testTime: 155, deployTime: 52 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Build, test, and deployment performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <ChartContainer
            config={{
              buildTime: {
                label: "Build Time",
                color: "hsl(var(--chart-1))",
              },
              testTime: {
                label: "Test Time",
                color: "hsl(var(--chart-2))",
              },
              deployTime: {
                label: "Deploy Time",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <LineChart data={performanceData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="buildTime"
                stroke="var(--color-buildTime)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line type="monotone" dataKey="testTime" stroke="var(--color-testTime)" strokeWidth={2} dot={{ r: 4 }} />
              <Line
                type="monotone"
                dataKey="deployTime"
                stroke="var(--color-deployTime)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ChartContainer>

          {detailed && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Build Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600">4m 30s</div>
                  <div className="text-sm text-muted-foreground">-15% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Test Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600">2m 35s</div>
                  <div className="text-sm text-muted-foreground">-10% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Deploy Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600">52s</div>
                  <div className="text-sm text-muted-foreground">-5% from last month</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

