import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, RotateCcw, XCircle } from "lucide-react"

export function PipelineHistory() {
  const history = [
    {
      id: "R-1234",
      version: "v12",
      status: "success",
      timestamp: "2023-03-15 14:32",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      changes: ["Added Firebase distribution step", "Updated Gradle version to 7.4.2"],
    },
    {
      id: "R-1233",
      version: "v11",
      status: "running",
      timestamp: "2023-03-14 11:18",
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      changes: ["Added UI testing step", "Configured emulator parameters"],
    },
    {
      id: "R-1232",
      version: "v10",
      status: "failed",
      timestamp: "2023-03-12 09:45",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      changes: ["Updated signing configuration", "Added Play Store deployment"],
    },
    {
      id: "R-1231",
      version: "v9",
      status: "success",
      timestamp: "2023-03-10 16:22",
      user: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SW",
      },
      changes: ["Optimized Gradle cache configuration", "Added parallel build support"],
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "running":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {history.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>{item.version}</CardTitle>
                <Badge
                  variant={
                    item.status === "success" ? "success" : item.status === "running" ? "outline" : "destructive"
                  }
                  className="flex items-center gap-1"
                >
                  {getStatusIcon(item.status)}
                  <span className="capitalize">{item.status}</span>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <RotateCcw className="h-4 w-4" />
                  Restore
                </Button>
              </div>
            </div>
            <CardDescription className="flex items-center gap-2">
              <span>{item.timestamp}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={item.user.avatar} alt={item.user.name} />
                  <AvatarFallback>{item.user.initials}</AvatarFallback>
                </Avatar>
                <span>{item.user.name}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="font-medium mb-1">Changes:</div>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {item.changes.map((change, index) => (
                  <li key={index}>{change}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

