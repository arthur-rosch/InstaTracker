"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What data can I see from an Instagram profile?",
    answer:
      "You can see public information such as the number of followers, following, posts, bio, most used hashtags, recent posts, posting frequency, and engagement analysis. All data is public and obtained ethically.",
  },
  {
    question: "Is it safe to use ClarityIG?",
    answer:
      "Yes, it is completely safe. We do not store your personal information, do not ask for Instagram login, and only access public data. Our platform uses SSL encryption and follows security best practices.",
  },
  {
    question: "Do I need to log in or provide a password?",
    answer:
      "No! One of the main advantages of ClarityIG is that you do not need to log in or provide your Instagram credentials. Just type the username you want to search.",
  },
  {
    question: "Can I search for any profile?",
    answer:
      "You can search for any public Instagram profile. Private profiles have limited information available, but we still provide basic data such as profile picture, bio, and number of followers.",
  },
  {
    question: "Do you store the searched data?",
    answer:
      "We do not store personal data from the searched profiles. We only keep anonymous usage statistics to improve our service. Your privacy and the privacy of the searched profiles are our priority.",
  },
  {
    question: "Is the service free?",
    answer:
      "We offer a free plan with limited searches per day. For professional and unlimited use, we have premium plans with advanced features such as detailed reports, search history, and deeper analysis.",
  },
  {
    question: "How do you obtain the data?",
    answer:
      "We use public APIs and ethical web scraping techniques to collect only public information available on Instagram. We respect the platform's terms of use and data protection laws.",
  },
  {
    question: "Can I use it for commercial purposes?",
    answer:
      "Yes! Many marketing professionals, agencies, and companies use ClarityIG to research influencers, analyze competitors, and verify partnerships. We have specific plans for commercial use.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="instagram-gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Clear your doubts about ClarityIG and how to use our tool
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300"
            >
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <h3 className="font-semibold text-lg pr-4 text-white">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
