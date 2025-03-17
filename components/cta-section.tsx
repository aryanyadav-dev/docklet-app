import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Mobile CI/CD?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
          Join thousands of developers who are building, testing, and releasing mobile apps faster with Docklet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
            <Link href="/dashboard">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
            <Link href="/demo">Request Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

