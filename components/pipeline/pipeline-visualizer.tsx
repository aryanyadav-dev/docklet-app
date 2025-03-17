"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash, ArrowRight, GripVertical } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PipelineVisualizer() {
  const [stages, setStages] = useState([
    {
      id: 1,
      name: "Build",
      steps: [
        { id: 101, name: "Checkout Code", command: "git checkout $BRANCH" },
        { id: 102, name: "Install Dependencies", command: "./gradlew dependencies" },
        { id: 103, name: "Build APK", command: "./gradlew assembleRelease" },
      ],
    },
    {
      id: 2,
      name: "Test",
      steps: [
        { id: 201, name: "Unit Tests", command: "./gradlew test" },
        { id: 202, name: "UI Tests", command: "./gradlew connectedAndroidTest" },
      ],
    },
    {
      id: 3,
      name: "Sign",
      steps: [{ id: 301, name: "Sign APK", command: "docklet sign --keystore=release.jks --alias=appRelease" }],
    },
    {
      id: 4,
      name: "Deploy",
      steps: [
        { id: 401, name: "Deploy to Firebase", command: "docklet distribute --service=firebase --groups=qa-team" },
      ],
    },
  ])

  const [isAddStepDialogOpen, setIsAddStepDialogOpen] = useState(false)
  const [currentStageId, setCurrentStageId] = useState(null)

  const handleAddStage = () => {
    const newStage = {
      id: Date.now(),
      name: "New Stage",
      steps: [],
    }
    setStages([...stages, newStage])
  }

  const handleAddStep = (stageId) => {
    setCurrentStageId(stageId)
    setIsAddStepDialogOpen(true)
  }

  const handleAddStepConfirm = (stepName, stepCommand) => {
    const updatedStages = stages.map((stage) => {
      if (stage.id === currentStageId) {
        return {
          ...stage,
          steps: [...stage.steps, { id: Date.now(), name: stepName, command: stepCommand }],
        }
      }
      return stage
    })
    setStages(updatedStages)
    setIsAddStepDialogOpen(false)
  }

  const handleRemoveStep = (stageId, stepId) => {
    const updatedStages = stages.map((stage) => {
      if (stage.id === stageId) {
        return {
          ...stage,
          steps: stage.steps.filter((step) => step.id !== stepId),
        }
      }
      return stage
    })
    setStages(updatedStages)
  }

  const handleRemoveStage = (stageId) => {
    setStages(stages.filter((stage) => stage.id !== stageId))
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex-1 min-w-[250px]">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      {stage.name}
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveStage(stage.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Stage {index + 1}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    {stage.steps.map((step) => (
                      <div key={step.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <div className="flex-1 overflow-hidden">
                          <div className="font-medium truncate">{step.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{step.command}</div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveStep(stage.id, step.id)}>
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleAddStep(stage.id)}>
                    <Plus className="h-4 w-4 mr-1" /> Add Step
                  </Button>
                </CardFooter>
              </Card>
              {index < stages.length - 1 && (
                <div className="flex justify-center my-4 md:my-0 md:mx-[-12px] md:rotate-0 md:translate-y-[80px] z-10 relative">
                  <ArrowRight className="h-6 w-6 text-muted-foreground md:rotate-0 rotate-90" />
                </div>
              )}
            </div>
          ))}
          <div className="flex-none flex items-center justify-center">
            <Button variant="outline" className="h-32 w-32 flex flex-col gap-2" onClick={handleAddStage}>
              <Plus className="h-6 w-6" />
              <span>Add Stage</span>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isAddStepDialogOpen} onOpenChange={setIsAddStepDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Pipeline Step</DialogTitle>
            <DialogDescription>Configure a new step for your pipeline stage.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="step-name">Step Name</Label>
              <Input id="step-name" placeholder="e.g., Run Unit Tests" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="step-type">Step Type</Label>
              <Select defaultValue="command">
                <SelectTrigger>
                  <SelectValue placeholder="Select step type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="command">Command</SelectItem>
                  <SelectItem value="script">Script</SelectItem>
                  <SelectItem value="test">Test</SelectItem>
                  <SelectItem value="deploy">Deploy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="command">Command</Label>
              <Input id="command" placeholder="e.g., ./gradlew test" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStepDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const stepName = document.getElementById("step-name").value
                const command = document.getElementById("command").value
                handleAddStepConfirm(stepName, command)
              }}
            >
              Add Step
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

