import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Users, TrendingUp, Eye, Lock } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Fast and easy",
    description: "Results in seconds, no complications or complex configurations",
  },
  {
    icon: Lock,
    title: "No login required",
    description: "Use our tool without creating an account or providing your credentials",
  },
  {
    icon: Eye,
    title: "Public data and insights",
    description: "Access only public information with intelligent analysis",
  },
  {
    icon: Shield,
    title: "Security and privacy",
    description: "Identify suspicious profiles and protect yourself from online scams",
  },
  {
    icon: Users,
    title: "Influencer research",
    description: "Find and analyze influencers for partnerships and collaborations",
  },
  {
    icon: TrendingUp,
    title: "Competitor analysis",
    description: "Monitor competitors and identify market opportunities",
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why choose <span className="instagram-gradient-text">ClarityIG?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A complete tool for Instagram profile verification and analysis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-gray-700 bg-gray-800/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 instagram-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
