"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function ResourceUsage() {
  const resourceData = [
    { month: "Jan", cpu: 65, memory: 75, storage: 45 },
    { month: "Feb", cpu: 70, memory: 80, storage: 50 },
    { month: "Mar", cpu: 75, memory: 85, storage: 55 },
    { month: "Apr", cpu: 80, memory: 90, storage: 60 },
    { month: "May", cpu: 85, memory: 95, storage: 65 },
    { month: "Jun", cpu: 90, memory: 100, storage: 70 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Usage</CardTitle>
        <CardDescription>CPU, memory, and storage utilization over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            cpu: {
              label: "CPU Usage",
              color: "hsl(var(--chart-1))",
            },
            memory: {
              label: "Memory Usage",
              color: "hsl(var(--chart-2))",
            },
            storage: {
              label: "Storage Usage",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <LineChart data={resourceData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="cpu" stroke="var(--color-cpu)" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="memory" stroke="var(--color-memory)" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="storage" stroke="var(--color-storage)" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

