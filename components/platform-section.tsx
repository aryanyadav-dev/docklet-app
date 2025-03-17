import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PlatformSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">One Platform, All Mobile Platforms</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Docklet supports all major mobile platforms with specialized Docker images and tooling.
          </p>
        </div>

        <Tabs defaultValue="android" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="android">Android</TabsTrigger>
            <TabsTrigger value="ios">iOS</TabsTrigger>
            <TabsTrigger value="flutter">Flutter</TabsTrigger>
            <TabsTrigger value="reactnative">React Native</TabsTrigger>
          </TabsList>
          <TabsContent value="android" className="mt-0">
            <Card className="border-0 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 p-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Android Development</h3>
                  <p className="mb-4 text-slate-600 dark:text-slate-400">
                    Build, test, and deploy Android applications with our specialized Docker images that include the Android SDK, NDK, and all necessary build tools.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Pre-configured Android SDK and build tools
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Gradle caching for faster builds
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Automated testing on Pixel device emulators
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      APK signing and distribution
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Google Play deployment integration
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example Pipeline Configuration</h4>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm">
                    <pre className="text-xs md:text-sm overflow-x-auto">
                      <code>{`# docklet-pipeline.yml
platform: android
agent: linux-latest
steps:
  - run: ./gradlew assembleRelease
  - test: ./gradlew test
  - test: ./gradlew connectedAndroidTest -PtestDevice="Pixel 4"
  - test: ./gradlew connectedAndroidTest -PtestDevice="Pixel 6"
  - sign:
      keystore: release.keystore
      alias: release-key
  - distribute:
      service: firebase
      groups: ["qa-team", "beta-testers"]`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="ios" className="mt-0">
            <Card className="border-0 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 p-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">iOS Development</h3>
                  <p className="mb-4 text-slate-600 dark:text-slate-400">
                    Build, test, and deploy iOS applications with our macOS-based build agents that include Xcode, CocoaPods, and all necessary iOS development tools.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Latest Xcode versions pre-installed
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      CocoaPods and Swift Package Manager support
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Automated testing on iPhone simulators
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Code signing and provisioning profile management
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      TestFlight and App Store deployment
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example Pipeline Configuration</h4>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm">
                    <pre className="text-xs md:text-sm overflow-x-auto">
                      <code>{`# docklet-pipeline.yml
platform: ios
agent: macos-latest
steps:
  - run: xcodebuild -workspace App.xcworkspace -scheme App
  - test: xcodebuild test -destination "platform=iOS Simulator,name=iPhone 15"
  - test: xcodebuild test -destination "platform=iOS Simulator,name=iPhone 15 Pro"
  - sign:
      certificate: dist.p12
      profile: AppStore.mobileprovision
  - distribute:
      service: testflight
      groups: ["internal", "beta-testers"]`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="flutter" className="mt-0">
            <Card className="border-0 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 p-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Flutter Development</h3>
                  <p className="mb-4 text-slate-600 dark:text-slate-400">
                    Build cross-platform applications with Flutter using our specialized Docker images that include the Flutter SDK and all necessary tools for both Android and iOS builds.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Latest Flutter SDK pre-installed
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Android SDK and iOS toolchain included
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Automated testing on iPhone and Pixel devices
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Build for multiple architectures
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      App store deployment for both platforms
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example Pipeline Configuration</h4>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm">
                    <pre className="text-xs md:text-sm overflow-x-auto">
                      <code>{`# docklet-pipeline.yml
platform: flutter
steps:
  - run: flutter build apk --release
  - run: flutter build ios --release
  - test: flutter test
  - test: flutter drive --target=test_driver/app.dart
  - test: flutter drive --target=test_driver/app.dart --device-id="iPhone 15"
  - test: flutter drive --target=test_driver/app.dart --device-id="Pixel 7"
  - distribute:
      android:
        service: firebase
        groups: ["qa-team"]
      ios:
        service: testflight
        groups: ["internal"]`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="reactnative" className="mt-0">
            <Card className="border-0 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 p-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">React Native Development</h3>
                  <p className="mb-4 text-slate-600 dark:text-slate-400">
                    Build cross-platform applications with React Native using our specialized Docker images that include Node.js, React Native CLI, and all necessary tools for both Android and iOS builds.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Node.js and React Native CLI pre-installed
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Android SDK and iOS toolchain included
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Automated testing with Jest and Detox
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Hermes engine optimization
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      App store deployment for both platforms
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example Pipeline Configuration</h4>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm">
                    <pre className="text-xs md:text-sm overflow-x-auto">
                      <code>{`# docklet-pipeline.yml
platform: react-native
steps:
  - run: yarn install
  - run: npx react-native build-android --mode=release
  - run: npx react-native build-ios --mode=release
  - test: yarn test
  - test: detox test -c ios.sim.release -d "iPhone 15"
  - test: detox test -c android.emu.release -d "Pixel 7"
  - distribute:
      android:
        service: firebase
        groups: ["qa-team"]
      ios:
        service: testflight
        groups: ["internal"]`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

