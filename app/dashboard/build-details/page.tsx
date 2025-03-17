"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BuildInfo } from "@/components/build-details/build-info"
import { BuildLogs } from "@/components/build-details/build-logs"
import { BuildArtifacts } from "@/components/build-details/build-artifacts"
import { BuildTests } from "@/components/build-details/build-tests"
import { BuildAnalysis } from "@/components/build-details/build-analysis"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Play, RotateCcw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function BuildDetailsPage() {
  const { toast } = useToast()
  const [isRebuildDialogOpen, setIsRebuildDialogOpen] = useState(false)
  const [isRunOnDeviceDialogOpen, setIsRunOnDeviceDialogOpen] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState("iphone15")
  const [isDownloading, setIsDownloading] = useState(false)
  const [isRebuilding, setIsRebuilding] = useState(false)
  const [isRunningOnDevice, setIsRunningOnDevice] = useState(false)
  const [activeTab, setActiveTab] = useState("logs")
  const [buildKey, setBuildKey] = useState(Date.now()) // Used to force re-render of test component
  const [platform, setPlatform] = useState("ios") // Default to iOS for this example
  const [projectType, setProjectType] = useState("ios") // Can be "ios", "android", "flutter", or "reactnative"

  // Initialize project type based on project data
  useEffect(() => {
    // In a real app, this would come from the project data
    // For this example, we'll simulate getting the project type
    
    // Simulating getting project data
    const projectPlatform = "flutter"; // This could be "ios", "android", "flutter", or "reactnative"
    
    setProjectType(projectPlatform);
    
    // Set default device based on project type
    if (projectPlatform === "ios") {
      setPlatform("ios");
      setSelectedDevice("iphone15");
    } else if (projectPlatform === "android") {
      setPlatform("android");
      setSelectedDevice("pixel7");
    } else {
      // For cross-platform projects, default to iOS
      setPlatform("ios");
      setSelectedDevice("iphone15");
    }
  }, []);

  const handleRebuild = () => {
    setIsRebuilding(true)
    
    // Simulate rebuild process
    setTimeout(() => {
      setIsRebuilding(false)
      setIsRebuildDialogOpen(false)
      
      // Update the build key to force re-render of test components
      setBuildKey(Date.now())
      
      // Switch to tests tab
      setActiveTab("tests")
      
      toast({
        title: "Build started",
        description: "Rebuild of Shopping App has been started successfully.",
      })
    }, 1500)
  }

  const handleDownloadApk = () => {
    setIsDownloading(true)
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false)
      
      let description = "";
      if (projectType === "flutter" || projectType === "reactnative") {
        description = "app-release.apk and app-release.ipa have been downloaded successfully.";
      } else if (projectType === "ios") {
        description = "app-release-signed.ipa has been downloaded successfully.";
      } else { // android
        description = "app-release-signed.apk has been downloaded successfully.";
      }
      
      toast({
        title: "Download complete",
        description: description
      })
    }, 2000)
  }

  const handleRunOnDevice = () => {
    setIsRunningOnDevice(true)
    
    // Simulate running on device
    setTimeout(() => {
      setIsRunningOnDevice(false)
      setIsRunOnDeviceDialogOpen(false)
      
      let deviceName = "";
      
      if (selectedDevice.includes("iphone")) {
        deviceName = selectedDevice === "iphone14" ? "iPhone 14" : 
                    selectedDevice === "iphone15" ? "iPhone 15" : 
                    selectedDevice === "iphone15pro" ? "iPhone 15 Pro" : "iPhone 15 Pro Max";
      } else {
        deviceName = selectedDevice === "pixel6" ? "Pixel 6" : 
                    selectedDevice === "pixel7" ? "Pixel 7" : "Pixel 8";
      }
      
      let frameworkInfo = "";
      if (projectType === "flutter") {
        frameworkInfo = " using Flutter";
      } else if (projectType === "reactnative") {
        frameworkInfo = " using React Native";
      }
      
      toast({
        title: "App launched",
        description: `Shopping App is now running on ${deviceName}${frameworkInfo}.`,
      })
    }, 3000)
  }

  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  // Get device options based on platform/project type
  const getDeviceOptions = () => {
    // iOS devices
    const iosDevices = [
      { id: "iphone14", name: "iPhone 14", os: "iOS 17" },
      { id: "iphone15", name: "iPhone 15", os: "iOS 17" },
      { id: "iphone15pro", name: "iPhone 15 Pro", os: "iOS 17" },
      { id: "iphone15promax", name: "iPhone 15 Pro Max", os: "iOS 17" }
    ];
    
    // Android devices
    const androidDevices = [
      { id: "pixel6", name: "Pixel 6", os: "Android 13" },
      { id: "pixel7", name: "Pixel 7", os: "Android 13" },
      { id: "pixel8", name: "Pixel 8", os: "Android 14" }
    ];
    
    if (projectType === "ios" || (projectType === "flutter" && platform === "ios") || (projectType === "reactnative" && platform === "ios")) {
      return iosDevices;
    } else {
      return androidDevices;
    }
  };

  // Get command based on platform and selected device
  const getRunCommand = () => {
    const deviceName = selectedDevice.includes("iphone") 
      ? selectedDevice.replace("iphone", "iPhone ").replace("pro", "Pro").replace("max", "Max") 
      : selectedDevice.replace("pixel", "Pixel ");
    
    if (projectType === "flutter") {
      return `flutter run -d ${deviceName}`;
    } else if (projectType === "reactnative") {
      return selectedDevice.includes("iphone")
        ? `npx react-native run-ios --simulator="${deviceName}"` 
        : `npx react-native run-android --deviceId=${deviceName}`;
    } else if (projectType === "ios") {
      return `xcodebuild -destination "platform=iOS Simulator,name=${deviceName}" run`;
    } else { // android
      return `adb -s ${deviceName} install -r app-release.apk`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Build #B-1234</h1>
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Success
                </Badge>
              </div>
              <p className="text-muted-foreground">Shopping App • main • a1b2c3d • 15 Mar 2023, 14:32</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button 
                variant="outline" 
                className="gap-1" 
                onClick={() => setIsRebuildDialogOpen(true)}
                disabled={isRebuilding}
              >
                {isRebuilding ? (
                  <>
                    <RotateCcw className="h-4 w-4 animate-spin" />
                    Rebuilding...
                  </>
                ) : (
                  <>
                    <RotateCcw className="h-4 w-4" />
                    Rebuild
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="gap-1" 
                onClick={handleDownloadApk}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <Download className="h-4 w-4 animate-pulse" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    {projectType === "flutter" || projectType === "reactnative" 
                      ? "Download App" 
                      : `Download ${projectType === "ios" ? "IPA" : "APK"}`}
                  </>
                )}
              </Button>
              <Button 
                className="gap-1"
                onClick={() => setIsRunOnDeviceDialogOpen(true)}
                disabled={isRunningOnDevice}
              >
                {isRunningOnDevice ? (
                  <>
                    <Play className="h-4 w-4 animate-pulse" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Run on Device
                  </>
                )}
              </Button>
            </div>
          </div>

          <BuildInfo />

          <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
            <TabsList>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
              <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="logs" className="mt-6">
              <BuildLogs />
            </TabsContent>
            <TabsContent value="artifacts" className="mt-6">
              <BuildArtifacts />
            </TabsContent>
            <TabsContent value="tests" className="mt-6">
              {/* Use key to force re-render when rebuilding */}
              <BuildTests key={buildKey} />
            </TabsContent>
            <TabsContent value="analysis" className="mt-6">
              {/* Use key to force re-render when rebuilding */}
              <BuildAnalysis key={buildKey} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Rebuild Dialog */}
      <Dialog open={isRebuildDialogOpen} onOpenChange={setIsRebuildDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rebuild</DialogTitle>
            <DialogDescription>Start a new build with the same configuration</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Project</span>
                <span>Shopping App</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Branch</span>
                <span>main</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Commit</span>
                <span className="font-mono">a1b2c3d</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Configuration</span>
                <span>Release</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRebuildDialogOpen(false)} disabled={isRebuilding}>
              Cancel
            </Button>
            <Button onClick={handleRebuild} disabled={isRebuilding}>
              {isRebuilding ? "Rebuilding..." : "Start Rebuild"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Run on Device Dialog */}
      <Dialog open={isRunOnDeviceDialogOpen} onOpenChange={setIsRunOnDeviceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run on Device</DialogTitle>
            <DialogDescription>Select a device to run the app</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            {/* Platform Selection */}
            <div>
              <h3 className="text-sm font-medium mb-3">Platform</h3>
              <div className="flex gap-2">
                <Button 
                  variant={platform === "ios" ? "default" : "outline"}
                  onClick={() => {
                    setPlatform("ios");
                    setSelectedDevice("iphone15");
                  }}
                  className="flex-1"
                >
                  iOS
                </Button>
                <Button 
                  variant={platform === "android" ? "default" : "outline"}
                  onClick={() => {
                    setPlatform("android");
                    setSelectedDevice("pixel7");
                  }}
                  className="flex-1"
                >
                  Android
                </Button>
              </div>
            </div>

            {/* Device Selection */}
            <div>
              <h3 className="text-sm font-medium mb-3">Select Device</h3>
              <div className="grid grid-cols-2 gap-3">
                {getDeviceOptions().map(device => (
                  <Button 
                    key={device.id}
                    variant={selectedDevice === device.id ? "default" : "outline"}
                    onClick={() => setSelectedDevice(device.id)}
                    className="justify-start h-auto py-3"
                  >
                    <div className="text-left">
                      <div>{device.name}</div>
                      <div className="text-xs opacity-70">{device.os}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Command Preview */}
            <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
              {getRunCommand()}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRunOnDeviceDialogOpen(false)} disabled={isRunningOnDevice}>
              Cancel
            </Button>
            <Button onClick={handleRunOnDevice} disabled={isRunningOnDevice}>
              {isRunningOnDevice ? "Launching..." : "Launch App"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

