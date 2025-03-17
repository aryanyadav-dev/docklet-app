import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, ExternalLink, FileText, Image, Package, Smartphone } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export function BuildArtifacts() {
  const { toast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)
  
  const artifacts = [
    {
      name: "app-release-signed.apk",
      type: "APK",
      size: "8.4 MB",
      path: "/builds/1234/app-release-signed.apk",
    },
    {
      name: "app-release-unsigned.apk",
      type: "APK",
      size: "8.3 MB",
      path: "/builds/1234/app-release-unsigned.apk",
    },
    {
      name: "mapping.txt",
      type: "ProGuard Mapping",
      size: "1.2 MB",
      path: "/builds/1234/mapping.txt",
    },
    {
      name: "build-info.json",
      type: "Metadata",
      size: "4.5 KB",
      path: "/builds/1234/build-info.json",
    },
    {
      name: "test-results.xml",
      type: "Test Results",
      size: "12.8 KB",
      path: "/builds/1234/test-results.xml",
    },
    {
      name: "screenshots",
      type: "Directory",
      size: "2.1 MB",
      path: "/builds/1234/screenshots",
    },
  ]

  const getArtifactIcon = (type) => {
    switch (type) {
      case "APK":
        return <Package className="h-5 w-5 text-green-500" />
      case "ProGuard Mapping":
        return <FileText className="h-5 w-5 text-orange-500" />
      case "Metadata":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "Test Results":
        return <FileText className="h-5 w-5 text-purple-500" />
      case "Directory":
        return <Image className="h-5 w-5 text-teal-500" />
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />
    }
  }
  
  const handleDownload = (artifactName) => {
    setIsDownloading(true)
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false)
      
      toast({
        title: "Download complete",
        description: `${artifactName} has been downloaded successfully.`,
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            App Distribution
          </CardTitle>
          <CardDescription>
            The app has been distributed to the QA team via Firebase App Distribution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Button className="gap-1" asChild>
              <a href="https://appdistribution.firebase.dev/i/abcd1234" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Open Distribution Page
              </a>
            </Button>
            <Button 
              className="gap-1"
              onClick={() => handleDownload("app-release-signed.apk")}
              disabled={isDownloading}
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download App"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Build Artifacts</CardTitle>
          <CardDescription>Files generated during the build process.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artifacts.map((artifact) => (
                <TableRow key={artifact.path}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getArtifactIcon(artifact.type)}
                      <span>{artifact.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{artifact.type}</TableCell>
                  <TableCell>{artifact.size}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => handleDownload(artifact.name)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

