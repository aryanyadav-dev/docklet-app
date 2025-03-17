"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Github, PlayCircle, Smartphone, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ProjectList({ projects }) {
  const router = useRouter()
  const { toast } = useToast()
  const [runBuildDialogOpen, setRunBuildDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const handleViewDetails = (projectId) => {
    router.push(`/dashboard/projects/${projectId}`)
  }

  const handleRunBuild = (project) => {
    setSelectedProject(project)
    setRunBuildDialogOpen(true)
  }

  const handleDeleteProject = (project, e) => {
    e.stopPropagation()
    setSelectedProject(project)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteProject = () => {
    // Get projects from localStorage
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      const projectsArray = JSON.parse(savedProjects)
      const updatedProjects = projectsArray.filter(p => p.id !== selectedProject.id)
      
      // Save updated projects to localStorage
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
      
      // Update UI through parent component
      toast({
        title: "Project deleted",
        description: `${selectedProject.name} has been deleted successfully.`,
      })
      
      // Close dialog
      setDeleteDialogOpen(false)
      
      // Force a refresh of the page to show updated projects
      window.location.reload()
    }
  }

  const startBuild = () => {
    // Generate a random build status (80% success, 20% failed)
    const buildStatus = Math.random() < 0.8 ? "success" : "failed"
    
    // Generate a random build duration between 2-10 minutes
    const minutes = Math.floor(Math.random() * 8) + 2
    const seconds = Math.floor(Math.random() * 60)
    const duration = `${minutes}m ${seconds}s`
    
    // Generate a unique build ID
    const buildId = `B-${Math.floor(Math.random() * 10000)}`
    
    // Create a new build object
    const newBuild = {
      id: buildId,
      project: selectedProject.name,
      branch: "main",
      commit: Math.random().toString(36).substring(2, 8),
      status: buildStatus,
      duration: duration,
      timestamp: new Date().toLocaleString(),
      triggeredBy: "Current User",
    }
    
    // Get existing builds from localStorage
    const savedBuilds = localStorage.getItem("builds")
    let builds = []
    
    if (savedBuilds) {
      builds = JSON.parse(savedBuilds)
    }
    
    // Add the new build to the beginning of the array
    builds.unshift(newBuild)
    
    // Save updated builds to localStorage
    localStorage.setItem("builds", JSON.stringify(builds))
    
    // Update the project's last build info
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      const projectsArray = JSON.parse(savedProjects)
      const updatedProjects = projectsArray.map(p => {
        if (p.id === selectedProject.id) {
          return {
            ...p,
            lastBuild: "Just now",
            status: buildStatus
          }
        }
        return p
      })
      
      // Save updated projects to localStorage
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
    }
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("buildsUpdated"))
    
    toast({
      title: "Build started",
      description: `Build for ${selectedProject.name} has been started.`,
    })
    
    setRunBuildDialogOpen(false)

    // Navigate to build details page
    setTimeout(() => {
      router.push("/dashboard/build-details")
    }, 500)
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{project.name}</CardTitle>
                <Badge variant={project.status === "success" ? "success" : "destructive"}>
                  {project.status === "success" ? "Healthy" : "Issues"}
                </Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <span>{project.platform}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{project.lastBuild}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <Github className="h-4 w-4" />
                <span>{project.repo}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(project.id)}>
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={(e) => handleDeleteProject(project, e)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Button size="sm" className="gap-1" onClick={() => handleRunBuild(project)}>
                <PlayCircle className="h-4 w-4" />
                Run Build
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Run Build Dialog */}
      <Dialog open={runBuildDialogOpen} onOpenChange={setRunBuildDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run Build</DialogTitle>
            <DialogDescription>{selectedProject && `Start a new build for ${selectedProject.name}`}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Platform</span>
                <span>{selectedProject?.platform}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Branch</span>
                <span>main</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Configuration</span>
                <span>Release</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRunBuildDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={startBuild}>Start Build</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedProject?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteProject}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

