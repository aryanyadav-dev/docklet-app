"use client"

import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Clock, Download, ExternalLink, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function BuildList({ builds = [] }) {
  const router = useRouter()
  const { toast } = useToast()

  // Default builds if none are provided
  const defaultBuilds = [
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

  // Use provided builds or default builds
  const displayBuilds = builds.length > 0 ? builds : defaultBuilds

  const handleViewBuild = (buildId) => {
    router.push("/dashboard/build-details")
  }

  const handleDownloadArtifact = (buildId) => {
    toast({
      title: "Downloading artifact",
      description: `Artifact for build ${buildId} is being downloaded.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Build</TableHead>
            <TableHead>Project</TableHead>
            <TableHead className="hidden md:table-cell">Branch</TableHead>
            <TableHead className="hidden md:table-cell">Commit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Duration</TableHead>
            <TableHead className="hidden lg:table-cell">Triggered By</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayBuilds.length > 0 ? (
            displayBuilds.map((build) => (
              <TableRow key={build.id}>
                <TableCell className="font-medium">{build.id}</TableCell>
                <TableCell>{build.project}</TableCell>
                <TableCell className="hidden md:table-cell">{build.branch}</TableCell>
                <TableCell className="hidden md:table-cell">{build.commit}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      build.status === "success" ? "success" : build.status === "running" ? "outline" : "destructive"
                    }
                    className="flex w-fit items-center gap-1"
                  >
                    {build.status === "success" && <CheckCircle className="h-3 w-3" />}
                    {build.status === "running" && <Clock className="h-3 w-3" />}
                    {build.status === "failed" && <XCircle className="h-3 w-3" />}
                    <span className="capitalize">{build.status}</span>
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{build.duration}</TableCell>
                <TableCell className="hidden lg:table-cell">{build.triggeredBy}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleViewBuild(build.id)}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    {build.status === "success" && (
                      <Button variant="ghost" size="icon" onClick={() => handleDownloadArtifact(build.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                No builds found matching your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

