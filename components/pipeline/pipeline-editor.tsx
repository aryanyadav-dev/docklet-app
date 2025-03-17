"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Copy, Download, Upload } from "lucide-react"
import { useState } from "react"

export function PipelineEditor() {
  const [copied, setCopied] = useState(false)
  const [yaml, setYaml] = useState(`# docklet-pipeline.yml
platform: android
environment:
  GRADLE_OPTS: "-Dorg.gradle.daemon=false -Dorg.gradle.parallel=true"
  ANDROID_HOME: "/opt/android-sdk"

stages:
  - name: Build
    steps:
      - run: git checkout $BRANCH
      - run: ./gradlew dependencies
      - run: ./gradlew assembleRelease

  - name: Test
    steps:
      - run: ./gradlew test
      - run: ./gradlew connectedAndroidTest
        with:
          emulator: pixel_4_api_30
          record: true

  - name: Sign
    steps:
      - sign:
          keystore: release.jks
          alias: appRelease
          keystore_password: $KEYSTORE_PASSWORD
          key_password: $KEY_PASSWORD

  - name: Deploy
    steps:
      - distribute:
          service: firebase
          groups: ["qa-team"]
          release_notes: "Automated build from Docklet CI"
`)

  const handleCopy = () => {
    navigator.clipboard.writeText(yaml)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="relative">
      <div className="absolute right-4 top-4 flex gap-2">
        <Button variant="outline" size="icon" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Upload className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 pt-12 font-mono text-sm">
        <textarea
          className="w-full h-[400px] bg-background resize-none focus:outline-none"
          value={yaml}
          onChange={(e) => setYaml(e.target.value)}
        />
      </div>
    </Card>
  )
}

