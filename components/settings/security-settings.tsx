"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function SecuritySettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Security settings updated",
        description: "Your security settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current">Current Password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new">New Password</Label>
            <Input id="new" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input id="confirm" type="password" />
          </div>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage your active sessions across devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">MacBook Pro - Chrome</p>
                <p className="text-sm text-muted-foreground">Last active: 2 minutes ago</p>
              </div>
              <Button variant="outline">Logout</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">iPhone 12 - Safari</p>
                <p className="text-sm text-muted-foreground">Last active: 1 hour ago</p>
              </div>
              <Button variant="outline">Logout</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

