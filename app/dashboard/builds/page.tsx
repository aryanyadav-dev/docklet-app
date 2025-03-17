"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BuildList } from "@/components/dashboard/build-list"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function BuildsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [filterProject, setFilterProject] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState("")
  const [isRunBuildDialogOpen, setIsRunBuildDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState("shopping-app")
  const [filteredBuilds, setFilteredBuilds] = useState([])
  const [projects, setProjects] = useState([])

  // Default builds data
  const defaultBuilds = [
    {
      id: "B-1234",
      project: "Shopping App",
      projectSlug: "shopping-app",
      branch: "main",
      commit: "a1b2c3d",
      status: "success",
      duration: "6m 12s",
      timestamp: "2023-03-15 14:32",
      date: "2023-03-15",
      triggeredBy: "John Doe",
    },
    {
      id: "B-1233",
      project: "Shopping App",
      projectSlug: "shopping-app",
      branch: "feature/checkout",
      commit: "e4f5g6h",
      status: "running",
      duration: "2m 45s",
      timestamp: "2023-03-15 13:18",
      date: "2023-03-15",
      triggeredBy: "Jane Smith",
    },
    {
      id: "B-1232",
      project: "Fitness Tracker",
      projectSlug: "fitness-tracker",
      branch: "main",
      commit: "i7j8k9l",
      status: "success",
      duration: "8m 33s",
      timestamp: "2023-03-15 11:05",
      date: "2023-03-15",
      triggeredBy: "John Doe",
    },
    {
      id: "B-1231",
      project: "Weather App",
      projectSlug: "weather-app",
      branch: "fix/location",
      commit: "m1n2o3p",
      status: "failed",
      duration: "4m 17s",
      timestamp: "2023-03-15 09:47",
      date: "2023-03-15",
      triggeredBy: "Alex Johnson",
    },
    {
      id: "B-1230",
      project: "Task Manager",
      projectSlug: "task-manager",
      branch: "main",
      commit: "q4r5s6t",
      status: "success",
      duration: "5m 52s",
      timestamp: "2023-03-14 16:23",
      date: "2023-03-14",
      triggeredBy: "Sarah Williams",
    },
    {
      id: "B-1229",
      project: "Shopping App",
      projectSlug: "shopping-app",
      branch: "feature/wishlist",
      commit: "u7v8w9x",
      status: "failed",
      duration: "7m 19s",
      timestamp: "2023-03-14 14:05",
      date: "2023-03-14",
      triggeredBy: "John Doe",
    },
    {
      id: "B-1228",
      project: "Fitness Tracker",
      projectSlug: "fitness-tracker",
      branch: "fix/sync",
      commit: "y1z2a3b",
      status: "success",
      duration: "6m 44s",
      timestamp: "2023-03-14 11:32",
      date: "2023-03-14",
      triggeredBy: "Jane Smith",
    },
    {
      id: "B-1227",
      project: "Weather App",
      projectSlug: "weather-app",
      branch: "main",
      commit: "c4d5e6f",
      status: "success",
      duration: "5m 21s",
      timestamp: "2023-03-13 16:47",
      date: "2023-03-13",
      triggeredBy: "Alex Johnson",
    },
  ]

  // Load projects from localStorage on initial render
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  // Apply filters whenever filter values change
  useEffect(() => {
    let filtered = [...defaultBuilds]
    
    // Filter by project
    if (filterProject !== "all") {
      filtered = filtered.filter(build => build.projectSlug === filterProject)
    }
    
    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(build => build.status === filterStatus)
    }
    
    // Filter by date
    if (filterDate) {
      filtered = filtered.filter(build => build.date === filterDate)
    }
    
    setFilteredBuilds(filtered)
  }, [filterProject, filterStatus, filterDate])

  const handleRunNewBuild = () => {
    setIsRunBuildDialogOpen(true)
  }

  const startBuild = () => {
    toast({
      title: "Build started",
      description: `Build for ${projects.find(p => p.name.toLowerCase().replace(/\s+/g, "-") === selectedProject)?.name || selectedProject} has been started.`,
    })
    setIsRunBuildDialogOpen(false)

    // Navigate to build details page
    setTimeout(() => {
      router.push("/dashboard/build-details")
    }, 500)
  }

  const clearFilters = () => {
    setFilterProject("all")
    setFilterStatus("all")
    setFilterDate("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Builds</h1>
            <div className="mt-4 md:mt-0">
              <Button onClick={handleRunNewBuild}>Run New Build</Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Filter Builds</CardTitle>
              <CardDescription>Filter builds by project, status, or date range</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="filter-project">Project</Label>
                  <Select value={filterProject} onValueChange={setFilterProject}>
                    <SelectTrigger id="filter-project">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="shopping-app">Shopping App</SelectItem>
                      <SelectItem value="fitness-tracker">Fitness Tracker</SelectItem>
                      <SelectItem value="weather-app">Weather App</SelectItem>
                      <SelectItem value="task-manager">Task Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filter-status">Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger id="filter-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filter-date">Date</Label>
                  <Input 
                    id="filter-date" 
                    type="date" 
                    value={filterDate} 
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                </div>

                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    Clear Filters
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Showing {filteredBuilds.length} of {defaultBuilds.length} builds</span>
                {(filterProject !== "all" || filterStatus !== "all" || filterDate) && (
                  <span>
                    Filters: 
                    {filterProject !== "all" && ` Project: ${filterProject.replace(/-/g, " ")}`}
                    {filterStatus !== "all" && ` Status: ${filterStatus}`}
                    {filterDate && ` Date: ${filterDate}`}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          <BuildList builds={filteredBuilds} />
        </div>
      </main>

      {/* Run Build Dialog */}
      <Dialog open={isRunBuildDialogOpen} onOpenChange={setIsRunBuildDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run New Build</DialogTitle>
            <DialogDescription>Start a new build for your project</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="build-project">Project</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger id="build-project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shopping-app">Shopping App</SelectItem>
                    <SelectItem value="fitness-tracker">Fitness Tracker</SelectItem>
                    <SelectItem value="weather-app">Weather App</SelectItem>
                    <SelectItem value="task-manager">Task Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="build-branch">Branch</Label>
                <Select defaultValue="main">
                  <SelectTrigger id="build-branch">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">main</SelectItem>
                    <SelectItem value="develop">develop</SelectItem>
                    <SelectItem value="feature/checkout">feature/checkout</SelectItem>
                    <SelectItem value="feature/wishlist">feature/wishlist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="build-config">Configuration</Label>
                <Select defaultValue="release">
                  <SelectTrigger id="build-config">
                    <SelectValue placeholder="Select configuration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="release">Release</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRunBuildDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={startBuild}>Start Build</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

