"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { ProjectList } from "@/components/dashboard/project-list"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function ProjectsPage() {
  const { toast } = useToast()
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false)
  const [isImportRepoDialogOpen, setIsImportRepoDialogOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    platform: "Android",
  })

  // Load projects from localStorage on initial render
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      // Default projects if none exist
      const defaultProjects = [
        {
          id: 1,
          name: "Shopping App",
          description: "E-commerce mobile application",
          platform: "Android",
          lastBuild: "2 hours ago",
          status: "success",
          repo: "github.com/acme/shopping-app",
        },
        {
          id: 2,
          name: "Fitness Tracker",
          description: "Health and fitness tracking app",
          platform: "iOS",
          lastBuild: "1 day ago",
          status: "success",
          repo: "github.com/acme/fitness-tracker",
        },
        {
          id: 3,
          name: "Weather App",
          description: "Real-time weather forecasting",
          platform: "Flutter",
          lastBuild: "3 days ago",
          status: "failed",
          repo: "github.com/acme/weather-app",
        },
        {
          id: 4,
          name: "Task Manager",
          description: "Productivity and task management",
          platform: "React Native",
          lastBuild: "5 days ago",
          status: "success",
          repo: "github.com/acme/task-manager",
        },
      ]
      setProjects(defaultProjects)
      localStorage.setItem("projects", JSON.stringify(defaultProjects))
    }
  }, [])

  const handleCreateProject = () => {
    if (!newProject.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Project name is required",
      })
      return
    }

    const newId = Math.max(0, ...projects.map((p) => p.id)) + 1
    const project = {
      id: newId,
      name: newProject.name,
      description: newProject.description,
      platform: newProject.platform,
      lastBuild: "Just now",
      status: "success",
      repo: `github.com/acme/${newProject.name.toLowerCase().replace(/\s+/g, "-")}`,
    }

    const updatedProjects = [...projects, project]
    setProjects(updatedProjects)

    // Save to localStorage
    localStorage.setItem("projects", JSON.stringify(updatedProjects))

    setIsNewProjectDialogOpen(false)
    setNewProject({ name: "", description: "", platform: "Android" })

    toast({
      title: "Project created",
      description: `${newProject.name} has been created successfully.`,
    })
  }

  const handleImportRepository = () => {
    toast({
      title: "Repository imported",
      description: "The repository has been imported successfully.",
    })
    setIsImportRepoDialogOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button onClick={() => setIsNewProjectDialogOpen(true)}>New Project</Button>
              <Button variant="outline" onClick={() => setIsImportRepoDialogOpen(true)}>
                Import Repository
              </Button>
            </div>
          </div>

          <ProjectList projects={projects} />
        </div>
      </main>

      {/* New Project Dialog */}
      <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Add a new project to your Docklet workspace.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="My Awesome App"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-description">Description</Label>
              <Input
                id="project-description"
                placeholder="A brief description of your project"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-platform">Platform</Label>
              <Select
                value={newProject.platform}
                onValueChange={(value) => setNewProject({ ...newProject, platform: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Android">Android</SelectItem>
                  <SelectItem value="iOS">iOS</SelectItem>
                  <SelectItem value="Flutter">Flutter</SelectItem>
                  <SelectItem value="React Native">React Native</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Repository Dialog */}
      <Dialog open={isImportRepoDialogOpen} onOpenChange={setIsImportRepoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Repository</DialogTitle>
            <DialogDescription>Import an existing repository to Docklet.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="repo-url">Repository URL</Label>
              <Input id="repo-url" placeholder="https://github.com/username/repo" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="repo-branch">Branch</Label>
              <Input id="repo-branch" placeholder="main" defaultValue="main" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="repo-platform">Platform</Label>
              <Select defaultValue="Android">
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Android">Android</SelectItem>
                  <SelectItem value="iOS">iOS</SelectItem>
                  <SelectItem value="Flutter">Flutter</SelectItem>
                  <SelectItem value="React Native">React Native</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportRepoDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImportRepository}>Import Repository</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

