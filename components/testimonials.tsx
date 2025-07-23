import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Jane Smith",
    role: "Marketing Manager",
    avatar: "JS",
    rating: 5,
    text: "I managed to avoid a scam with ClarityIG! The tool showed that the profile was fake in seconds.",
  },
  {
    name: "David Lee",
    role: "Influencer",
    avatar: "DL",
    rating: 5,
    text: "I use it to analyze my competitors and find collaboration opportunities. Very useful!",
  },
  {
    name: "Emily Brown",
    role: "Entrepreneur",
    avatar: "EB",
    rating: 5,
    text: "Perfect for verifying influencers before closing partnerships. Saved time and money!",
  },
  {
    name: "Michael Davis",
    role: "Social Media Manager",
    avatar: "MD",
    rating: 5,
    text: "Simple interface and accurate results. I recommend it to any marketing professional.",
  },
  {
    name: "Sophia Wilson",
    role: "Consultant",
    avatar: "SW",
    rating: 5,
    text: "Excellent for researching leads and better understanding my clients' target audience.",
  },
  {
    name: "Daniel Garcia",
    role: "Entrepreneur",
    avatar: "DG",
    rating: 5,
    text: "An indispensable tool for anyone working with digital marketing. Highly recommended!",
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What our users are <span className="instagram-gradient-text">saying</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Thousands of people already trust ClarityIG to verify Instagram profiles
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border-gray-700 bg-gray-800/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&query=${testimonial.name}`} />
                    <AvatarFallback className="instagram-gradient text-white">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <img
              src="/placeholder.svg?height=40&width=120"
              alt="Company 1"
              className="h-8 filter brightness-0 invert"
            />
            <img
              src="/placeholder.svg?height=40&width=120"
              alt="Company 2"
              className="h-8 filter brightness-0 invert"
            />
            <img
              src="/placeholder.svg?height=40&width=120"
              alt="Company 3"
              className="h-8 filter brightness-0 invert"
            />
            <img
              src="/placeholder.svg?height=40&width=120"
              alt="Company 4"
              className="h-8 filter brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
