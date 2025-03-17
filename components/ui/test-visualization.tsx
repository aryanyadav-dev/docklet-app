"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Circle, CheckCircle2, XCircle, Clock } from "lucide-react"

interface TestMethod {
  name: string;
  status: string;
  duration?: string;
}

interface TestCase {
  id: string;
  name: string;
  status: string;
  methods: TestMethod[];
}

interface TestGroup {
  name: string;
  tests: TestCase[];
}

interface TestVisualizationProps {
  unitTests: TestCase[];
  instrumentedTests: TestCase[];
  className?: string;
}

export function TestVisualization({ unitTests, instrumentedTests, className = "" }: TestVisualizationProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})
  const [expandedTests, setExpandedTests] = useState<Record<string, boolean>>({})

  // Initialize with all groups expanded
  useEffect(() => {
    setExpandedGroups({
      "unit-tests": true,
      "instrumented-tests": true
    });
    
    // Initialize with failed tests expanded
    const initialExpandedTests: Record<string, boolean> = {};
    [...unitTests, ...instrumentedTests].forEach(test => {
      initialExpandedTests[test.id] = test.status === "failed";
    });
    setExpandedTests(initialExpandedTests);
  }, [unitTests, instrumentedTests]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const toggleTest = (testId: string) => {
    setExpandedTests(prev => ({
      ...prev,
      [testId]: !prev[testId]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "running":
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <Circle className="h-4 w-4 text-gray-300" />;
    }
  };

  if (unitTests.length === 0 && instrumentedTests.length === 0) {
    return (
      <div className={`flex justify-center items-center p-8 ${className}`}>
        <p className="text-muted-foreground">No test results to display</p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Start node */}
      <div className="flex items-center justify-center mb-4">
        <div className="bg-green-100 text-green-800 font-medium px-4 py-2 rounded-full border border-green-200">
          Start Test Execution
        </div>
      </div>

      {/* Connector line */}
      <div className="flex justify-center mb-2">
        <div className="w-0.5 h-6 bg-gray-300"></div>
      </div>

      {/* Test Environment Setup */}
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-100 text-blue-800 font-medium px-4 py-2 rounded-md border border-blue-200 w-64 text-center">
          Test Environment Setup
        </div>
      </div>

      {/* Connector line */}
      <div className="flex justify-center mb-2">
        <div className="w-0.5 h-6 bg-gray-300"></div>
      </div>

      {/* Test Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* Unit Tests Group */}
        <div className="flex flex-col items-center">
          <div 
            className="bg-purple-100 text-purple-800 font-medium px-4 py-2 rounded-md border border-purple-200 w-full text-center cursor-pointer flex items-center justify-between"
            onClick={() => toggleGroup("unit-tests")}
          >
            <span>Unit Tests ({unitTests.length})</span>
            <ChevronRight 
              className={`h-4 w-4 transition-transform ${expandedGroups["unit-tests"] ? 'rotate-90' : ''}`} 
            />
          </div>

          {expandedGroups["unit-tests"] && (
            <div className="w-full mt-2 space-y-2">
              {/* Connector line */}
              <div className="flex justify-center mb-2">
                <div className="w-0.5 h-4 bg-gray-300"></div>
              </div>

              {/* Failed Tests */}
              {unitTests.filter(test => test.status === "failed").length > 0 && (
                <div className="ml-4">
                  <div className="bg-red-100 text-red-800 font-medium px-4 py-2 rounded-md border border-red-200 mb-2">
                    Failed Tests ({unitTests.filter(test => test.status === "failed").length})
                  </div>
                  
                  {unitTests.filter(test => test.status === "failed").map((test) => (
                    <div key={test.id} className="ml-4 mb-2">
                      <div 
                        className="bg-red-50 text-red-800 px-4 py-2 rounded-md border border-red-100 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleTest(test.id)}
                      >
                        <div className="flex items-center gap-2">
                          {getStatusIcon(test.status)}
                          <span>{test.name}</span>
                        </div>
                        <ChevronRight 
                          className={`h-4 w-4 transition-transform ${expandedTests[test.id] ? 'rotate-90' : ''}`} 
                        />
                      </div>
                      
                      {expandedTests[test.id] && (
                        <div className="ml-4 mt-1 space-y-1">
                          {test.methods.map((method, index) => (
                            <div key={index} className="flex items-center gap-2 bg-white px-3 py-1 rounded-md border">
                              {getStatusIcon(method.status)}
                              <span className="text-sm">{method.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Passed Tests */}
              {unitTests.filter(test => test.status === "success").length > 0 && (
                <div className="ml-4">
                  <div className="bg-green-100 text-green-800 font-medium px-4 py-2 rounded-md border border-green-200 mb-2">
                    Passed Tests ({unitTests.filter(test => test.status === "success").length})
                  </div>
                  
                  {unitTests.filter(test => test.status === "success").map((test) => (
                    <div key={test.id} className="ml-4 mb-2">
                      <div 
                        className="bg-green-50 text-green-800 px-4 py-2 rounded-md border border-green-100 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleTest(test.id)}
                      >
                        <div className="flex items-center gap-2">
                          {getStatusIcon(test.status)}
                          <span>{test.name}</span>
                        </div>
                        <ChevronRight 
                          className={`h-4 w-4 transition-transform ${expandedTests[test.id] ? 'rotate-90' : ''}`} 
                        />
                      </div>
                      
                      {expandedTests[test.id] && (
                        <div className="ml-4 mt-1 space-y-1">
                          {test.methods.map((method, index) => (
                            <div key={index} className="flex items-center gap-2 bg-white px-3 py-1 rounded-md border">
                              {getStatusIcon(method.status)}
                              <span className="text-sm">{method.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instrumented Tests Group */}
        <div className="flex flex-col items-center">
          <div 
            className="bg-purple-100 text-purple-800 font-medium px-4 py-2 rounded-md border border-purple-200 w-full text-center cursor-pointer flex items-center justify-between"
            onClick={() => toggleGroup("instrumented-tests")}
          >
            <span>Instrumented Tests ({instrumentedTests.length})</span>
            <ChevronRight 
              className={`h-4 w-4 transition-transform ${expandedGroups["instrumented-tests"] ? 'rotate-90' : ''}`} 
            />
          </div>

          {expandedGroups["instrumented-tests"] && (
            <div className="w-full mt-2 space-y-2">
              {/* Connector line */}
              <div className="flex justify-center mb-2">
                <div className="w-0.5 h-4 bg-gray-300"></div>
              </div>

              {/* Failed Tests */}
              {instrumentedTests.filter(test => test.status === "failed").length > 0 && (
                <div className="ml-4">
                  <div className="bg-red-100 text-red-800 font-medium px-4 py-2 rounded-md border border-red-200 mb-2">
                    Failed Tests ({instrumentedTests.filter(test => test.status === "failed").length})
                  </div>
                  
                  {instrumentedTests.filter(test => test.status === "failed").map((test) => (
                    <div key={test.id} className="ml-4 mb-2">
                      <div 
                        className="bg-red-50 text-red-800 px-4 py-2 rounded-md border border-red-100 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleTest(test.id)}
                      >
                        <div className="flex items-center gap-2">
                          {getStatusIcon(test.status)}
                          <span>{test.name}</span>
                        </div>
                        <ChevronRight 
                          className={`h-4 w-4 transition-transform ${expandedTests[test.id] ? 'rotate-90' : ''}`} 
                        />
                      </div>
                      
                      {expandedTests[test.id] && (
                        <div className="ml-4 mt-1 space-y-1">
                          {test.methods.map((method, index) => (
                            <div key={index} className="flex items-center gap-2 bg-white px-3 py-1 rounded-md border">
                              {getStatusIcon(method.status)}
                              <span className="text-sm">{method.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Passed Tests */}
              {instrumentedTests.filter(test => test.status === "success").length > 0 && (
                <div className="ml-4">
                  <div className="bg-green-100 text-green-800 font-medium px-4 py-2 rounded-md border border-green-200 mb-2">
                    Passed Tests ({instrumentedTests.filter(test => test.status === "success").length})
                  </div>
                  
                  {instrumentedTests.filter(test => test.status === "success").map((test) => (
                    <div key={test.id} className="ml-4 mb-2">
                      <div 
                        className="bg-green-50 text-green-800 px-4 py-2 rounded-md border border-green-100 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleTest(test.id)}
                      >
                        <div className="flex items-center gap-2">
                          {getStatusIcon(test.status)}
                          <span>{test.name}</span>
                        </div>
                        <ChevronRight 
                          className={`h-4 w-4 transition-transform ${expandedTests[test.id] ? 'rotate-90' : ''}`} 
                        />
                      </div>
                      
                      {expandedTests[test.id] && (
                        <div className="ml-4 mt-1 space-y-1">
                          {test.methods.map((method, index) => (
                            <div key={index} className="flex items-center gap-2 bg-white px-3 py-1 rounded-md border">
                              {getStatusIcon(method.status)}
                              <span className="text-sm">{method.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Connector line */}
      <div className="flex justify-center mb-2">
        <div className="w-0.5 h-6 bg-gray-300"></div>
      </div>

      {/* Test Summary */}
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-100 text-blue-800 font-medium px-4 py-2 rounded-md border border-blue-200 w-64 text-center">
          Test Summary
        </div>
      </div>

      {/* Connector line */}
      <div className="flex justify-center mb-2">
        <div className="w-0.5 h-6 bg-gray-300"></div>
      </div>

      {/* End node */}
      <div className="flex items-center justify-center">
        <div className="bg-red-100 text-red-800 font-medium px-4 py-2 rounded-full border border-red-200">
          End Test Execution
        </div>
      </div>
    </div>
  );
} 