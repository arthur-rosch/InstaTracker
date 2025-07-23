import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl instagram-gradient flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-2xl font-bold text-white">InstaCheck</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
