"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, ChevronDown, ChevronRight, Clock, Image, Play, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { TestVisualization } from "@/components/ui/test-visualization"

export function BuildTests() {
  const [openTests, setOpenTests] = useState<Record<string, boolean>>({})
  const [liveExecution, setLiveExecution] = useState(true)
  const [currentTestIndex, setCurrentTestIndex] = useState(0)
  const [testProgress, setTestProgress] = useState(0)
  const [completedTests, setCompletedTests] = useState<string[]>([])
  const [testLogs, setTestLogs] = useState<Array<{timestamp: string; type: string; message: string}>>([])
  const [testResults, setTestResults] = useState({
    passed: 0,
    failed: 0,
    total: 0,
    failedTests: [] as Array<{testName: string; methodName: string; error: string}>
  })
  const [activeUnitTests, setActiveUnitTests] = useState<any[]>([])
  const [activeInstrumentedTests, setActiveInstrumentedTests] = useState<any[]>([])

  // Save test results to localStorage for AI analysis
  useEffect(() => {
    if (!liveExecution && testResults.total > 0) {
      localStorage.setItem('testResults', JSON.stringify(testResults));
      localStorage.setItem('testLogs', JSON.stringify(testLogs));
    }
  }, [liveExecution, testResults, testLogs]);

  const toggleTest = (id: string) => {
    setOpenTests({
      ...openTests,
      [id]: !openTests[id],
    })
  }

  const unitTests = [
    {
      id: "ut1",
      name: "CartTest",
      status: "pending",
      duration: "0.8s",
      methods: [
        { name: "testAddItem", status: "pending", duration: "0.3s" },
        { name: "testRemoveItem", status: "pending", duration: "0.2s" },
        { name: "testUpdateQuantity", status: "pending", duration: "0.3s" },
      ],
    },
    {
      id: "ut2",
      name: "PaymentTest",
      status: "pending",
      duration: "1.2s",
      methods: [
        { name: "testCreditCardValidation", status: "pending", duration: "0.4s" },
        { name: "testPaymentProcessing", status: "pending", duration: "0.5s" },
        { name: "testPaymentFailure", status: "pending", duration: "0.3s" },
      ],
    },
    {
      id: "ut3",
      name: "UserTest",
      status: "pending",
      duration: "0.7s",
      methods: [
        { name: "testUserRegistration", status: "pending", duration: "0.3s" },
        { name: "testUserLogin", status: "pending", duration: "0.2s" },
        { name: "testUserProfile", status: "pending", duration: "0.2s" },
      ],
    },
  ]

  const instrumentedTests = [
    {
      id: "it1",
      name: "CheckoutFlowTest",
      status: "pending",
      duration: "12.5s",
      device: "Pixel 4 API 30",
      methods: [
        {
          name: "testAddToCartFlow",
          status: "pending",
          duration: "4.2s",
          screenshot: "/placeholder.svg?height=200&width=100",
        },
        {
          name: "testCheckoutFlow",
          status: "pending",
          duration: "5.1s",
          screenshot: "/placeholder.svg?height=200&width=100",
        },
        {
          name: "testPaymentFlow",
          status: "pending",
          duration: "3.2s",
          screenshot: "/placeholder.svg?height=200&width=100",
        },
      ],
    },
    {
      id: "it2",
      name: "ProductBrowsingTest",
      status: "pending",
      duration: "8.3s",
      device: "Pixel 4 API 30",
      methods: [
        {
          name: "testCategoryNavigation",
          status: "pending",
          duration: "2.8s",
          screenshot: "/placeholder.svg?height=200&width=100",
        },
        {
          name: "testProductSearch",
          status: "pending",
          duration: "2.5s",
          screenshot: "/placeholder.svg?height=200&width=100",
        },
        {
          name: "testProductDetails",
          status: "pending",
          duration: "3.0s",
          screenshot: "/placeholder.svg?height=200&width=100",
        },
      ],
    },
    {
      id: "it3",
      name: "UserAccountTest",
      status: "pending",
      duration: "10.2s",
      device: "Pixel 4 API 30",
      methods: [
        {
          name: "testUserRegistration",
          status: "pending",
          duration: "3.5s",
          screenshot: "/placeholder.svg?height=200&width=100",
        },
        {
          name: "testUserLogin",
          status: "pending",
          duration: "2.8s",
          screenshot: "/placeholder.svg?height=200&width=100",
        },
        {
          name: "testProfileEditing",
          status: "pending",
          duration: "3.9s",
          screenshot: "/placeholder.svg?height=200&width=100",
        },
      ],
    },
  ]

  // Initialize active tests
  useEffect(() => {
    setActiveUnitTests(JSON.parse(JSON.stringify(unitTests)))
    setActiveInstrumentedTests(JSON.parse(JSON.stringify(instrumentedTests)))
  }, [])

  // Simulate test execution
  useEffect(() => {
    if (!liveExecution) return

    const allTests = [...unitTests, ...instrumentedTests]
    const totalTests = allTests.length
    
    // Update progress
    setTestProgress(Math.min(100, (currentTestIndex / totalTests) * 100))

    if (currentTestIndex >= totalTests) {
      setLiveExecution(false)
      return
    }

    // Determine which test is currently running
    const isUnitTest = currentTestIndex < unitTests.length
    const testIndex = isUnitTest ? currentTestIndex : currentTestIndex - unitTests.length
    
    // Safety check to ensure the test index is valid
    if ((isUnitTest && testIndex >= unitTests.length) || 
        (!isUnitTest && testIndex >= instrumentedTests.length)) {
      // Skip this iteration if the index is out of bounds
      setCurrentTestIndex(prev => prev + 1)
      return
    }
    
    const testId = isUnitTest ? unitTests[testIndex].id : instrumentedTests[testIndex].id
    const testName = isUnitTest ? unitTests[testIndex].name : instrumentedTests[testIndex].name

    // Add log entry for test start
    setTestLogs(prev => [...prev, {
      timestamp: new Date().toISOString(),
      type: 'info',
      message: `Running test: ${testName}`
    }]);

    // Auto-open the current test
    setOpenTests(prev => ({
      ...prev,
      [testId]: true
    }))

    // Mark the current test as running
    if (isUnitTest) {
      setActiveUnitTests(prev => {
        // Create a deep copy to avoid mutation issues
        const newTests = JSON.parse(JSON.stringify(prev))
        // Safety check to ensure the test exists
        if (newTests[testIndex]) {
          newTests[testIndex].status = "running"
        }
        return newTests
      })
    } else {
      setActiveInstrumentedTests(prev => {
        // Create a deep copy to avoid mutation issues
        const newTests = JSON.parse(JSON.stringify(prev))
        // Safety check to ensure the test exists
        if (newTests[testIndex]) {
          newTests[testIndex].status = "running"
        }
        return newTests
      })
    }

    // Simulate test execution time
    const testDuration = isUnitTest && unitTests[testIndex] 
      ? parseInt(unitTests[testIndex].duration) * 1000 
      : !isUnitTest && instrumentedTests[testIndex]
        ? parseInt(instrumentedTests[testIndex].duration) * 1000
        : 2000 // Default duration if test not found
    
    const simulatedDuration = Math.max(1500, Math.min(testDuration, 3000))

    // Simulate method execution
    const methods = isUnitTest && unitTests[testIndex] 
      ? unitTests[testIndex].methods 
      : !isUnitTest && instrumentedTests[testIndex]
        ? instrumentedTests[testIndex].methods
        : [] // Empty array if test not found
    
    let methodIndex = 0

    const methodInterval = setInterval(() => {
      if (methodIndex >= methods.length) {
        clearInterval(methodInterval)
        return
      }

      // Randomly determine if the method passes or fails (10% chance of failure)
      const methodStatus = Math.random() > 0.9 ? "failed" : "success"
      
      // Update the method status
      if (isUnitTest) {
        setActiveUnitTests(prev => {
          const newTests = JSON.parse(JSON.stringify(prev))
          if (newTests[testIndex] && newTests[testIndex].methods && newTests[testIndex].methods[methodIndex]) {
            newTests[testIndex].methods[methodIndex].status = methodStatus
            
            // Log method result
            setTestLogs(logs => [...logs, {
              timestamp: new Date().toISOString(),
              type: methodStatus === 'failed' ? 'error' : 'success',
              message: `${testName}.${methods[methodIndex].name}: ${methodStatus === 'failed' ? 'FAILED' : 'PASSED'}`
            }]);
            
            // If method failed, add to failed tests list
            if (methodStatus === 'failed') {
              setTestResults(prev => ({
                ...prev,
                failed: prev.failed + 1,
                total: prev.total + 1,
                failedTests: [...prev.failedTests, {
                  testName: testName,
                  methodName: methods[methodIndex].name,
                  error: 'Assertion failed: expected value does not match actual value'
                }]
              }));
            } else {
              setTestResults(prev => ({
                ...prev,
                passed: prev.passed + 1,
                total: prev.total + 1
              }));
            }
          }
          return newTests
        })
      } else {
        setActiveInstrumentedTests(prev => {
          const newTests = JSON.parse(JSON.stringify(prev))
          if (newTests[testIndex] && newTests[testIndex].methods && newTests[testIndex].methods[methodIndex]) {
            newTests[testIndex].methods[methodIndex].status = methodStatus
            
            // Log method result
            setTestLogs(logs => [...logs, {
              timestamp: new Date().toISOString(),
              type: methodStatus === 'failed' ? 'error' : 'success',
              message: `${testName}.${methods[methodIndex].name}: ${methodStatus === 'failed' ? 'FAILED' : 'PASSED'}`
            }]);
            
            // If method failed, add to failed tests list
            if (methodStatus === 'failed') {
              setTestResults(prev => ({
                ...prev,
                failed: prev.failed + 1,
                total: prev.total + 1,
                failedTests: [...prev.failedTests, {
                  testName: testName,
                  methodName: methods[methodIndex].name,
                  error: 'Assertion failed: expected value does not match actual value'
                }]
              }));
            } else {
              setTestResults(prev => ({
                ...prev,
                passed: prev.passed + 1,
                total: prev.total + 1
              }));
            }
          }
          return newTests
        })
      }

      methodIndex++
    }, simulatedDuration / (methods.length + 1))

    // Complete the test after the duration
    const timer = setTimeout(() => {
      // Update the test status based on method results
      if (isUnitTest) {
        setActiveUnitTests(prev => {
          const newTests = JSON.parse(JSON.stringify(prev))
          if (newTests[testIndex]) {
            newTests[testIndex].status = newTests[testIndex].methods.some((m: any) => m.status === "failed") 
              ? "failed" 
              : "success"
              
            // Log test completion
            setTestLogs(logs => [...logs, {
              timestamp: new Date().toISOString(),
              type: newTests[testIndex].status === 'failed' ? 'error' : 'success',
              message: `Test ${testName} completed: ${newTests[testIndex].status.toUpperCase()}`
            }]);
          }
          return newTests
        })
      } else {
        setActiveInstrumentedTests(prev => {
          const newTests = JSON.parse(JSON.stringify(prev))
          if (newTests[testIndex]) {
            newTests[testIndex].status = newTests[testIndex].methods.some((m: any) => m.status === "failed") 
              ? "failed" 
              : "success"
              
            // Log test completion
            setTestLogs(logs => [...logs, {
              timestamp: new Date().toISOString(),
              type: newTests[testIndex].status === 'failed' ? 'error' : 'success',
              message: `Test ${testName} completed: ${newTests[testIndex].status.toUpperCase()}`
            }]);
          }
          return newTests
        })
      }

      // Add to completed tests
      setCompletedTests(prev => [...prev, testId])
      
      // Move to the next test
      setCurrentTestIndex(prev => prev + 1)
      
      clearInterval(methodInterval)
    }, simulatedDuration)

    return () => {
      clearTimeout(timer)
      clearInterval(methodInterval)
    }
  }, [currentTestIndex, liveExecution])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "success":
        return "success"
      case "running":
        return "outline"
      case "failed":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "outline"
    }
  }

  // Function to restart tests (for rebuild functionality)
  const restartTests = () => {
    setCurrentTestIndex(0)
    setTestProgress(0)
    setCompletedTests([])
    setLiveExecution(true)
    setActiveUnitTests(JSON.parse(JSON.stringify(unitTests)))
    setActiveInstrumentedTests(JSON.parse(JSON.stringify(instrumentedTests)))
  }

  return (
    <div className="space-y-6">
      {liveExecution && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500 animate-pulse" />
              Live Test Execution
            </CardTitle>
            <CardDescription>
              Tests are currently running. {completedTests.length} of {unitTests.length + instrumentedTests.length} tests completed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(testProgress)}%</span>
              </div>
              <Progress value={testProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {!liveExecution && (
        <div className="flex justify-end">
          <Button onClick={restartTests} className="gap-1">
            <Play className="h-4 w-4" />
            Run Tests Again
          </Button>
        </div>
      )}

      <Tabs defaultValue="unit">
        <TabsList>
          <TabsTrigger value="unit">Unit Tests</TabsTrigger>
          <TabsTrigger value="instrumented">Instrumented Tests</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="logs">Test Logs</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
        </TabsList>

        <TabsContent value="unit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Unit Tests</CardTitle>
              <CardDescription>JUnit tests executed on the JVM.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeUnitTests.map((test) => (
                  <Collapsible
                    key={test.id}
                    open={openTests[test.id]}
                    onOpenChange={() => toggleTest(test.id)}
                    className="border rounded-md"
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted">
                        <div className="flex items-center gap-2">
                          {openTests[test.id] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <span className="font-medium">{test.name}</span>
                          <Badge
                            variant={getStatusBadgeVariant(test.status)}
                            className="flex items-center gap-1"
                          >
                            {getStatusIcon(test.status)}
                            <span>{test.status === "running" ? "Running" : test.methods.length + " tests"}</span>
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{test.duration}</span>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-4 pt-0 border-t">
                        <div className="space-y-2">
                          {test.methods.map((method, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(method.status)}
                                <span>{method.name}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{method.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instrumented" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Instrumented Tests</CardTitle>
              <CardDescription>Tests executed on Android emulator (Pixel 4 API 30).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeInstrumentedTests.map((test) => (
                  <Collapsible
                    key={test.id}
                    open={openTests[test.id]}
                    onOpenChange={() => toggleTest(test.id)}
                    className="border rounded-md"
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted">
                        <div className="flex items-center gap-2">
                          {openTests[test.id] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <span className="font-medium">{test.name}</span>
                          <Badge
                            variant={getStatusBadgeVariant(test.status)}
                            className="flex items-center gap-1"
                          >
                            {getStatusIcon(test.status)}
                            <span>{test.status === "running" ? "Running" : test.methods.length + " tests"}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{test.device}</span>
                          <span className="text-sm text-muted-foreground">{test.duration}</span>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-4 pt-0 border-t">
                        <div className="space-y-4">
                          {test.methods.map((method, index) => (
                            <div key={index} className="border rounded-md overflow-hidden">
                              <div className="flex items-center justify-between p-3 bg-muted">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(method.status)}
                                  <span>{method.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{method.duration}</span>
                              </div>
                              {method.status !== "pending" && (
                                <div className="p-3 flex justify-center bg-background">
                                  <div className="relative w-[100px] h-[200px] bg-gray-100 rounded-md overflow-hidden border">
                                    <Image className="h-5 w-5 absolute top-2 right-2 text-muted-foreground" />
                                    {method.status === "running" && (
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-pulse text-sm text-muted-foreground">Recording...</div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Summary</CardTitle>
              <CardDescription>Overview of all tests executed during this build.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Unit Tests</h3>
                    <span className="text-sm text-muted-foreground">
                      {completedTests.filter(id => id.startsWith('ut')).length} of {unitTests.length} completed
                    </span>
                  </div>
                  <Progress 
                    value={(completedTests.filter(id => id.startsWith('ut')).length / unitTests.length) * 100} 
                    className="h-2" 
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Instrumented Tests</h3>
                    <span className="text-sm text-muted-foreground">
                      {completedTests.filter(id => id.startsWith('it')).length} of {instrumentedTests.length} completed
                    </span>
                  </div>
                  <Progress 
                    value={(completedTests.filter(id => id.startsWith('it')).length / instrumentedTests.length) * 100} 
                    className="h-2" 
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Test Results</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">
                          Passed: {
                            activeUnitTests.filter(t => t.status === "success").length + 
                            activeInstrumentedTests.filter(t => t.status === "success").length
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">
                          Failed: {
                            activeUnitTests.filter(t => t.status === "failed").length + 
                            activeInstrumentedTests.filter(t => t.status === "failed").length
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">
                          Running: {
                            activeUnitTests.filter(t => t.status === "running").length + 
                            activeInstrumentedTests.filter(t => t.status === "running").length
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <span className="text-sm">
                          Pending: {
                            activeUnitTests.filter(t => t.status === "pending").length + 
                            activeInstrumentedTests.filter(t => t.status === "pending").length
                          }
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Test Duration</h3>
                      <div className="text-sm text-muted-foreground">
                        Average: 3.2s per test
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total: {liveExecution ? "Running..." : "32.7s"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Logs</CardTitle>
              <CardDescription>Detailed logs of test execution.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-y-auto border rounded-md p-4 bg-black text-white font-mono text-sm">
                {testLogs.length === 0 ? (
                  <div className="text-gray-400">No logs available yet...</div>
                ) : (
                  testLogs.map((log, index) => (
                    <div key={index} className={`mb-1 ${
                      log.type === 'error' ? 'text-red-400' : 
                      log.type === 'success' ? 'text-green-400' : 'text-blue-400'
                    }`}>
                      [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Flow Visualization</CardTitle>
              <CardDescription>Visual representation of test execution flow.</CardDescription>
            </CardHeader>
            <CardContent>
              {liveExecution ? (
                <div className="flex items-center justify-center p-8">
                  <div className="flex flex-col items-center gap-4">
                    <Clock className="h-12 w-12 text-muted-foreground animate-pulse" />
                    <p className="text-muted-foreground">Test execution in progress. Visualization will be available when tests complete.</p>
                  </div>
                </div>
              ) : (
                <div className="border rounded-md p-4 bg-white">
                  <TestVisualization 
                    unitTests={activeUnitTests} 
                    instrumentedTests={activeInstrumentedTests} 
                    className="max-h-[600px] overflow-auto" 
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

