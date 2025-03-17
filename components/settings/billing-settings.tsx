"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Manage your subscription and billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Team Plan</p>
              <p className="text-sm text-muted-foreground">$49/month • Billed monthly</p>
            </div>
            <Badge>Active</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Build Minutes Used</span>
              <span>4,500 / 5,000</span>
            </div>
            <Progress value={90} />
          </div>
          <Button variant="outline">Change Plan</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Update your billing information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-20 rounded-md bg-gradient-to-r from-blue-600 to-blue-800" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/24</p>
              </div>
            </div>
            <Button variant="outline">Edit</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and billing history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">March 2024</p>
                <p className="text-sm text-muted-foreground">Team Plan • $49.00</p>
              </div>
              <Button variant="outline">Download</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">February 2024</p>
                <p className="text-sm text-muted-foreground">Team Plan • $49.00</p>
              </div>
              <Button variant="outline">Download</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">January 2024</p>
                <p className="text-sm text-muted-foreground">Team Plan • $49.00</p>
              </div>
              <Button variant="outline">Download</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

