"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, CuboidIcon, HelpCircle, LogOut, Menu, Settings, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface UserData {
  name?: string;
  email?: string;
}

export function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    // Clear user from localStorage
    localStorage.removeItem("user")

    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })

    router.push("/login")
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <CuboidIcon className="h-6 w-6 text-indigo-600" />
          <Link href="/dashboard" className="hidden md:inline-block hover:text-indigo-600 transition-colors">
            Docklet
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              isActive("/dashboard") && pathname === "/dashboard" ? "text-indigo-600" : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/projects"
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              isActive("/dashboard/projects") ? "text-indigo-600" : "text-muted-foreground"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/dashboard/builds"
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              isActive("/dashboard/builds") ? "text-indigo-600" : "text-muted-foreground"
            }`}
          >
            Builds
          </Link>
          <Link
            href="/dashboard/pipeline-generator"
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              isActive("/dashboard/pipeline-generator") ? "text-indigo-600" : "text-muted-foreground"
            }`}
          >
            Pipeline Generator
          </Link>
          <Link
            href="/dashboard/ai-assistant"
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              isActive("/dashboard/ai-assistant") ? "text-indigo-600" : "text-muted-foreground"
            }`}
          >
            AI Assistant
          </Link>
          <Link
            href="/dashboard/analytics"
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              isActive("/dashboard/analytics") ? "text-indigo-600" : "text-muted-foreground"
            }`}
          >
            Analytics
          </Link>
          <Link
            href="/dashboard/settings"
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              isActive("/dashboard/settings") ? "text-indigo-600" : "text-muted-foreground"
            }`}
          >
            Settings
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <HelpCircle className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex items-center gap-2 font-semibold mb-8">
                <CuboidIcon className="h-6 w-6 text-indigo-600" />
                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Docklet
                </Link>
              </div>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    isActive("/dashboard") && pathname === "/dashboard" ? "text-indigo-600" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/projects"
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    isActive("/dashboard/projects") ? "text-indigo-600" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  href="/dashboard/builds"
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    isActive("/dashboard/builds") ? "text-indigo-600" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Builds
                </Link>
                <Link
                  href="/dashboard/pipeline-generator"
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    isActive("/dashboard/pipeline-generator") ? "text-indigo-600" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pipeline Generator
                </Link>
                <Link
                  href="/dashboard/ai-assistant"
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    isActive("/dashboard/ai-assistant") ? "text-indigo-600" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  AI Assistant
                </Link>
                <Link
                  href="/dashboard/analytics"
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    isActive("/dashboard/analytics") ? "text-indigo-600" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Analytics
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    isActive("/dashboard/settings") ? "text-indigo-600" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

