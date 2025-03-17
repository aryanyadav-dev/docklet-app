"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#302B7F] text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-white">
                Docklet
              </span>
              <br />
              DevOps CI/CD Platform for Mobile Apps
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto lg:mx-0">
              Build, Test, Release mobile apps — faster, safer, and 100% reproducible using containerized CI
              environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-white text-[#302B7F] hover:bg-purple-50" asChild>
                <Link href="/login">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <motion.div
              className="bg-[#241D6C]/80 backdrop-blur border border-[#4C42B7]/30 rounded-lg shadow-xl p-4 font-mono text-sm text-purple-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center gap-2 mb-4 text-purple-200">
                <Terminal className="h-4 w-4" />
                <span>Terminal</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-green-400">$</span> npm install -g docklet-cli
                </div>
                <div>
                  <span className="text-green-400">$</span> docklet init
                </div>
                <motion.div animate={{ opacity: isHovered ? 1 : 0.5 }}>
                  <span className="text-blue-400">✓</span> Created Dockerfile for your Android project
                </motion.div>
                <motion.div animate={{ opacity: isHovered ? 1 : 0.3 }} transition={{ delay: 0.1 }}>
                  <span className="text-blue-400">✓</span> Added Gradle cache configuration
                </motion.div>
                <motion.div animate={{ opacity: isHovered ? 1 : 0.1 }} transition={{ delay: 0.2 }}>
                  <span className="text-blue-400">✓</span> Generated docklet-pipeline.yml
                </motion.div>
                <div>
                  <span className="text-green-400">$</span> docklet run
                </div>
                <motion.div animate={{ opacity: isHovered ? 1 : 0.7 }}>
                  <span className="text-yellow-400">⟳</span> Building Android app in container...
                </motion.div>
                <motion.div animate={{ opacity: isHovered ? 1 : 0.5 }} transition={{ delay: 0.1 }}>
                  <span className="text-yellow-400">⟳</span> Running tests on emulator...
                </motion.div>
                <motion.div animate={{ opacity: isHovered ? 1 : 0.3 }} transition={{ delay: 0.2 }}>
                  <span className="text-green-400">✓</span> Build successful! APK available at ./build/outputs/apk
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}