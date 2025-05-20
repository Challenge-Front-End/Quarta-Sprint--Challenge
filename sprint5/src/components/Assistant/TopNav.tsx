"use client"

import { Menu, Volume2, VolumeX } from "lucide-react"

type User = {
  name: string
  email: string
  hasDisability: boolean
}

type TopNavProps = {
  user: User
  isMuted: boolean
  onMenuClick: () => void
  onMuteClick: () => void
}

export default function TopNav({ user, isMuted, onMenuClick, onMuteClick }: TopNavProps) {
  return (
    <div className="flex items-center p-4 border-b border-gray-300 relative z-10">
      {/* Menu button */}
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="bg-gray-300 p-3 rounded-md"
      >
        <Menu className="w-6 h-6 text-gray-800" />
      </button>

      {/* Avatar + Audio Viz */}
      <div className="flex items-center ml-4">
        <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-white"></div>
        </div>

        {/* Audio bars */}
        <div className="ml-2 bg-gray-300 h-10 w-[400px] max-w-[calc(100vw-120px)] rounded-full flex items-center px-4 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="bg-red-700 w-1 mx-[3px] rounded-sm"
              style={{ height: `${Math.random() * 16 + 4}px` }}
            />
          ))}
        </div>
      </div>

      {/* Mute button */}
      <button
        onClick={onMuteClick}
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="ml-auto p-2 rounded-full bg-gray-300"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-red-700" />
        ) : (
          <Volume2 className="w-6 h-6 text-gray-800" />
        )}
      </button>
    </div>
  )
}
