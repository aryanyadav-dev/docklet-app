"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Copy, Download, Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export function BuildLogs() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(logs)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const logs = `[14:32:15] Starting build process...
[14:32:16] Pulling Docker image: docklet/android-sdk:33
[14:32:20] Image pulled successfully
[14:32:21] Starting container...
[14:32:22] Container started: docklet_build_1234
[14:32:23] Working directory: /app
[14:32:24] Executing: git checkout main
[14:32:25] Switched to branch 'main'
[14:32:26] Your branch is up to date with 'origin/main'.
[14:32:27] Executing: ./gradlew dependencies
[14:32:28] > Configure project :app
[14:32:30] Checking the license for package Android SDK Platform 33 in /opt/android-sdk/licenses
[14:32:31] License for package Android SDK Platform 33 accepted.
[14:32:35] > Task :app:dependencies
[14:32:40] +--- androidx.core:core-ktx:1.9.0
[14:32:41] |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:32:42] |    +--- androidx.core:core:1.9.0
[14:32:43] |    |    +--- androidx.annotation:annotation:1.2.0 -> 1.5.0
[14:32:44] |    |    +--- androidx.annotation:annotation-experimental:1.3.0
[14:32:45] |    |    +--- androidx.collection:collection:1.0.0 -> 1.1.0
[14:32:46] |    |    |    \\--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:32:47] |    |    +--- androidx.concurrent:concurrent-futures:1.1.0
[14:32:48] |    |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:32:49] |    |    |    \\--- com.google.guava:listenablefuture:1.0
[14:32:50] |    |    +--- androidx.lifecycle:lifecycle-runtime:2.3.1 -> 2.5.1
[14:32:51] |    |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:32:52] |    |    |    +--- androidx.arch.core:core-common:2.1.0
[14:32:53] |    |    |    |    \\--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:32:54] |    |    |    +--- androidx.arch.core:core-runtime:2.1.0
[14:32:55] |    |    |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:32:56] |    |    |    |    \\--- androidx.arch.core:core-common:2.1.0 (*)
[14:32:57] |    |    |    \\--- androidx.lifecycle:lifecycle-common:2.5.1
[14:32:58] |    |    |         +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:32:59] |    |    |         \\--- androidx.lifecycle:lifecycle-common-java8:2.5.1
[14:33:00] |    |    |              +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:33:01] |    |    |              \\--- androidx.lifecycle:lifecycle-common:2.5.1 (*)
[14:33:02] |    |    \\--- androidx.versionedparcelable:versionedparcelable:1.1.1
[14:33:03] |    |         +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:33:04] |    |         \\--- androidx.collection:collection:1.0.0 -> 1.1.0 (*)
[14:33:05] |    \\--- org.jetbrains.kotlin:kotlin-stdlib:1.7.10
[14:33:06] |         +--- org.jetbrains.kotlin:kotlin-stdlib-common:1.7.10
[14:33:07] |         \\--- org.jetbrains:annotations:13.0
[14:33:08] +--- androidx.appcompat:appcompat:1.6.1
[14:33:09] |    +--- androidx.activity:activity:1.6.0
[14:33:10] |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:33:11] |    |    +--- androidx.collection:collection:1.0.0 -> 1.1.0 (*)
[14:33:12] |    |    +--- androidx.core:core:1.8.0 -> 1.9.0 (*)
[14:33:13] |    |    +--- androidx.lifecycle:lifecycle-runtime:2.5.1 (*)
[14:33:14] |    |    +--- androidx.lifecycle:lifecycle-viewmodel:2.5.1
[14:33:15] |    |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:33:16] |    |    |    \\--- org.jetbrains.kotlin:kotlin-stdlib:1.6.21 -> 1.7.10 (*)
[14:33:17] |    |    +--- androidx.lifecycle:lifecycle-viewmodel-savedstate:2.5.1
[14:33:18] |    |    |    +--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:33:19] |    |    |    +--- androidx.core:core-ktx:1.2.0 -> 1.9.0 (*)
[14:33:20] |    |    |    +--- androidx.lifecycle:lifecycle-livedata-core:2.5.1
[14:33:21] |    |    |    |    +--- androidx.arch.core:core-common:2.1.0 (*)
[14:33:22] |    |    |    |    +--- androidx.arch.core:core-runtime:2.1.0 (*)
[14:33:23] |    |    |    |    \\--- androidx.lifecycle:lifecycle-common:2.5.1 (*)
[14:33:24] |    |    |    +--- androidx.lifecycle:lifecycle-viewmodel:2.5.1 (*)
[14:33:25] |    |    |    \\--- androidx.savedstate:savedstate:1.2.0
[14:33:26] |    |    |         +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:33:27] |    |    |         +--- androidx.arch.core:core-common:2.1.0 (*)
[14:33:28] |    |    |         +--- androidx.lifecycle:lifecycle-common:2.4.0 -> 2.5.1 (*)
[14:33:29] |    |    |         \\--- org.jetbrains.kotlin:kotlin-stdlib:1.6.0 -> 1.7.10 (*)
[14:33:30] |    |    +--- androidx.savedstate:savedstate:1.2.0 (*)
[14:33:31] |    |    \\--- org.jetbrains.kotlin:kotlin-stdlib:1.7.10 (*)
[14:33:32] |    +--- androidx.annotation:annotation:1.3.0 -> 1.5.0
[14:33:33] |    +--- androidx.appcompat:appcompat-resources:1.6.1
[14:33:34] |    |    +--- androidx.annotation:annotation:1.2.0 -> 1.5.0
[14:33:35] |    |    +--- androidx.collection:collection:1.0.0 -> 1.1.0 (*)
[14:33:36] |    |    +--- androidx.core:core:1.6.0 -> 1.9.0 (*)
[14:33:37] |    |    +--- androidx.vectordrawable:vectordrawable:1.1.0
[14:33:38] |    |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:33:39] |    |    |    +--- androidx.core:core:1.1.0 -> 1.9.0 (*)
[14:33:40] |    |    |    \\--- androidx.collection:collection:1.1.0 (*)
[14:33:41] |    |    \\--- androidx.vectordrawable:vectordrawable-animated:1.1.0
[14:33:42] |    |         +--- androidx.vectordrawable:vectordrawable:1.1.0 (*)
[14:33:43] |    |         +--- androidx.interpolator:interpolator:1.0.0
[14:33:44] |    |         |    \\--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:33:45] |    |         \\--- androidx.collection:collection:1.1.0 (*)
[14:33:46] |    +--- androidx.collection:collection:1.0.0 -> 1.1.0 (*)
[14:33:47] |    +--- androidx.core:core:1.9.0 (*)
[14:33:48] |    +--- androidx.core:core-ktx:1.8.0 -> 1.9.0 (*)
[14:33:49] |    +--- androidx.cursoradapter:cursoradapter:1.0.0
[14:33:50] |    |    \\--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:33:51] |    +--- androidx.drawerlayout:drawerlayout:1.0.0
[14:33:52] |    |    +--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:33:53] |    |    +--- androidx.core:core:1.0.0 -> 1.9.0 (*)
[14:33:54] |    |    \\--- androidx.customview:customview:1.0.0
[14:33:55] |    |         +--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:33:56] |    |         \\--- androidx.core:core:1.0.0 -> 1.9.0 (*)
[14:33:57] |    +--- androidx.emoji2:emoji2:1.2.0
[14:33:58] |    |    +--- androidx.annotation:annotation:1.2.0 -> 1.5.0
[14:33:59] |    |    +--- androidx.collection:collection:1.1.0 (*)
[14:34:00] |    |    +--- androidx.core:core:1.3.0 -> 1.9.0 (*)
[14:34:01] |    |    +--- androidx.lifecycle:lifecycle-process:2.4.1
[14:34:02] |    |    |    +--- androidx.lifecycle:lifecycle-runtime:2.4.1 -> 2.5.1 (*)
[14:34:03] |    |    |    \\--- androidx.startup:startup-runtime:1.1.1
[14:34:04] |    |    |         \\--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:34:05] |    |    \\--- androidx.startup:startup-runtime:1.0.0 -> 1.1.1 (*)
[14:34:06] |    +--- androidx.emoji2:emoji2-views-helper:1.2.0
[14:34:07] |    |    +--- androidx.collection:collection:1.1.0 (*)
[14:34:08] |    |    +--- androidx.core:core:1.3.0 -> 1.9.0 (*)
[14:34:09] |    |    \\--- androidx.emoji2:emoji2:1.2.0 (*)
[14:34:10] |    +--- androidx.fragment:fragment:1.3.6
[14:34:11] |    |    +--- androidx.activity:activity:1.2.4 -> 1.6.0 (*)
[14:34:12] |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:34:13] |    |    +--- androidx.collection:collection:1.1.0 (*)
[14:34:14] |    |    +--- androidx.core:core-ktx:1.2.0 -> 1.9.0 (*)
[14:34:15] |    |    +--- androidx.lifecycle:lifecycle-livedata-core:2.3.1 -> 2.5.1 (*)
[14:34:16] |    |    +--- androidx.lifecycle:lifecycle-viewmodel:2.3.1 -> 2.5.1 (*)
[14:34:17] |    |    +--- androidx.lifecycle:lifecycle-viewmodel-savedstate:2.3.1 -> 2.5.1 (*)
[14:34:18] |    |    +--- androidx.loader:loader:1.0.0
[14:34:19] |    |    |    +--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:34:20] |    |    |    +--- androidx.collection:collection:1.0.0 -> 1.1.0 (*)
[14:34:21] |    |    |    +--- androidx.core:core:1.0.0 -> 1.9.0 (*)
[14:34:22] |    |    |    \\--- androidx.lifecycle:lifecycle-livedata:2.0.0
[14:34:23] |    |    |         +--- androidx.arch.core:core-runtime:2.0.0 -> 2.1.0 (*)
[14:34:24] |    |    |         +--- androidx.lifecycle:lifecycle-livedata-core:2.0.0 -> 2.5.1 (*)
[14:34:25] |    |    |         \\--- androidx.arch.core:core-common:2.0.0 -> 2.1.0 (*)
[14:34:26] |    |    +--- androidx.savedstate:savedstate:1.1.0 -> 1.2.0 (*)
[14:34:27] |    |    \\--- androidx.viewpager:viewpager:1.0.0
[14:34:28] |    |         +--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:34:29] |    |         +--- androidx.core:core:1.0.0 -> 1.9.0 (*)
[14:34:30] |    |         \\--- androidx.customview:customview:1.0.0 (*)
[14:34:31] |    +--- androidx.lifecycle:lifecycle-runtime:2.5.1 (*)
[14:34:32] |    +--- androidx.lifecycle:lifecycle-viewmodel:2.5.1 (*)
[14:34:33] |    +--- androidx.resourceinspection:resourceinspection-annotation:1.0.1
[14:34:34] |    |    \\--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:34:35] |    \\--- androidx.savedstate:savedstate:1.2.0 (*)
[14:34:36] +--- com.google.android.material:material:1.8.0
[14:34:37] |    +--- androidx.annotation:annotation:1.2.0 -> 1.5.0
[14:34:38] |    +--- androidx.appcompat:appcompat:1.5.0 -> 1.6.1 (*)
[14:34:39] |    +--- androidx.cardview:cardview:1.0.0
[14:34:40] |    |    \\--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:34:41] |    +--- androidx.constraintlayout:constraintlayout:2.1.4
[14:34:42] |    |    +--- androidx.appcompat:appcompat:1.2.0 -> 1.6.1 (*)
[14:34:43] |    |    +--- androidx.core:core:1.3.2 -> 1.9.0 (*)
[14:34:44] |    |    \\--- androidx.constraintlayout:constraintlayout-core:1.0.4
[14:34:45] |    +--- androidx.coordinatorlayout:coordinatorlayout:1.1.0
[14:34:46] |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:34:47] |    |    +--- androidx.core:core:1.1.0 -> 1.9.0 (*)
[14:34:48] |    |    +--- androidx.customview:customview:1.0.0 (*)
[14:34:49] |    |    \\--- androidx.collection:collection:1.0.0 -> 1.1.0 (*)
[14:34:50] |    +--- androidx.drawerlayout:drawerlayout:1.1.1
[14:34:51] |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:34:52] |    |    +--- androidx.core:core:1.2.0 -> 1.9.0 (*)
[14:34:53] |    |    \\--- androidx.customview:customview:1.1.0
[14:34:54] |    |         +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:34:55] |    |         +--- androidx.core:core:1.3.0 -> 1.9.0 (*)
[14:34:56] |    |         \\--- androidx.collection:collection:1.1.0 (*)
[14:34:57] |    +--- androidx.dynamicanimation:dynamicanimation:1.0.0
[14:34:58] |    |    +--- androidx.core:core:1.0.0 -> 1.9.0 (*)
[14:34:59] |    |    +--- androidx.collection:collection:1.0.0 -> 1.1.0 (*)
[14:35:00] |    |    \\--- androidx.legacy:legacy-support-core-utils:1.0.0
[14:35:01] |    |         +--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:35:02] |    |         +--- androidx.core:core:1.0.0 -> 1.9.0 (*)
[14:35:03] |    |         +--- androidx.documentfile:documentfile:1.0.0
[14:35:04] |    |         |    \\--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:35:05] |    |         +--- androidx.loader:loader:1.0.0 (*)
[14:35:06] |    |         +--- androidx.localbroadcastmanager:localbroadcastmanager:1.0.0
[14:35:07] |    |         |    \\--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:35:08] |    |         \\--- androidx.print:print:1.0.0
[14:35:09] |    |              \\--- androidx.annotation:annotation:1.0.0 -> 1.5.0
[14:35:10] |    +--- androidx.transition:transition:1.2.0
[14:35:11] |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:35:12] |    |    +--- androidx.core:core:1.0.1 -> 1.9.0 (*)
[14:35:13] |    |    \\--- androidx.collection:collection:1.0.0 -> 1.1.0 (*)
[14:35:14] |    +--- androidx.viewpager2:viewpager2:1.0.0
[14:35:15] |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:35:16] |    |    +--- androidx.collection:collection:1.1.0 (*)
[14:35:17] |    |    +--- androidx.core:core:1.1.0 -> 1.9.0 (*)
[14:35:18] |    |    +--- androidx.fragment:fragment:1.1.0 -> 1.3.6 (*)
[14:35:19] |    |    +--- androidx.lifecycle:lifecycle-runtime:2.1.0 -> 2.5.1 (*)
[14:35:20] |    |    +--- androidx.recyclerview:recyclerview:1.1.0
[14:35:21] |    |    |    +--- androidx.annotation:annotation:1.1.0 -> 1.5.0
[14:35:22] |    |    |    +--- androidx.core:core:1.1.0 -> 1.9.0 (*)
[14:35:23] |    |    |    +--- androidx.customview:customview:1.0.0 (*)
[14:35:24] |    |    |    \\--- androidx.collection:collection:1.0.0 -> 1.1.0 (*)
[14:35:25] |    |    \\--- androidx.viewpager:viewpager:1.0.0 (*)
[14:35:26] |    \\--- com.google.errorprone:error_prone_annotations:2.15.0
[14:35:27] \\--- androidx.constraintlayout:constraintlayout:2.1.4 (*)
[14:35:28] 
[14:35:29] BUILD SUCCESSFUL in 3s
[14:35:30] 1 actionable task: 1 executed
[14:35:31] Executing: ./gradlew assembleRelease
[14:35:32] > Task :app:preBuild UP-TO-DATE
[14:35:33] > Task :app:preReleaseBuild UP-TO-DATE
[14:35:34] > Task :app:compileReleaseKotlin
[14:35:40] > Task :app:compileReleaseJavaWithJavac
[14:35:45] > Task :app:mergeReleaseResources
[14:35:50] > Task :app:processReleaseManifest
[14:35:52] > Task :app:packageReleaseResources
[14:35:55] > Task :app:parseReleaseLocalResources
[14:36:00] > Task :app:generateReleaseRFile
[14:36:02] > Task :app:javaPreCompileRelease
[14:36:03] > Task :app:mergeReleaseShaders
[14:36:04] > Task :app:compileReleaseShaders
[14:36:05] > Task :app:generateReleaseAssets
[14:36:06] > Task :app:mergeReleaseAssets
[14:36:08] > Task :app:processReleaseJavaRes NO-SOURCE
[14:36:09] > Task :app:checkReleaseDuplicateClasses
[14:36:10] > Task :app:desugarReleaseFileDependencies
[14:36:12] > Task :app:mergeExtDexRelease
[14:36:14] > Task :app:mergeDexRelease
[14:36:16] > Task :app:validateSigningRelease
[14:36:17] > Task :app:signingConfigWriterRelease
[14:36:18] > Task :app:mergeReleaseJniLibFolders
[14:36:19] > Task :app:mergeReleaseNativeLibs
[14:36:20] > Task :app:stripReleaseDebugSymbols
[14:36:21] > Task :app:copyReleaseJniLibsProjectAndLocalJars
[14:36:22] > Task :app:processReleaseManifestForPackage
[14:36:23] > Task :app:buildReleasePreBundle
[14:36:25] > Task :app:extractReleaseNativeSymbolTables NO-SOURCE
[14:36:26] > Task :app:mergeReleaseNativeDebugMetadata NO-SOURCE
[14:36:27] > Task :app:packageReleaseBundle
[14:36:30] > Task :app:assembleRelease
[14:36:31] 
[14:36:32] BUILD SUCCESSFUL in 1m 1s
[14:36:33] 28 actionable tasks: 28 executed
[14:36:34] APK generated at: /app/build/outputs/apk/release/app-release.apk
[14:36:35] Executing: ./gradlew test
[14:36:36] > Task :app:compileDebugKotlin
[14:36:40] > Task :app:compileDebugJavaWithJavac
[14:36:45] > Task :app:compileDebugUnitTestKotlin
[14:36:48] > Task :app:compileDebugUnitTestJavaWithJavac
[14:36:50] > Task :app:testDebugUnitTest
[14:36:55] 
[14:36:56] BUILD SUCCESSFUL in 21s
[14:36:57] 5 actionable tasks: 5 executed
[14:36:58] All tests passed successfully
[14:36:59] Executing: ./gradlew connectedAndroidTest
[14:37:00] > Task :app:connectedDebugAndroidTest
[14:37:01] Starting 3 tests on Pixel_4_API_30(AVD) - 11
[14:37:30] Tests ran to completion.
[14:37:31] 
[14:37:32] BUILD SUCCESSFUL in 33s
[14:37:33] 1 actionable task: 1 executed
[14:37:34] All instrumented tests passed successfully
[14:37:35] Executing: docklet sign --keystore=release.jks --alias=appRelease
[14:37:36] Loading keystore from secure vault...
[14:37:37] Keystore loaded successfully
[14:37:38] Signing APK...
[14:37:39] APK signed successfully: /app/build/outputs/apk/release/app-release-signed.apk
[14:37:40] Executing: docklet distribute --service=firebase --groups=qa-team
[14:37:41] Uploading APK to Firebase App Distribution...
[14:37:45] Upload successful!
[14:37:46] App distributed to 5 testers in 'qa-team' group
[14:37:47] Distribution URL: https://appdistribution.firebase.dev/i/abcd1234
[14:37:48] Build completed successfully in 5m 33s
[14:37:49] Stopping container...
[14:37:50] Container stopped: docklet_build_1234
[14:37:51] Cleaning up resources...
[14:37:52] Build artifacts stored at: /builds/1234/
[14:37:53] Done!`

  return (
    <Card className="relative">
      <div className="absolute right-4 top-4 flex gap-2">
        <div className="relative">
          <Input type="text" placeholder="Search logs..." className="w-64 pr-8" />
          <Search className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button variant="outline" size="icon" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 pt-16 font-mono text-xs md:text-sm overflow-auto max-h-[600px]">
        <pre className="whitespace-pre-wrap">{logs}</pre>
      </div>
    </Card>
  )
}

