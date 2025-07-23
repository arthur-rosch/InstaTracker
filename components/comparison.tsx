import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

const features = [
  "Search speed",
  "Ease of use",
  "Detailed data",
  "No login required",
  "Hashtag analysis",
  "Post history",
  "Fake profile detection",
  "Customer support",
]

export function Comparison() {
  return (
    <section className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="instagram-gradient-text">ClarityIG</span> vs Manual Search
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See why our tool is more efficient than doing manual searches
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-gray-300">Manual Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-500 shadow-xl bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 instagram-gradient"></div>
              <CardHeader className="text-center pb-4">
                <CardTitle className="instagram-gradient-text">ClarityIG</CardTitle>
                <div className="inline-block instagram-gradient text-white px-3 py-1 rounded-full text-sm font-semibold">
                  RECOMENDADO
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-medium text-white">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-gray-300">Other Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {index < 4 ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
