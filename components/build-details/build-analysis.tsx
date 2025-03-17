"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Code, FileWarning, Lightbulb, Loader2, Zap, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Add type definitions
interface TestResult {
  passed: number;
  failed: number;
  total: number;
  failedTests: FailedTest[];
}

interface FailedTest {
  testName: string;
  methodName: string;
  error: string;
}

interface Insight {
  title: string;
  description: string;
  impact: string;
  code?: string;
}

interface AnalysisResults {
  buildStatus: string;
  buildTime: string;
  averageBuildTime: string;
  improvementPercentage: number;
  testsPassed: number;
  testsFailed: number;
  testWarnings: number;
  performanceInsights: Insight[];
  codeQualityInsights: Insight[];
  securityInsights: Insight[];
}

// Custom visualization component for build analysis
function BuildAnalysisVisualization({ analysisResults }: { analysisResults: AnalysisResults }) {
  if (!analysisResults) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-muted-foreground">No analysis data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Build Process Node */}
      <div className="flex flex-col items-center">
        <div className="bg-green-100 text-green-800 font-medium px-6 py-3 rounded-md border border-green-200 w-48 text-center">
          Build Process
        </div>
        <div className="w-0.5 h-8 bg-gray-300 my-2"></div>
      </div>

      {/* Test Execution and Results */}
      <div className="flex flex-col items-center">
        <div className="bg-blue-100 text-blue-800 font-medium px-6 py-3 rounded-md border border-blue-200 w-48 text-center">
          Test Execution
        </div>
        <div className="w-0.5 h-8 bg-gray-300 my-2"></div>
        
        {analysisResults.testsFailed > 0 ? (
          <div className="flex flex-col items-center">
            <div className="bg-red-100 text-red-800 font-medium px-6 py-3 rounded-md border border-red-200 w-48 text-center">
              Tests Failed ({analysisResults.testsFailed})
            </div>
            
            {/* Failed Test Categories */}
            <div className="w-0.5 h-8 bg-gray-300 my-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
              {analysisResults.codeQualityInsights
                .filter(insight => insight.title.includes("Failure") || insight.title.includes("Test"))
                .map((insight, index) => {
                  const category = insight.title.split(" ")[0];
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className="bg-purple-100 text-purple-800 font-medium px-4 py-2 rounded-md border border-purple-200 w-full text-center">
                        {category} Tests
                      </div>
                      <div className="w-0.5 h-6 bg-gray-300 my-1"></div>
                      <div className="bg-pink-50 text-pink-800 px-4 py-2 rounded-md border border-pink-100 w-full">
                        <div className="font-medium">{insight.title}</div>
                        <div className="text-sm mt-1">{insight.description.substring(0, 100)}...</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="bg-green-100 text-green-800 font-medium px-6 py-3 rounded-md border border-green-200 w-48 text-center">
            All Tests Passed
          </div>
        )}
      </div>

      {/* Performance and Security Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Performance Analysis */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 text-blue-800 font-medium px-6 py-3 rounded-md border border-blue-200 w-48 text-center">
            Performance Analysis
          </div>
          <div className="w-0.5 h-8 bg-gray-300 my-2"></div>
          <div className="space-y-4 w-full">
            {analysisResults.performanceInsights.map((insight, index) => (
              <div key={index} className="bg-cyan-50 text-cyan-800 px-4 py-2 rounded-md border border-cyan-100">
                <div className="font-medium">{insight.title}</div>
                <div className="text-sm mt-1">{insight.description.substring(0, 100)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Analysis */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 text-blue-800 font-medium px-6 py-3 rounded-md border border-blue-200 w-48 text-center">
            Security Analysis
          </div>
          <div className="w-0.5 h-8 bg-gray-300 my-2"></div>
          <div className="space-y-4 w-full">
            {analysisResults.securityInsights.map((insight, index) => (
              <div key={index} className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded-md border border-yellow-100">
                <div className="font-medium">{insight.title}</div>
                <div className="text-sm mt-1">{insight.description.substring(0, 100)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BuildAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults>({
    buildStatus: "success",
    buildTime: "5m 33s",
    averageBuildTime: "6m 18s",
    improvementPercentage: 12,
    testsPassed: 18,
    testsFailed: 0,
    testWarnings: 2,
    performanceInsights: [],
    codeQualityInsights: [],
    securityInsights: []
  })

  // Reset analysis state when component is mounted (e.g., after a rebuild)
  useEffect(() => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setAnalysisComplete(false)
    
    // Get test results from localStorage if available
    const savedTestResults = localStorage.getItem('testResults');
    const initialTestResults = savedTestResults ? JSON.parse(savedTestResults) as TestResult : null;
    
    setAnalysisResults({
      buildStatus: (initialTestResults?.failed ?? 0) > 0 ? "failed" : "success",
      buildTime: "5m 33s",
      averageBuildTime: "6m 18s",
      improvementPercentage: 12,
      testsPassed: initialTestResults?.passed ?? 18,
      testsFailed: initialTestResults?.failed ?? 0,
      testWarnings: 2,
      performanceInsights: [],
      codeQualityInsights: [],
      securityInsights: []
    })
  }, [])

  // Simulate AI analysis
  useEffect(() => {
    if (!isAnalyzing) return

    let isMounted = true
    const interval = setInterval(() => {
      if (!isMounted) return

      setAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 10
        if (newProgress >= 100) {
          clearInterval(interval)
          if (isMounted) {
            setIsAnalyzing(false)
            setAnalysisComplete(true)
            
            // Get test results from localStorage
            const savedTestResults = localStorage.getItem('testResults');
            const testResults: TestResult | null = savedTestResults ? JSON.parse(savedTestResults) : null;
            
            // Use actual test results if available, otherwise generate random ones
            const testsFailed = testResults ? testResults.failed : (Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0);
            const testsPassed = testResults ? testResults.passed : (18 - testsFailed);
            
            // Generate AI insights based on failed tests
            const codeQualityInsights: Insight[] = [];
            
            if (testResults && testResults.failedTests && testResults.failedTests.length > 0) {
              // Group failed tests by test class
              const failedTestsByClass: Record<string, FailedTest[]> = {};
              testResults.failedTests.forEach((test: FailedTest) => {
                if (!failedTestsByClass[test.testName]) {
                  failedTestsByClass[test.testName] = [];
                }
                failedTestsByClass[test.testName].push(test);
              });
              
              // Generate insights for each failed test class
              Object.entries(failedTestsByClass).forEach(([testName, tests]: [string, FailedTest[]]) => {
                const methods = tests.map((t: FailedTest) => t.methodName).join(', ');
                
                // Generate specific suggestions based on test name
                if (testName.includes('Payment')) {
                  codeQualityInsights.push({
                    title: `${testName} Test Failures`,
                    description: `${tests.length} test method(s) failed in ${testName}: ${methods}. The issue appears to be in the payment processing module.`,
                  impact: "High",
                    code: `// Fix in ${testName}.java
@Test
public void ${tests[0].methodName}() {
  // Current implementation doesn't handle declined payments correctly
  // Add proper error handling:
  try {
    paymentProcessor.processPayment(payment);
  } catch (PaymentDeclinedException e) {
    // Handle declined payment
    assertEquals(PaymentStatus.DECLINED, payment.getStatus());
  }
}`
                  });
                } else if (testName.includes('Cart')) {
                  codeQualityInsights.push({
                    title: `${testName} Test Failures`,
                    description: `${tests.length} test method(s) failed in ${testName}: ${methods}. The issue appears to be in the shopping cart module.`,
                    impact: "High",
                    code: `// Fix in ${testName}.java
@Test
public void ${tests[0].methodName}() {
  // Current implementation doesn't handle empty cart edge case
  // Add validation before operations:
  if (cart.isEmpty()) {
    assertThrows(EmptyCartException.class, () -> cart.checkout());
    return;
  }
  // Continue with normal test flow for non-empty cart
}`
                  });
                } else if (testName.includes('UI')) {
                  codeQualityInsights.push({
                    title: `${testName} Test Failures`,
                    description: `${tests.length} test method(s) failed in ${testName}: ${methods}. The issue appears to be in the UI components.`,
                    impact: "Medium",
                    code: `// Fix in ${testName}.java
@Test
public void ${tests[0].methodName}() {
  // Current implementation doesn't wait for UI elements to be visible
  // Add proper waiting mechanism:
  WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
  wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element-id")));
  // Continue with test after element is visible
}`
                  });
                } else {
                  codeQualityInsights.push({
                    title: `${testName} Test Failures`,
                    description: `${tests.length} test method(s) failed in ${testName}: ${methods}.`,
                    impact: "Medium",
                    code: `// Fix in ${testName}.java
@Test
public void ${tests[0].methodName}() {
  // Review the assertion that's failing:
  // assertEquals(expected, actual);
  // Make sure the expected value matches what the code should actually produce
}`
                  });
                }
              });
            }
            
            // Add general test coverage insight if no specific failures
            if (codeQualityInsights.length === 0) {
              codeQualityInsights.push({
                  title: "Test Coverage Improvement",
                  description: "Your branch coverage is at 65%, which is below your team's target of 80%. Consider adding more tests for conditional logic in the checkout and payment modules.",
                  impact: "Medium"
              });
            }
            
            // Add code duplication insight
            codeQualityInsights.push({
                  title: "Code Duplication",
                  description: "We detected similar code patterns in the UI components. Consider refactoring to reduce duplication.",
                  impact: "Low",
                  code: `// Consider creating a shared component:
class SharedPaymentForm extends Component {
  // Common payment form logic here
}`
            });
            
            const performanceInsights: Insight[] = [
              {
                title: "Gradle Cache Optimization",
                description: "Your Gradle dependency resolution is taking longer than necessary. Consider enabling the Gradle build cache.",
                impact: "Medium",
                code: `// Add to gradle.properties
org.gradle.caching=true
org.gradle.parallel=true
org.gradle.configureondemand=true`
              },
              {
                title: "Resource Optimization",
                description: "The mergeReleaseResources task is taking longer than expected (5s). Consider optimizing your drawable resources by using vector drawables or WebP format for images.",
                impact: "Low"
              }
            ];
            
            const securityInsights: Insight[] = [
                {
                  title: "Dependency Updates Available",
                  description: "Some of your dependencies have newer versions available with security fixes.",
                  impact: "Security",
                  code: `// Update in build.gradle
dependencies {
    implementation 'androidx.core:core-ktx:1.10.0' // Current: 1.9.0
    implementation 'com.google.android.material:material:1.9.0' // Current: 1.8.0
}`
                }
            ];
            
            setAnalysisResults({
              buildStatus: testsFailed > 0 ? "failed" : "success",
              buildTime: "5m 33s",
              averageBuildTime: "6m 18s",
              improvementPercentage: 12,
              testsFailed,
              testsPassed,
              testWarnings: 2,
              performanceInsights,
              codeQualityInsights,
              securityInsights
            });
          }
          
          return 100;
        }
        return newProgress;
      });
    }, 300);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isAnalyzing]);

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "High":
        return <Badge variant="destructive">{impact}</Badge>;
      case "Medium":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">{impact}</Badge>;
      case "Low":
        return <Badge variant="outline">{impact}</Badge>;
      case "Security":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200">{impact}</Badge>;
      default:
        return <Badge variant="outline">{impact}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {isAnalyzing ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
              AI Analysis in Progress
            </CardTitle>
            <CardDescription>Docklet's AI is analyzing your build logs and performance metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing build logs and test results</span>
                <span>{Math.round(analysisProgress)}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs defaultValue="summary">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="code">Code Quality</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                AI Build Analysis
              </CardTitle>
              <CardDescription>Docklet's AI has analyzed your build logs and performance metrics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-md border">
                <div className="flex items-start gap-3">
                  {analysisResults.buildStatus === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-1" />
                  )}
                  <div>
                    <h3 className="font-medium mb-1">
                      {analysisResults.buildStatus === "success" ? "Build Successful" : "Build Completed with Issues"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {analysisResults.buildStatus === "success" ? (
                        <>
                          Your build completed successfully in {analysisResults.buildTime}, which is {analysisResults.improvementPercentage}% faster than your average build time ({analysisResults.averageBuildTime}). 
                          All {analysisResults.testsPassed} tests passed successfully{analysisResults.testWarnings > 0 ? ` with ${analysisResults.testWarnings} warnings` : " with no warnings or errors"}.
                        </>
                      ) : (
                        <>
                          Your build completed in {analysisResults.buildTime} with {analysisResults.testsFailed} failed tests out of {analysisResults.testsPassed + analysisResults.testsFailed} total tests. 
                          This is {analysisResults.improvementPercentage}% faster than your average build time ({analysisResults.averageBuildTime}).
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>Opportunities to improve your build performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResults.performanceInsights.map((insight, index) => (
                  <div key={index} className="p-4 bg-muted rounded-md border">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-amber-500 mt-1" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{insight.title}</h3>
                          {getImpactBadge(insight.impact)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {insight.description}
                        </p>
                        {insight.code && (
                          <div className="bg-background p-3 rounded border text-sm font-mono">
                            <pre>{insight.code}</pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                  <CardDescription>Opportunities to improve your build performance.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResults.performanceInsights.map((insight, index) => (
                      <div key={index} className="p-4 bg-muted rounded-md border">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-amber-500 mt-1" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{insight.title}</h3>
                              {getImpactBadge(insight.impact)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {insight.description}
                            </p>
                            {insight.code && (
                              <div className="bg-background p-3 rounded border text-sm font-mono">
                                <pre>{insight.code}</pre>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="code" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Code Quality Insights</CardTitle>
              <CardDescription>Suggestions to improve your code quality.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResults.codeQualityInsights.map((insight, index) => (
                  <div key={index} className="p-4 bg-muted rounded-md border">
                    <div className="flex items-start gap-3">
                      {insight.title.includes("Failure") ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                      ) : (
                        <Code className="h-5 w-5 text-blue-500 mt-1" />
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{insight.title}</h3>
                          {getImpactBadge(insight.impact)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {insight.description}
                        </p>
                        {insight.code && (
                          <div className="bg-background p-3 rounded border text-sm font-mono">
                            <pre>{insight.code}</pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Insights</CardTitle>
              <CardDescription>Security recommendations for your application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResults.securityInsights.map((insight, index) => (
                  <div key={index} className="p-4 bg-muted rounded-md border">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-purple-500 mt-1" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{insight.title}</h3>
                          {getImpactBadge(insight.impact)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {insight.description}
                        </p>
                        {insight.code && (
                          <div className="bg-background p-3 rounded border text-sm font-mono">
                            <pre>{insight.code}</pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
            </TabsContent>
            
            <TabsContent value="visualization" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Visualization</CardTitle>
                  <CardDescription>Visual representation of build analysis and improvement suggestions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-4 bg-white overflow-auto">
                    <BuildAnalysisVisualization analysisResults={analysisResults} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}