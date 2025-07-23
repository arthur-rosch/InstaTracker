import Link from "next/link"
import { Instagram, Mail, MessageCircle, Search } from "lucide-react"

export function Footer() {
  return (
    <footer id="contato" className="bg-gray-900 text-white py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full instagram-gradient flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold instagram-gradient-text">ClarityIG</span>
            </Link>
            <p className="text-gray-400">The most complete tool for Instagram profile verification and analysis.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#como-funciona" className="hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#beneficios" className="hover:text-white transition-colors">
                  Benefits
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  LGPD
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ClarityIG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
