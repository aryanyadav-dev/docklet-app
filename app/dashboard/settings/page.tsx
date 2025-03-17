"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Senior Mobile Developer at Acme Inc.",
  })
  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: false,
    sessions: [
      { device: "MacBook Pro - Chrome", lastActive: "2 minutes ago" },
      { device: "iPhone 12 - Safari", lastActive: "1 hour ago" },
    ],
  })
  const [notificationData, setNotificationData] = useState({
    buildStatus: true,
    testResults: true,
    deploymentStatus: true,
    pushEnabled: true,
    criticalAlerts: true,
    slackEnabled: false,
  })

  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData")
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile))
    }

    const savedSecurity = localStorage.getItem("securityData")
    if (savedSecurity) {
      setSecurityData(JSON.parse(savedSecurity))
    }

    const savedNotifications = localStorage.getItem("notificationData")
    if (savedNotifications) {
      setNotificationData(JSON.parse(savedNotifications))
    }
  }, [])

  const handleProfileSave = () => {
    setIsLoading(true)
    // Save to localStorage
    localStorage.setItem("profileData", JSON.stringify(profileData))

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1000)
  }

  const handleSecuritySave = () => {
    setIsLoading(true)
    // Save to localStorage
    localStorage.setItem("securityData", JSON.stringify(securityData))

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Security settings updated",
        description: "Your security settings have been updated successfully.",
      })
    }, 1000)
  }

  const handleNotificationSave = () => {
    setIsLoading(true)
    // Save to localStorage
    localStorage.setItem("notificationData", JSON.stringify(notificationData))

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been updated successfully.",
      })
    }, 1000)
  }

  const handleLogoutSession = (index) => {
    const updatedSessions = [...securityData.sessions]
    updatedSessions.splice(index, 1)

    const updatedSecurityData = {
      ...securityData,
      sessions: updatedSessions,
    }

    setSecurityData(updatedSecurityData)
    localStorage.setItem("securityData", JSON.stringify(updatedSecurityData))

    toast({
      title: "Session logged out",
      description: "The session has been terminated successfully.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your profile information and avatar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg" alt="Profile" />
                      <AvatarFallback>
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button>Change Avatar</Button>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button onClick={handleProfileSave} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
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
                    <Button onClick={handleSecuritySave} disabled={isLoading}>
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
                      <Switch
                        checked={securityData.twoFactorEnabled}
                        onCheckedChange={(checked) => {
                          const updated = { ...securityData, twoFactorEnabled: checked }
                          setSecurityData(updated)
                          localStorage.setItem("securityData", JSON.stringify(updated))
                        }}
                      />
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
                      {securityData.sessions.map((session, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{session.device}</p>
                            <p className="text-sm text-muted-foreground">Last active: {session.lastActive}</p>
                          </div>
                          <Button variant="outline" onClick={() => handleLogoutSession(index)}>
                            Logout
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>Choose what updates you want to receive via email</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Build Status</Label>
                        <p className="text-sm text-muted-foreground">Get notified when builds succeed or fail</p>
                      </div>
                      <Switch
                        checked={notificationData.buildStatus}
                        onCheckedChange={(checked) =>
                          setNotificationData({ ...notificationData, buildStatus: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Test Results</Label>
                        <p className="text-sm text-muted-foreground">Receive updates about test results</p>
                      </div>
                      <Switch
                        checked={notificationData.testResults}
                        onCheckedChange={(checked) =>
                          setNotificationData({ ...notificationData, testResults: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Deployment Status</Label>
                        <p className="text-sm text-muted-foreground">Get notified about deployment status changes</p>
                      </div>
                      <Switch
                        checked={notificationData.deploymentStatus}
                        onCheckedChange={(checked) =>
                          setNotificationData({ ...notificationData, deploymentStatus: checked })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Push Notifications</CardTitle>
                    <CardDescription>Configure push notifications for your devices</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications on your devices</p>
                      </div>
                      <Switch
                        checked={notificationData.pushEnabled}
                        onCheckedChange={(checked) =>
                          setNotificationData({ ...notificationData, pushEnabled: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Critical Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified about critical issues immediately</p>
                      </div>
                      <Switch
                        checked={notificationData.criticalAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationData({ ...notificationData, criticalAlerts: checked })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Slack Integration</CardTitle>
                    <CardDescription>Configure notifications for your Slack workspace</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Slack Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send notifications to your Slack channels</p>
                      </div>
                      <Switch
                        checked={notificationData.slackEnabled}
                        onCheckedChange={(checked) =>
                          setNotificationData({ ...notificationData, slackEnabled: checked })
                        }
                      />
                    </div>
                    <Button variant="outline">Configure Slack</Button>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={handleNotificationSave} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

