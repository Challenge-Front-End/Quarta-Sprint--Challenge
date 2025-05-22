"use client"

import { Menu } from "lucide-react"

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

export default function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <div className="flex items-center p-4 border-b border-gray-300 relative z-10">
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="bg-gray-300 p-3 rounded-md"
      >
        <Menu className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  )
}
