"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// DevOps knowledge base
const devopsKnowledge = {
  cicd: {
    title: "CI/CD Pipelines",
    general: "CI/CD pipelines are essential for automating the software delivery process. They help in building, testing, and deploying code changes reliably. Popular CI/CD tools include Jenkins, GitHub Actions, GitLab CI/CD, CircleCI, and Travis CI.",
    jenkins: "Jenkins is an open-source automation server that enables developers to build, test, and deploy their software. It offers a wide range of plugins and integrations with other DevOps tools.",
    githubActions: "GitHub Actions is a CI/CD solution integrated directly into GitHub repositories. It allows you to automate workflows based on GitHub events like push, pull request, or issue creation.",
    gitlab: "GitLab CI/CD is part of the GitLab platform and provides a complete DevOps toolchain. It allows you to create pipelines directly from your .gitlab-ci.yml file.",
    bestPractices: "Best practices for CI/CD include: keeping pipelines fast, using parallel execution, implementing proper testing strategies, securing your pipeline, and using infrastructure as code for deployment.",
    troubleshooting: "Common CI/CD pipeline issues include environment inconsistencies, flaky tests, and permission problems. Implement proper logging, use container-based builds, and ensure idempotent operations to minimize these issues."
  },
  docker: {
    title: "Docker & Containerization",
    general: "Docker is a platform for developing, shipping, and running applications in containers. Containers package an application with all its dependencies, ensuring consistency across different environments.",
    architecture: "Docker uses a client-server architecture with the Docker client, Docker daemon, Docker registry, and Docker objects (images, containers, networks, volumes).",
    commands: "Essential Docker commands include: docker build, docker run, docker pull, docker push, docker ps, docker exec, and docker-compose up/down.",
    bestPractices: "Docker best practices include using official base images, minimizing layers, using multi-stage builds, not running as root, and properly tagging images.",
    orchestration: "Container orchestration tools like Kubernetes, Docker Swarm, and Nomad help manage containerized applications at scale, handling deployment, scaling, and networking.",
    security: "Container security best practices include scanning images for vulnerabilities, using minimal base images, implementing least privilege principles, and securing the Docker daemon.",
    networking: "Docker networking allows containers to communicate with each other and the outside world through bridge networks, overlay networks, macvlan networks, and host networking."
  },
  kubernetes: {
    title: "Kubernetes",
    general: "Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.",
    architecture: "Kubernetes architecture consists of a control plane (API server, etcd, scheduler, controller manager) and worker nodes (kubelet, kube-proxy, container runtime).",
    resources: "Key Kubernetes resources include Pods, Deployments, Services, ConfigMaps, Secrets, StatefulSets, DaemonSets, and Ingress controllers.",
    helm: "Helm is a package manager for Kubernetes that helps you define, install, and upgrade applications. Helm uses charts, which are packages of pre-configured Kubernetes resources.",
    operators: "Kubernetes Operators are application-specific controllers that extend the Kubernetes API to create, configure, and manage complex applications.",
    networking: "Kubernetes networking enables communication between pods, services, and external traffic through services, ingress controllers, network policies, and CNI plugins.",
    storage: "Kubernetes provides persistent storage options through PersistentVolumes, PersistentVolumeClaims, StorageClasses, and CSI drivers.",
    troubleshooting: "Common Kubernetes troubleshooting techniques include using kubectl describe/logs, checking pod status, verifying network policies, and using tools like k9s or Lens."
  },
  iac: {
    title: "Infrastructure as Code",
    general: "Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through code instead of manual processes. Popular IaC tools include Terraform, AWS CloudFormation, Pulumi, and Ansible.",
    terraform: "Terraform is a popular IaC tool that allows you to define infrastructure in a declarative configuration language. It supports multiple cloud providers and services.",
    modules: "Terraform modules are reusable components that encapsulate a set of resources with a specific configuration. They help in organizing code and promoting reusability.",
    state: "Terraform state is a crucial component that maps real-world resources to your configuration. It should be stored remotely and secured properly.",
    pulumi: "Pulumi is an IaC tool that allows you to define infrastructure using general-purpose programming languages like TypeScript, Python, Go, and C#.",
    ansible: "Ansible is an agentless configuration management and orchestration tool that uses YAML-based playbooks to define automation tasks.",
    bestPractices: "IaC best practices include version controlling your code, using modules for reusability, implementing proper state management, conducting code reviews, and testing infrastructure changes.",
    testing: "Testing IaC involves validating syntax, checking for security issues, verifying expected resources, and testing the actual deployment in a staging environment."
  },
  cloud: {
    title: "Cloud Platforms",
    general: "Cloud platforms provide on-demand computing resources and services over the internet. The major cloud providers are AWS, Microsoft Azure, and Google Cloud Platform (GCP).",
    aws: "Amazon Web Services (AWS) is a comprehensive cloud platform offering over 200 services including compute, storage, databases, networking, analytics, machine learning, and more.",
    azure: "Microsoft Azure provides a wide range of cloud services integrated with Microsoft's ecosystem, including Azure DevOps, Active Directory, and Office 365.",
    gcp: "Google Cloud Platform (GCP) offers cloud computing services running on Google's infrastructure, with strengths in data analytics, machine learning, and containerization.",
    multicloud: "Multi-cloud strategies involve using services from multiple cloud providers to avoid vendor lock-in, optimize costs, and leverage the best services from each provider.",
    costOptimization: "Cloud cost optimization techniques include right-sizing resources, using spot/preemptible instances, implementing auto-scaling, leveraging reserved instances, and monitoring usage patterns.",
    migration: "Cloud migration strategies include rehosting (lift and shift), replatforming, refactoring, repurchasing, and retiring applications based on business needs and technical requirements."
  },
  monitoring: {
    title: "Monitoring & Observability",
    general: "Monitoring and observability are essential for understanding system behavior, detecting issues, and ensuring optimal performance. Key components include metrics, logs, and traces.",
    tools: "Popular monitoring tools include Prometheus, Grafana, ELK Stack (Elasticsearch, Logstash, Kibana), Datadog, New Relic, and Dynatrace.",
    prometheus: "Prometheus is an open-source monitoring system with a dimensional data model, flexible query language (PromQL), and efficient time series database.",
    grafana: "Grafana is an open-source analytics and visualization platform that integrates with various data sources to create dashboards and alerts.",
    elk: "The ELK Stack (Elasticsearch, Logstash, Kibana) is a powerful log management and analysis solution for collecting, processing, storing, and visualizing log data.",
    apm: "Application Performance Monitoring (APM) tools help track and diagnose performance issues by monitoring metrics like response time, throughput, and error rates.",
    sre: "Site Reliability Engineering (SRE) applies software engineering principles to operations, using SLIs, SLOs, and SLAs to measure and improve reliability.",
    alerting: "Effective alerting strategies include defining clear thresholds, reducing alert fatigue, implementing proper escalation policies, and creating actionable alerts."
  },
  security: {
    title: "DevSecOps",
    general: "DevSecOps integrates security practices into the DevOps lifecycle, making security a shared responsibility throughout the software development process.",
    practices: "DevSecOps practices include threat modeling, secure coding, automated security testing, vulnerability scanning, and security monitoring.",
    tools: "DevSecOps tools include SonarQube, OWASP ZAP, Snyk, Aqua Security, Twistlock, and HashiCorp Vault for secrets management.",
    compliance: "Compliance frameworks like SOC 2, ISO 27001, GDPR, HIPAA, and PCI DSS require specific security controls and documentation that can be automated in the CI/CD pipeline.",
    sast: "Static Application Security Testing (SAST) analyzes source code for security vulnerabilities without executing the application.",
    dast: "Dynamic Application Security Testing (DAST) tests running applications to identify vulnerabilities that might not be apparent in the source code.",
    secretsManagement: "Secrets management involves securely storing, accessing, and rotating sensitive information like API keys, passwords, and certificates using tools like HashiCorp Vault or AWS Secrets Manager.",
    containerSecurity: "Container security focuses on securing the container lifecycle, including image scanning, runtime protection, and network security policies."
  },
  gitops: {
    title: "GitOps",
    general: "GitOps is a way of implementing Continuous Deployment for cloud-native applications. It uses Git as a single source of truth for declarative infrastructure and applications.",
    tools: "Popular GitOps tools include ArgoCD, Flux CD, and Jenkins X. These tools sync the desired state in Git with the actual state in the cluster.",
    benefits: "Benefits of GitOps include improved developer experience, increased productivity, enhanced security, audit trails, and easier rollbacks.",
    practices: "GitOps best practices include using declarative configurations, versioning everything, automating deployments, and implementing proper access controls.",
    argocd: "ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes that automates the deployment of applications by monitoring Git repositories and syncing changes to the cluster.",
    fluxcd: "Flux CD is a GitOps operator for Kubernetes that ensures that the cluster state matches the configuration stored in Git, with support for Helm charts and Kustomize.",
    implementation: "Implementing GitOps involves setting up a Git repository for infrastructure code, configuring a GitOps operator, defining deployment pipelines, and establishing proper access controls."
  },
  microservices: {
    title: "Microservices Architecture",
    general: "Microservices architecture structures an application as a collection of loosely coupled services. Each service is focused on a specific business capability and can be developed, deployed, and scaled independently.",
    patterns: "Common microservices patterns include API Gateway, Service Discovery, Circuit Breaker, CQRS, Event Sourcing, and Saga Pattern.",
    challenges: "Challenges in microservices include distributed system complexity, data consistency, service communication, monitoring, and testing.",
    tools: "Tools for microservices include Spring Boot, Express.js, gRPC, Istio, Consul, and Kong API Gateway.",
    serviceDiscovery: "Service discovery allows services to find and communicate with each other without hardcoded locations, using tools like Consul, etcd, or Kubernetes Services.",
    apiGateway: "API Gateways like Kong, Amazon API Gateway, or Apigee provide a single entry point for client requests, handling cross-cutting concerns like authentication, rate limiting, and request routing.",
    serviceMesh: "Service meshes like Istio, Linkerd, and Consul Connect provide infrastructure layer for service-to-service communication with features like traffic management, security, and observability.",
    eventDriven: "Event-driven architectures in microservices use message brokers like Kafka, RabbitMQ, or AWS SNS/SQS to enable asynchronous communication between services."
  },
  automation: {
    title: "Automation & Scripting",
    general: "Automation is a core principle of DevOps that reduces manual effort, increases consistency, and improves efficiency across the software delivery lifecycle.",
    tools: "Automation tools include Ansible, Puppet, Chef, Terraform, Jenkins, GitHub Actions, and custom scripts in languages like Bash, Python, or PowerShell.",
    testing: "Test automation frameworks like Selenium, JUnit, pytest, and Cypress help ensure code quality and catch regressions early in the development process.",
    infrastructure: "Infrastructure automation using tools like Terraform, CloudFormation, or Pulumi enables consistent and repeatable provisioning of resources.",
    release: "Release automation streamlines the deployment process with tools like Spinnaker, ArgoCD, or Jenkins X, implementing strategies like blue-green or canary deployments.",
    compliance: "Compliance automation ensures that systems meet regulatory requirements through automated checks, documentation generation, and audit trails.",
    bestPractices: "Automation best practices include starting small, documenting processes, using version control, implementing proper error handling, and continuously improving automation scripts."
  }
};

