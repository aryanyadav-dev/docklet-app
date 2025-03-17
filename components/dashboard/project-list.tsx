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

