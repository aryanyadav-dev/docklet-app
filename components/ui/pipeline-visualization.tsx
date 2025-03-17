"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Circle, CheckCircle2 } from "lucide-react"

interface PipelineStage {
  name: string;
  steps: PipelineStep[];
}

interface PipelineStep {
  name: string;
  command: string;
}

interface Pipeline {
  name: string;
  stages: PipelineStage[];
}

interface PipelineVisualizationProps {
  pipeline: Pipeline;
  className?: string;
}

export function PipelineVisualization({ pipeline, className = "" }: PipelineVisualizationProps) {
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({})

  // Initialize with all stages expanded
  useEffect(() => {
    if (pipeline && pipeline.stages) {
      const initialExpandedState: Record<string, boolean> = {};
      pipeline.stages.forEach((stage, index) => {
        initialExpandedState[`stage-${index}`] = true;
      });
      setExpandedStages(initialExpandedState);
    }
  }, [pipeline]);

  const toggleStage = (stageId: string) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  if (!pipeline || !pipeline.stages || pipeline.stages.length === 0) {
    return (
      <div className={`flex justify-center items-center p-8 ${className}`}>
        <p className="text-muted-foreground">No pipeline to display</p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Start node */}
      <div className="flex items-center justify-center mb-4">
        <div className="bg-green-100 text-green-800 font-medium px-4 py-2 rounded-full border border-green-200">
          Start
        </div>
      </div>

      {/* Pipeline flow */}
      <div className="space-y-2">
        {pipeline.stages.map((stage, stageIndex) => (
          <div key={`stage-${stageIndex}`} className="mb-6">
            {/* Connector line from previous element */}
            <div className="flex justify-center mb-2">
              <div className="w-0.5 h-4 bg-gray-300"></div>
            </div>
            
            {/* Stage node */}
            <div 
              className="bg-purple-100 text-purple-800 font-medium px-4 py-2 rounded-md border border-purple-200 cursor-pointer flex items-center justify-between"
              onClick={() => toggleStage(`stage-${stageIndex}`)}
            >
              <span>{stage.name}</span>
              <ChevronRight 
                className={`h-4 w-4 transition-transform ${expandedStages[`stage-${stageIndex}`] ? 'rotate-90' : ''}`} 
              />
            </div>

            {/* Stage steps */}
            {expandedStages[`stage-${stageIndex}`] && stage.steps.length > 0 && (
              <div className="ml-8 mt-2 space-y-2">
                {stage.steps.map((step, stepIndex) => (
                  <div key={`step-${stageIndex}-${stepIndex}`}>
                    {/* Connector line */}
                    {stepIndex === 0 && (
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-0.5 bg-gray-300 -ml-4"></div>
                      </div>
                    )}
                    
                    {/* Step node */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Circle className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="ml-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-md border border-blue-100 w-full">
                        <div className="font-medium">{step.name}</div>
                        <div className="text-xs font-mono mt-1 bg-blue-100 p-1 rounded">
                          {step.command}
                        </div>
                      </div>
                    </div>
                    
                    {/* Connector line to next step */}
                    {stepIndex < stage.steps.length - 1 && (
                      <div className="flex items-center ml-2 my-1">
                        <div className="w-0.5 h-4 bg-gray-300"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Connector line to next stage */}
            {stageIndex < pipeline.stages.length - 1 && (
              <div className="flex justify-center mt-2">
                <div className="w-0.5 h-4 bg-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* End node */}
      <div className="flex items-center justify-center mt-2">
        <div className="w-0.5 h-4 bg-gray-300 mb-2"></div>
        <div className="bg-red-100 text-red-800 font-medium px-4 py-2 rounded-full border border-red-200">
          End
        </div>
      </div>
    </div>
  );
} 