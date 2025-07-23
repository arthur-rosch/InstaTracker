import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, CheckCircle } from "lucide-react"

export function ProfileMockup() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-20"></div>
      <div className="relative space-y-4">
        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0 space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 ring-4 ring-gradient-to-r from-purple-400 to-pink-400">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">@johndoe</h3>
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-gray-600">João Silva</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span>
                    <strong>1.2M</strong> seguidores
                  </span>
                  <span>
                    <strong>847</strong> seguindo
                  </span>
                  <span>
                    <strong>324</strong> posts
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                🎯 Marketing Digital | 📱 Tech Enthusiast
                <br />🌟 Ajudando empresas a crescer online
                <br />📧 contato@johndoe.com
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  #marketing
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  #tech
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  #business
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <h4 className="font-semibold mb-3 text-sm text-gray-700">Posts Recentes</h4>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg relative overflow-hidden"
                >
                  <img
                    src={`/placeholder.svg?height=100&width=100&query=instagram post ${i}`}
                    alt={`Post ${i}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 flex items-center space-x-1 text-white text-xs">
                    <Heart className="w-3 h-3" />
                    <span>1.2k</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
