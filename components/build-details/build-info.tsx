import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, GitBranch, GitCommit, Smartphone, User } from "lucide-react"

export function BuildInfo() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Duration</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">6m 12s</div>
          <div className="mt-2 space-y-1">
            <div className="text-xs text-muted-foreground">Build: 2m 45s</div>
            <Progress value={44} className="h-1" />
            <div className="text-xs text-muted-foreground">Test: 3m 27s</div>
            <Progress value={56} className="h-1" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Commit</CardTitle>
          <GitCommit className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-mono text-lg font-bold">a1b2c3d</div>
          <div className="mt-1 text-sm text-muted-foreground truncate">
            Fix checkout flow and add payment validation
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <GitBranch className="h-3 w-3" />
            <span>main</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Triggered By</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">John Doe</div>
          <div className="mt-1 text-sm text-muted-foreground">via GitHub webhook</div>
          <div className="mt-2 text-xs text-muted-foreground">15 Mar 2023, 14:32</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Environment</CardTitle>
          <Smartphone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">Android</div>
          <div className="mt-1 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">SDK:</span>
              <span>33 (Android 13)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gradle:</span>
              <span>7.4.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">JDK:</span>
              <span>17</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

