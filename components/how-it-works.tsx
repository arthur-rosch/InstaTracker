import { Card, CardContent } from "@/components/ui/card"
import { Search, BarChart3, FileText, Share2 } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Enter username",
    description: "Enter the Instagram username you want to verify",
  },
  {
    icon: BarChart3,
    title: "Automatic analysis",
    description: "Our system searches and analyzes all available public data",
  },
  {
    icon: FileText,
    title: "Detailed report",
    description: "Receive a complete report with insights and relevant information",
  },
  {
    icon: Share2,
    title: "Share or save",
    description: "Download the report or share the results easily",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How ClarityIG works</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            In just a few clicks, get detailed information about any public Instagram profile
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-xl transition-all duration-300 border-gray-700 bg-gray-800/50 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 instagram-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 instagram-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
