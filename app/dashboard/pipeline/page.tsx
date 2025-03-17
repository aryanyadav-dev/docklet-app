import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PipelineVisualizer } from "@/components/pipeline/pipeline-visualizer"
import { PipelineEditor } from "@/components/pipeline/pipeline-editor"
import { PipelineHistory } from "@/components/pipeline/pipeline-history"

export default function PipelinePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Pipeline Configuration</h1>
              <p className="text-muted-foreground">Shopping App • Android</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline">Save as Template</Button>
              <Button>Save & Run</Button>
            </div>
          </div>

          <Tabs defaultValue="visual" className="mt-6">
            <TabsList>
              <TabsTrigger value="visual">Visual Editor</TabsTrigger>
              <TabsTrigger value="yaml">YAML Editor</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="visual" className="mt-6">
              <PipelineVisualizer />
            </TabsContent>
            <TabsContent value="yaml" className="mt-6">
              <PipelineEditor />
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <PipelineHistory />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

