"use client"
import { Container, GitBranch, Layers, Lock, Rocket, Smartphone } from "lucide-react"
import { motion } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { FeatureCard } from "@/components/feature-card"
import { PlatformSection } from "@/components/platform-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-indigo-400 blur-3xl dark:bg-indigo-700"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-400 blur-3xl dark:bg-blue-700"></div>
        <div className="absolute top-2/3 left-1/4 w-72 h-72 rounded-full bg-purple-400 blur-3xl dark:bg-purple-700"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none"></div>

      <HeroSection />

      <section className="py-16 px-4 md:py-24 relative">
        <motion.div 
          className="container mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">
              Why Choose Docklet?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Most CI/CD tools for mobile apps are hard to configure, not portable, and expensive to scale. Docklet
              fixes this by containerizing every step of the mobile dev lifecycle.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            <FeatureCardAnimated
              icon={<Container className="h-10 w-10 text-indigo-500" />}
              title="Dockerized Build Runtimes"
              description="Prebuilt Docker images for Android, iOS, Flutter, React Native, and Kotlin Multiplatform."
            />
            <FeatureCardAnimated
              icon={<Smartphone className="h-10 w-10 text-indigo-500" />}
              title="One-Click Emulator Testing"
              description="Run Android emulators inside Docker with auto-screenshots & video logs for every test run."
            />
            <FeatureCardAnimated
              icon={<Lock className="h-10 w-10 text-indigo-500" />}
              title="Secure App Signing Vault"
              description="Store keystores, provisioning profiles, and signing certs securely in Vault or SOPS."
            />
            <FeatureCardAnimated
              icon={<GitBranch className="h-10 w-10 text-indigo-500" />}
              title="Instant Rollbacks"
              description="Build state is checkpointed in containers. Roll back failed releases or test older builds on-demand."
            />
            <FeatureCardAnimated
              icon={<Layers className="h-10 w-10 text-indigo-500" />}
              title="Matrix Testing"
              description="Test on multiple device profiles in parallel Docker containers with smart parallelism."
            />
            <FeatureCardAnimated
              icon={<Rocket className="h-10 w-10 text-indigo-500" />}
              title="AI-Powered Analysis"
              description="Auto-summarize failed builds and get suggested fixes based on error patterns."
            />
          </motion.div>
        </motion.div>
      </section>

      <PlatformSection />
      <PricingSection />
      <CtaSection />
    </div>
  )
}

// Animated version of FeatureCard
const FeatureCardAnimated = ({ icon, title, description }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700 relative overflow-hidden group"
    >
      <div className="absolute -right-16 -top-16 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative z-10">
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="mb-4"
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 w-0 group-hover:w-full transition-all duration-300"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
      />
    </motion.div>
  )
}