"use client"

interface PeakActivityTimesProps {
  username: string
}

const mockPeakTimes = [
  { percentage: 29, label: "Morning (6am - 12pm)" },
  { percentage: 24, label: "Afternoon (12pm - 6pm)" },
  { percentage: 34, label: "Evening (6pm - 12am)" },
  { percentage: 29, label: "Night (12am - 6am)" }
]

export function PeakActivityTimes({ username }: PeakActivityTimesProps) {
  return (
    <section className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Peak activity times</h3>
        <p className="text-gray-300">When your profile is most visited</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {mockPeakTimes.map((time, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-sm">{time.percentage}%</span>
            </div>
            <p className="text-white text-sm font-medium">{time.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}