export default function AIAssistantPage() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize messages on client-side only to avoid hydration mismatch
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: "Hello! I'm your DevOps AI Assistant. I can help you with CI/CD pipelines, containerization, infrastructure as code, monitoring, and other DevOps-related topics. How can I assist you today?",
        timestamp: new Date(),
      },
    ])
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const generateResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for specific topics
    if (lowercaseInput.includes("ci") || lowercaseInput.includes("cd") || lowercaseInput.includes("pipeline") || lowercaseInput.includes("jenkins") || lowercaseInput.includes("github actions")) {
      const cicd = devopsKnowledge.cicd;
      
      if (lowercaseInput.includes("jenkins")) {
        return `${cicd.jenkins} ${cicd.bestPractices}`;
      } else if (lowercaseInput.includes("github actions")) {
        return `${cicd.githubActions} Would you like to know more about setting up GitHub Actions workflows?`;
      } else if (lowercaseInput.includes("gitlab")) {
        return `${cicd.gitlab} Would you like to know more about GitLab CI/CD configuration?`;
      } else if (lowercaseInput.includes("best practices")) {
        return cicd.bestPractices;
      } else {
        return `${cicd.general} Would you like more specific information about any of these tools or how to set up a pipeline for a particular technology stack?`;
      }
    } 
    
    else if (lowercaseInput.includes("docker") || lowercaseInput.includes("container")) {
      const containerization = devopsKnowledge.docker;
      
      if (lowercaseInput.includes("architecture")) {
        return containerization.architecture;
      } else if (lowercaseInput.includes("command")) {
        return `${containerization.commands} Would you like examples of specific Docker commands?`;
      } else if (lowercaseInput.includes("dockerfile") || lowercaseInput.includes("build")) {
        return `${containerization.dockerfile} Would you like to see an example Dockerfile?`;
      } else if (lowercaseInput.includes("best practices")) {
        return containerization.bestPractices;
      } else if (lowercaseInput.includes("orchestration")) {
        return containerization.orchestration;
      } else if (lowercaseInput.includes("security")) {
        return containerization.security;
      } else if (lowercaseInput.includes("networking")) {
        return containerization.networking;
      } else {
        return `${containerization.general} Would you like to know more about Docker commands, Dockerfile best practices, or container orchestration with Kubernetes?`;
      }
    } 
    
    else if (lowercaseInput.includes("kubernetes") || lowercaseInput.includes("k8s")) {
      const kubernetes = devopsKnowledge.kubernetes;
      
      if (lowercaseInput.includes("architecture")) {
        return kubernetes.architecture;
      } else if (lowercaseInput.includes("resource") || lowercaseInput.includes("pod") || lowercaseInput.includes("deployment") || lowercaseInput.includes("service")) {
        return `${kubernetes.resources} Would you like more details about a specific Kubernetes resource?`;
      } else if (lowercaseInput.includes("helm") || lowercaseInput.includes("chart")) {
        return kubernetes.helm;
      } else if (lowercaseInput.includes("operator")) {
        return kubernetes.operators;
      } else if (lowercaseInput.includes("networking")) {
        return kubernetes.networking;
      } else if (lowercaseInput.includes("storage")) {
        return kubernetes.storage;
      } else if (lowercaseInput.includes("troubleshooting")) {
        return kubernetes.troubleshooting;
      } else {
        return `${kubernetes.general} Would you like to learn about Kubernetes architecture, resources (Pods, Deployments, Services), or how to set up a cluster?`;
      }
    } 
    
    else if (lowercaseInput.includes("terraform") || lowercaseInput.includes("infrastructure as code") || lowercaseInput.includes("iac")) {
      const iac = devopsKnowledge.iac;
      
      if (lowercaseInput.includes("module")) {
        return iac.modules;
      } else if (lowercaseInput.includes("state")) {
        return iac.state;
      } else if (lowercaseInput.includes("pulumi")) {
        return iac.pulumi;
      } else if (lowercaseInput.includes("ansible")) {
        return iac.ansible;
      } else if (lowercaseInput.includes("best practices")) {
        return iac.bestPractices;
      } else if (lowercaseInput.includes("testing")) {
        return iac.testing;
      } else {
        return `${iac.general} Would you like to know more about Terraform modules, state management, or best practices?`;
      }
    } 
    
    else if (lowercaseInput.includes("aws") || lowercaseInput.includes("azure") || lowercaseInput.includes("gcp") || lowercaseInput.includes("cloud")) {
      const cloud = devopsKnowledge.cloud;
      
      if (lowercaseInput.includes("aws")) {
        return cloud.aws;
      } else if (lowercaseInput.includes("azure")) {
        return cloud.azure;
      } else if (lowercaseInput.includes("gcp") || lowercaseInput.includes("google cloud")) {
        return cloud.gcp;
      } else if (lowercaseInput.includes("multi") || lowercaseInput.includes("hybrid")) {
        return cloud.multicloud;
      } else if (lowercaseInput.includes("cost optimization")) {
        return cloud.costOptimization;
      } else if (lowercaseInput.includes("migration")) {
        return cloud.migration;
      } else {
        return `There are several major cloud providers including AWS, Azure, and GCP. Each offers unique services and capabilities. Which cloud platform are you interested in learning more about?`;
      }
    } 
    
    else if (lowercaseInput.includes("monitoring") || lowercaseInput.includes("logging") || lowercaseInput.includes("prometheus") || lowercaseInput.includes("grafana") || lowercaseInput.includes("elk")) {
      const monitoring = devopsKnowledge.monitoring;
      
      if (lowercaseInput.includes("prometheus")) {
        return monitoring.prometheus;
      } else if (lowercaseInput.includes("grafana")) {
        return monitoring.grafana;
      } else if (lowercaseInput.includes("elk") || lowercaseInput.includes("elasticsearch") || lowercaseInput.includes("logstash") || lowercaseInput.includes("kibana")) {
        return monitoring.elk;
      } else if (lowercaseInput.includes("apm")) {
        return monitoring.apm;
      } else if (lowercaseInput.includes("sre")) {
        return monitoring.sre;
      } else if (lowercaseInput.includes("alerting")) {
        return monitoring.alerting;
      } else {
        return `${monitoring.general} Would you like more information about setting up monitoring for a specific environment or implementing a logging strategy?`;
      }
    } 
    
    else if (lowercaseInput.includes("security") || lowercaseInput.includes("devsecops") || lowercaseInput.includes("compliance")) {
      const security = devopsKnowledge.security;
      
      if (lowercaseInput.includes("practice")) {
        return security.practices;
      } else if (lowercaseInput.includes("tool")) {
        return security.tools;
      } else if (lowercaseInput.includes("compliance")) {
        return security.compliance;
      } else if (lowercaseInput.includes("sast")) {
        return security.sast;
      } else if (lowercaseInput.includes("dast")) {
        return security.dast;
      } else if (lowercaseInput.includes("secrets management")) {
        return security.secretsManagement;
      } else if (lowercaseInput.includes("container security")) {
        return security.containerSecurity;
      } else {
        return security.general;
      }
    } 
    
    else if (lowercaseInput.includes("gitops")) {
      const gitops = devopsKnowledge.gitops;
      
      if (lowercaseInput.includes("tool") || lowercaseInput.includes("argocd") || lowercaseInput.includes("flux")) {
        return gitops.tools;
      } else if (lowercaseInput.includes("benefit")) {
        return gitops.benefits;
      } else if (lowercaseInput.includes("practice")) {
        return gitops.practices;
      } else if (lowercaseInput.includes("argocd")) {
        return gitops.argocd;
      } else if (lowercaseInput.includes("fluxcd")) {
        return gitops.fluxcd;
      } else if (lowercaseInput.includes("implementation")) {
        return gitops.implementation;
      } else {
        return gitops.general;
      }
    } 
    
    else if (lowercaseInput.includes("microservice")) {
      const microservices = devopsKnowledge.microservices;
      
      if (lowercaseInput.includes("pattern")) {
        return microservices.patterns;
      } else if (lowercaseInput.includes("challenge")) {
        return microservices.challenges;
      } else if (lowercaseInput.includes("tool")) {
        return microservices.tools;
      } else if (lowercaseInput.includes("service discovery")) {
        return microservices.serviceDiscovery;
      } else if (lowercaseInput.includes("api gateway")) {
        return microservices.apiGateway;
      } else if (lowercaseInput.includes("service mesh")) {
        return microservices.serviceMesh;
      } else if (lowercaseInput.includes("event driven")) {
        return microservices.eventDriven;
      } else {
        return microservices.general;
      }
    } 
    
    else if (lowercaseInput.includes("automation")) {
      const automation = devopsKnowledge.automation;
      
      if (lowercaseInput.includes("tool")) {
        return automation.tools;
      } else if (lowercaseInput.includes("testing")) {
        return automation.testing;
      } else if (lowercaseInput.includes("infrastructure")) {
        return automation.infrastructure;
      } else if (lowercaseInput.includes("release")) {
        return automation.release;
      } else if (lowercaseInput.includes("compliance")) {
        return automation.compliance;
      } else if (lowercaseInput.includes("best practices")) {
        return automation.bestPractices;
      } else {
        return automation.general;
      }
    } 
    
    // General DevOps question
    else {
      return "That's a great DevOps question! DevOps practices focus on collaboration between development and operations teams to deliver high-quality software faster. This includes automation, continuous integration/delivery, infrastructure as code, monitoring, and a culture of shared responsibility. Could you provide more details about your specific use case so I can give you more targeted advice?";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Check if the question is DevOps related
    const devopsKeywords = [
      "ci", "cd", "pipeline", "jenkins", "github actions", "gitlab", "docker", "kubernetes", "k8s",
      "container", "terraform", "ansible", "chef", "puppet", "infrastructure", "cloud", "aws", "azure",
      "gcp", "monitoring", "logging", "prometheus", "grafana", "elk", "deployment", "automation",
      "devops", "sre", "site reliability", "microservices", "orchestration", "configuration management",
      "gitops", "security", "devsecops", "compliance", "observability", "helm", "argocd", "flux"
    ]
    
    const isDevOpsRelated = devopsKeywords.some(keyword => 
      input.toLowerCase().includes(keyword.toLowerCase())
    )
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      let response = ""
      
      if (isDevOpsRelated) {
        response = generateResponse(input);
      } else {
        // Not DevOps related
        response = "I'm specialized in DevOps topics like CI/CD pipelines, containerization, infrastructure as code, cloud platforms, monitoring, and automation. Could you please ask a question related to these areas? I'd be happy to help with your DevOps challenges!";
      }
      
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello! I'm your DevOps AI Assistant. I can help you with CI/CD pipelines, containerization, infrastructure as code, monitoring, and other DevOps-related topics. How can I assist you today?",
        timestamp: new Date(),
      },
    ])
    toast({
      title: "Chat cleared",
      description: "All previous messages have been removed.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">DevOps AI Assistant</h1>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 md:mt-0"
              onClick={handleClearChat}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Chat
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="h-[calc(100vh-12rem)]">
                <CardHeader>
                  <CardTitle>Chat with DevOps AI</CardTitle>
                  <CardDescription>
                    Ask questions about CI/CD, containerization, infrastructure as code, and more.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-[calc(100%-8rem)]">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex items-start gap-3 max-w-[80%] ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          } p-3 rounded-lg`}
                        >
                          {message.role === "assistant" && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                              <AvatarFallback>
                                <Bot className="h-5 w-5" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="space-y-1">
                            <div className="text-sm">
                              {message.content.split("\n").map((text, i) => (
                                <p key={i} className="mb-1">
                                  {text}
                                </p>
                              ))}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                          {message.role === "user" && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                              <AvatarFallback>
                                <User className="h-5 w-5" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-3 max-w-[80%] bg-muted p-3 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                            <AvatarFallback>
                              <Bot className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <div className="flex space-x-2">
                              <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                              <div className="h-2 w-2 bg-primary rounded-full animate-bounce delay-75"></div>
                              <div className="h-2 w-2 bg-primary rounded-full animate-bounce delay-150"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Ask a DevOps question..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>DevOps Topics</CardTitle>
                  <CardDescription>Popular topics I can help with</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span>CI/CD Pipelines</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span>Docker & Containerization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span>Kubernetes Orchestration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span>Infrastructure as Code</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span>Cloud Platforms (AWS, Azure, GCP)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span>Monitoring & Logging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span>DevSecOps & Security</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span>GitOps Workflows</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span>Microservices Architecture</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 