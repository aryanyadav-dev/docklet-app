import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Developer",
      price: "$0",
      description: "Perfect for individual developers and small projects",
      features: [
        "Unlimited local builds",
        "Android & iOS support",
        "Community support",
        "Basic build analytics",
        "1 concurrent build",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Team",
      price: "$49",
      period: "per month",
      description: "Ideal for small to medium teams working on mobile apps",
      features: [
        "Everything in Developer",
        "5 concurrent builds",
        "Secure signing vault",
        "Matrix testing",
        "Email support",
        "Build failure analysis",
        "30-day build history",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with advanced security and scaling needs",
      features: [
        "Everything in Team",
        "Unlimited concurrent builds",
        "On-premise deployment option",
        "SSO & RBAC",
        "Dedicated support",
        "Custom integrations",
        "Unlimited build history",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Choose the plan that's right for your team. All plans include core Docklet features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`border ${plan.popular ? "border-primary shadow-md relative" : "border-slate-200 dark:border-slate-800"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-slate-500 dark:text-slate-400 ml-1">{plan.period}</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

