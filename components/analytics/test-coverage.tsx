"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function TestCoverage({ detailed = false }) {
  const coverageData = [
    { month: "Jan", line: 78, branch: 65, method: 82 },
    { month: "Feb", line: 80, branch: 68, method: 85 },
    { month: "Mar", line: 82, branch: 70, method: 87 },
    { month: "Apr", line: 85, branch: 72, method: 89 },
    { month: "May", line: 83, branch: 71, method: 88 },
    { month: "Jun", line: 86, branch: 74, method: 90 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Coverage</CardTitle>
        <CardDescription>Code coverage metrics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <ChartContainer
            config={{
              line: {
                label: "Line Coverage",
                color: "hsl(var(--chart-1))",
              },
              branch: {
                label: "Branch Coverage",
                color: "hsl(var(--chart-2))",
              },
              method: {
                label: "Method Coverage",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <AreaChart data={coverageData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="line"
                stroke="var(--color-line)"
                fill="var(--color-line)"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="branch"
                stroke="var(--color-branch)"
                fill="var(--color-branch)"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="method"
                stroke="var(--color-method)"
                fill="var(--color-method)"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ChartContainer>

          {detailed && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Line Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600">86%</div>
                  <div className="text-sm text-muted-foreground">+8% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Branch Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600">74%</div>
                  <div className="text-sm text-muted-foreground">+9% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Method Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600">90%</div>
                  <div className="text-sm text-muted-foreground">+8% from last month</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

