"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function BuildTrends({ detailed = false }) {
  const buildData = [
    { month: "Jan", successful: 186, failed: 12, duration: 320 },
    { month: "Feb", successful: 305, failed: 15, duration: 280 },
    { month: "Mar", successful: 237, failed: 8, duration: 250 },
    { month: "Apr", successful: 273, failed: 19, duration: 310 },
    { month: "May", successful: 209, failed: 13, duration: 290 },
    { month: "Jun", successful: 214, failed: 10, duration: 270 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Build Trends</CardTitle>
        <CardDescription>Overview of build success rates and durations over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium mb-2">Build Success vs Failures</h4>
            <ChartContainer
              config={{
                successful: {
                  label: "Successful Builds",
                  color: "hsl(var(--chart-1))",
                },
                failed: {
                  label: "Failed Builds",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={buildData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="successful" fill="var(--color-successful)" radius={4} />
                <Bar dataKey="failed" fill="var(--color-failed)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>

          {detailed && (
            <div>
              <h4 className="text-sm font-medium mb-2">Average Build Duration</h4>
              <ChartContainer
                config={{
                  duration: {
                    label: "Duration (seconds)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <LineChart data={buildData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="duration"
                    stroke="var(--color-duration)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

