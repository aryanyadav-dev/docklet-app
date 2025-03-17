"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CheckCircle, Clock, XCircle } from "lucide-react"

export function StatsCards() {
  const [totalBuilds, setTotalBuilds] = useState(0)
  const [failedBuilds, setFailedBuilds] = useState(0)
  const [successRate, setSuccessRate] = useState("0")
  const [avgBuildTime, setAvgBuildTime] = useState("0m 0s")

  useEffect(() => {
    // Load builds from localStorage
    const loadBuilds = () => {
      const savedBuilds = localStorage.getItem("builds")
      let builds = []
      
      if (savedBuilds) {
        builds = JSON.parse(savedBuilds)
      } else {
        // Default builds if none exist
        builds = [
          {
            id: "B-1234",
            project: "Shopping App",
            branch: "main",
            commit: "a1b2c3d",
            status: "success",
            duration: "6m 12s",
            timestamp: "2023-03-15 14:32",
            triggeredBy: "John Doe",
          },
          {
            id: "B-1233",
            project: "Shopping App",
            branch: "feature/checkout",
            commit: "e4f5g6h",
            status: "running",
            duration: "2m 45s",
            timestamp: "2023-03-15 13:18",
            triggeredBy: "Jane Smith",
          },
          {
            id: "B-1232",
            project: "Fitness Tracker",
            branch: "main",
            commit: "i7j8k9l",
            status: "success",
            duration: "8m 33s",
            timestamp: "2023-03-15 11:05",
            triggeredBy: "John Doe",
          },
          {
            id: "B-1231",
            project: "Weather App",
            branch: "fix/location",
            commit: "m1n2o3p",
            status: "failed",
            duration: "4m 17s",
            timestamp: "2023-03-15 09:47",
            triggeredBy: "Alex Johnson",
          },
          {
            id: "B-1230",
            project: "Task Manager",
            branch: "main",
            commit: "q4r5s6t",
            status: "success",
            duration: "5m 52s",
            timestamp: "2023-03-14 16:23",
            triggeredBy: "Sarah Williams",
          },
        ]
        localStorage.setItem("builds", JSON.stringify(builds))
      }

      // Calculate stats
      setTotalBuilds(builds.length)
      
      const failed = builds.filter(build => build.status === "failed").length
      setFailedBuilds(failed)
      
      const successRateValue = builds.length > 0 
        ? ((builds.length - failed) / builds.length * 100).toFixed(1) 
        : "0"
      setSuccessRate(successRateValue)
      
      // Calculate average build time
      if (builds.length > 0) {
        const buildTimes = builds
          .filter(build => build.duration && typeof build.duration === 'string' && build.duration.includes('m '))
          .map(build => {
            try {
              const [minutes, seconds] = build.duration.split('m ');
              return parseInt(minutes) * 60 + parseInt(seconds.replace('s', ''));
            } catch (error) {
              console.error("Error parsing build duration:", build.duration);
              return 0; // Return 0 seconds for invalid durations
            }
          })
        
        if (buildTimes.length > 0) {
          const avgSeconds = Math.floor(buildTimes.reduce((a, b) => a + b, 0) / buildTimes.length)
          const avgMinutes = Math.floor(avgSeconds / 60)
          const remainingSeconds = avgSeconds % 60
          setAvgBuildTime(`${avgMinutes}m ${remainingSeconds}s`)
        }
      }
    }

    // Initial load
    loadBuilds()

    // Set up event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "builds") {
        loadBuilds()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    
    // Custom event for local updates (when builds are added in the same window)
    window.addEventListener("buildsUpdated", loadBuilds)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("buildsUpdated", loadBuilds)
    }
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Builds</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBuilds}</div>
          <p className="text-xs text-muted-foreground">Updated in real-time</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{successRate}%</div>
          <p className="text-xs text-muted-foreground">Based on all builds</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Failed Builds</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{failedBuilds}</div>
          <p className="text-xs text-muted-foreground">Updated in real-time</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Build Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgBuildTime}</div>
          <p className="text-xs text-muted-foreground">Across all builds</p>
        </CardContent>
      </Card>
    </div>
  )
}

