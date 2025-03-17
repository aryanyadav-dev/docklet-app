"use client"

import { useState, useEffect, useRef } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Copy, Download, Loader2, Wand2 } from "lucide-react"
import { PipelineVisualization } from "@/components/ui/pipeline-visualization"

interface Pipeline {
  name: string;
  stages: PipelineStage[];
}

interface PipelineStage {
  name: string;
  steps: PipelineStep[];
}

interface PipelineStep {
  name: string;
  command: string;
}

// Default pipeline for initial display
const defaultPipeline: Pipeline = {
  name: "Default CI/CD Pipeline",
  stages: [
    {
      name: "Build",
      steps: [
        {
          name: "Checkout code",
          command: "git checkout $BRANCH_NAME"
        },
        {
          name: "Install dependencies",
          command: "npm install"
        }
      ]
    },
    {
      name: "Test",
      steps: [
        {
          name: "Run unit tests",
          command: "npm test"
        }
      ]
    },
    {
      name: "Deploy",
      steps: [
        {
          name: "Build application",
          command: "npm run build"
        },
        {
          name: "Deploy to production",
          command: "npm run deploy"
        }
      ]
    }
  ]
};

export default function PipelineGeneratorPage() {
  const { toast } = useToast()
  const [description, setDescription] = useState("I need a CI/CD pipeline for a Node.js application that builds, tests, and deploys to production.")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPipeline, setGeneratedPipeline] = useState<Pipeline>(defaultPipeline)
  const [yamlOutput, setYamlOutput] = useState("")
  const [jsonOutput, setJsonOutput] = useState("")
  const [displayedYaml, setDisplayedYaml] = useState("")
  const [displayedJson, setDisplayedJson] = useState("")
  const yamlIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const jsonIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Generate initial outputs on page load
  useEffect(() => {
    generateInitialOutputs();
  }, []);

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (yamlIntervalRef.current) clearInterval(yamlIntervalRef.current);
      if (jsonIntervalRef.current) clearInterval(jsonIntervalRef.current);
    };
  }, []);

  const generateInitialOutputs = () => {
    // Generate YAML output
    let yaml = "# Default CI/CD Pipeline\n"
    yaml += `name: ${defaultPipeline.name}\n\n`
    yaml += "stages:\n"
    
    defaultPipeline.stages.forEach(stage => {
      yaml += `  - name: ${stage.name}\n`
      yaml += "    steps:\n"
      stage.steps.forEach(step => {
        yaml += `      - name: ${step.name}\n`
        yaml += `        command: ${step.command}\n`
      })
    })
    
    // Generate JSON output
    const json = JSON.stringify(defaultPipeline, null, 2)
    
    setYamlOutput(yaml)
    setJsonOutput(json)
    setDisplayedYaml("")
    setDisplayedJson("")
    
    // Start typing effect for YAML
    let yamlIndex = 0;
    yamlIntervalRef.current = setInterval(() => {
      if (yamlIndex <= yaml.length) {
        setDisplayedYaml(yaml.substring(0, yamlIndex));
        yamlIndex++;
      } else {
        if (yamlIntervalRef.current) clearInterval(yamlIntervalRef.current);
      }
    }, 20);
    
    // Start typing effect for JSON
    let jsonIndex = 0;
    jsonIntervalRef.current = setInterval(() => {
      if (jsonIndex <= json.length) {
        setDisplayedJson(json.substring(0, jsonIndex));
        jsonIndex++;
      } else {
        if (jsonIntervalRef.current) clearInterval(jsonIntervalRef.current);
      }
    }, 20);
  }

  const generatePipeline = () => {
    if (!description.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a pipeline description.",
      })
      return
    }

    setIsGenerating(true)

    // Clear any existing intervals
    if (yamlIntervalRef.current) clearInterval(yamlIntervalRef.current);
    if (jsonIntervalRef.current) clearInterval(jsonIntervalRef.current);

    // Simulate NLP processing (in a real app, this would be an API call)
    setTimeout(() => {
      // Extract key information from the description
      const keywords = description.toLowerCase()
      
      // Default pipeline structure
      const pipeline: Pipeline = {
        name: "Generated Pipeline",
        stages: [
          {
            name: "Build",
            steps: [
              {
                name: "Checkout code",
                command: "git checkout $BRANCH_NAME"
              },
              {
                name: "Install dependencies",
                command: "npm install"
              }
            ]
          },
          {
            name: "Test",
            steps: [
              {
                name: "Run unit tests",
                command: "npm test"
              }
            ]
          },
          {
            name: "Deploy",
            steps: [
              {
                name: "Build application",
                command: "npm run build"
              },
              {
                name: "Deploy to production",
                command: "npm run deploy"
              }
            ]
          }
        ]
      }
      
      // Customize pipeline based on description
      if (keywords.includes("docker") || keywords.includes("container")) {
        pipeline.stages.splice(2, 0, {
          name: "Containerize",
          steps: [
            {
              name: "Build Docker image",
              command: "docker build -t myapp:$TAG ."
            },
            {
              name: "Push Docker image",
              command: "docker push myapp:$TAG"
            }
          ]
        })
      }
      
      if (keywords.includes("kubernetes") || keywords.includes("k8s")) {
        pipeline.stages[pipeline.stages.length - 1] = {
          name: "Deploy",
          steps: [
            {
              name: "Update Kubernetes manifests",
              command: "sed -i 's/IMAGE_TAG/$TAG/g' k8s/*.yaml"
            },
            {
              name: "Apply Kubernetes manifests",
              command: "kubectl apply -f k8s/"
            }
          ]
        }
      }
      
      if (keywords.includes("aws") || keywords.includes("amazon")) {
        if (keywords.includes("lambda")) {
          pipeline.stages[pipeline.stages.length - 1] = {
            name: "Deploy",
            steps: [
              {
                name: "Package Lambda function",
                command: "zip -r function.zip ."
              },
              {
                name: "Deploy to AWS Lambda",
                command: "aws lambda update-function-code --function-name myFunction --zip-file fileb://function.zip"
              }
            ]
          }
        } else if (keywords.includes("s3") || keywords.includes("static")) {
          pipeline.stages[pipeline.stages.length - 1] = {
            name: "Deploy",
            steps: [
              {
                name: "Build static assets",
                command: "npm run build"
              },
              {
                name: "Upload to S3",
                command: "aws s3 sync ./build s3://my-bucket/ --delete"
              },
              {
                name: "Invalidate CloudFront cache",
                command: "aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths '/*'"
              }
            ]
          }
        }
      }
      
      if (keywords.includes("azure")) {
        pipeline.stages[pipeline.stages.length - 1] = {
          name: "Deploy",
          steps: [
            {
              name: "Build application",
              command: "npm run build"
            },
            {
              name: "Deploy to Azure App Service",
              command: "az webapp deployment source config-zip --resource-group myResourceGroup --name myWebApp --src package.zip"
            }
          ]
        }
      }
      
      if (keywords.includes("security") || keywords.includes("scan")) {
        pipeline.stages.splice(2, 0, {
          name: "Security",
          steps: [
            {
              name: "Run SAST scan",
              command: "npm run security:sast"
            },
            {
              name: "Run dependency scan",
              command: "npm audit"
            }
          ]
        })
      }
      
      // Generate YAML output
      let yaml = "# Generated CI/CD Pipeline\n"
      yaml += `name: ${pipeline.name}\n\n`
      yaml += "stages:\n"
      
      pipeline.stages.forEach(stage => {
        yaml += `  - name: ${stage.name}\n`
        yaml += "    steps:\n"
        stage.steps.forEach(step => {
          yaml += `      - name: ${step.name}\n`
          yaml += `        command: ${step.command}\n`
        })
      })
      
      // Generate JSON output
      const json = JSON.stringify(pipeline, null, 2)
      
      setGeneratedPipeline(pipeline)
      setYamlOutput(yaml)
      setJsonOutput(json)
      setDisplayedYaml("")
      setDisplayedJson("")
      setIsGenerating(false)
      
      // Start typing effect for YAML
      let yamlIndex = 0;
      yamlIntervalRef.current = setInterval(() => {
        if (yamlIndex <= yaml.length) {
          setDisplayedYaml(yaml.substring(0, yamlIndex));
          yamlIndex++;
        } else {
          if (yamlIntervalRef.current) clearInterval(yamlIntervalRef.current);
        }
      }, 20);
      
      // Start typing effect for JSON
      let jsonIndex = 0;
      jsonIntervalRef.current = setInterval(() => {
        if (jsonIndex <= json.length) {
          setDisplayedJson(json.substring(0, jsonIndex));
          jsonIndex++;
        } else {
          if (jsonIntervalRef.current) clearInterval(jsonIntervalRef.current);
        }
      }, 20);
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The pipeline configuration has been copied to your clipboard.",
    })
  }

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Pipeline Generator</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Describe Your Pipeline</CardTitle>
                <CardDescription>
                  Describe your CI/CD pipeline in natural language, and we'll generate a configuration for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Example: I need a CI/CD pipeline for a Node.js application that builds, tests, and deploys to AWS S3. It should include security scanning and Docker containerization."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[200px]"
                />
              </CardContent>
              <CardFooter>
                <Button onClick={generatePipeline} disabled={isGenerating || !description.trim()} className="w-full">
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Pipeline
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pipeline Visualization</CardTitle>
                <CardDescription>
                  Visual representation of your CI/CD pipeline workflow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4 bg-white overflow-auto">
                  <PipelineVisualization pipeline={generatedPipeline} className="max-h-[400px]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Generated Pipeline</CardTitle>
              <CardDescription>
                Your CI/CD pipeline configuration in different formats.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="yaml">
                <TabsList>
                  <TabsTrigger value="yaml">YAML</TabsTrigger>
                  <TabsTrigger value="json">JSON</TabsTrigger>
                </TabsList>
                <TabsContent value="yaml" className="mt-4">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
                      <code>{displayedYaml}</code>
                    </pre>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(yamlOutput)}
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => downloadFile(yamlOutput, "pipeline.yml", "text/yaml")}
                        title="Download YAML"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="json" className="mt-4">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
                      <code>{displayedJson}</code>
                    </pre>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(jsonOutput)}
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => downloadFile(jsonOutput, "pipeline.json", "application/json")}
                        title="Download JSON"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 