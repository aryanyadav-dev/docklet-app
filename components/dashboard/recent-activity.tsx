import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, GitBranch, GitCommit, GitPullRequest, Package, XCircle } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "build",
      status: "success",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      project: "Shopping App",
      description: "Build #B-1234 completed successfully",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "commit",
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      project: "Shopping App",
      description: "Pushed 3 commits to feature/checkout",
      time: "3 hours ago",
    },
    {
      id: 3,
      type: "pull_request",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      project: "Weather App",
      description: "Opened PR #42: Fix location services",
      time: "5 hours ago",
    },
    {
      id: 4,
      type: "build",
      status: "failed",
      user: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SW",
      },
      project: "Weather App",
      description: "Build #B-1231 failed",
      time: "6 hours ago",
    },
    {
      id: 5,
      type: "release",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      project: "Fitness Tracker",
      description: "Released v2.1.0 to TestFlight",
      time: "1 day ago",
    },
  ]

  const getActivityIcon = (activity) => {
    switch (activity.type) {
      case "build":
        return activity.status === "success" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )
      case "commit":
        return <GitCommit className="h-5 w-5 text-blue-500" />
      case "pull_request":
        return <GitPullRequest className="h-5 w-5 text-purple-500" />
      case "branch":
        return <GitBranch className="h-5 w-5 text-orange-500" />
      case "release":
        return <Package className="h-5 w-5 text-teal-500" />
      default:
        return <GitCommit className="h-5 w-5 text-blue-500" />
    }

  }

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              {getActivityIcon(activity)}
            </div>
            <div className="h-full w-px bg-border" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{activity.user.name}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
            <p className="text-sm">
              <span className="font-medium">{activity.project}:</span> {activity.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

