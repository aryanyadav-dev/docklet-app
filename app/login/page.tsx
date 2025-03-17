"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { CuboidIcon, Github, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (email) {
        // Store user info in localStorage to persist login state
        localStorage.setItem("user", JSON.stringify({ 
          email, 
          name: "Demo User",
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent("Demo User")}&background=6366f1&color=fff`
        }))

        toast({
          title: "Login successful",
          description: "Welcome back to DockletX!",
        })
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    toast({
      title: `${provider} login`,
      description: "This would connect to the actual OAuth provider in a production app.",
    })
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Brand Banner */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-3xl font-bold">
            <CuboidIcon className="h-8 w-8" />
            <span>DockletX</span>
          </div>
          <h2 className="mt-2 text-xl font-light">AI-Powered DevOps Platform</h2>
        </div>
        
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Phone mockup image, centered and blended with background - ADJUSTED SIZE */}
          <div className="relative w-72 h-112 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl"></div>
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 360 720" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Phone outline */}
                <rect x="5" y="5" width="350" height="710" rx="60" stroke="currentColor" strokeWidth="10" fill="rgba(255, 255, 255, 0.15)" />
                
                {/* Top bar */}
                <rect x="70" y="60" width="180" height="10" rx="5" fill="currentColor" opacity="0.4" />
                <rect x="70" y="85" width="120" height="10" rx="5" fill="currentColor" opacity="0.4" />
                
                {/* App icons */}
                <rect x="40" y="130" width="80" height="80" rx="20" stroke="currentColor" strokeWidth="2" fill="rgba(255, 255, 255, 0.1)" />
                <rect x="140" y="130" width="80" height="80" rx="20" stroke="currentColor" strokeWidth="2" fill="rgba(255, 255, 255, 0.1)" />
                <rect x="240" y="130" width="80" height="80" rx="20" stroke="currentColor" strokeWidth="2" fill="rgba(255, 255, 255, 0.1)" />
                
                {/* List items with checkmarks */}
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <g key={index} transform={`translate(0, ${250 + index * 60})`}>
                    <circle cx="70" cy="25" r="20" stroke="currentColor" strokeWidth="2" fill="transparent" />
                    <rect x="110" y="20" width="140" height="10" rx="5" fill="currentColor" opacity="0.4" />
                    <circle cx="300" cy="25" r="20" stroke="currentColor" strokeWidth="2" fill="transparent" />
                    <path d="M290 25 L300 35 L310 15" stroke="currentColor" strokeWidth="2" fill="none" />
                  </g>
                ))}
                
                {/* Bottom navigation */}
                <g transform="translate(0, 630)">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <circle 
                      key={index} 
                      cx={70 + index * 55} 
                      cy="25" 
                      r="20" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill={index === 2 ? "currentColor" : "transparent"} 
                    />
                  ))}
                </g>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="text-sm opacity-75">
          © 2025 DockletX, Inc. All rights reserved.
        </div>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-indigo-600 mb-2">
              <CuboidIcon className="h-8 w-8" />
              <span>DockletX</span>
            </div>
            <h1 className="text-lg text-slate-600">AI-Powered DevOps Platform</h1>
          </div>

          <Card className="border-slate-200">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="sso">SSO</TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="bg-slate-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-xs text-indigo-600 hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="bg-slate-100"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember" 
                        checked={rememberMe} 
                        onCheckedChange={setRememberMe} 
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me for 30 days
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-indigo-600 hover:bg-indigo-700" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                          Signing in...
                        </>
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-slate-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleSocialLogin("GitHub")}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleSocialLogin("Google")}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="sso">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sso-email">Work Email</Label>
                      <Input
                        id="sso-email"
                        type="email"
                        placeholder="you@company.com"
                        className="bg-slate-100"
                      />
                    </div>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Continue with SSO
                    </Button>
                  </form>
                  
                  <p className="text-xs text-center mt-4 text-slate-500">
                    Single Sign-On (SSO) allows you to login using your company credentials
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 border-t pt-4">
              <div className="text-center text-sm">
                <span className="text-slate-600">Don't have an account?</span>{" "}
                <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Create an account
                </Link>
              </div>
              
              <div className="text-center text-xs text-slate-500">
                <p className="font-medium mb-1">Demo credentials:</p>
                <p>Email: demo@dockletx.com</p>
                <p>Password: any password will work</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}