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
    <div className="top-nav">
      <button className="menu-button" onClick={onMenuClick} aria-label="Open menu">
        <Menu className="icon" />
      </button>

      <div className="user-profile-section">
        <div className="user-avatar">
          <div className="user-avatar-inner"></div>
        </div>

        <div className="audio-visualization">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="audio-bar"
              style={{
                height: `${Math.random() * 16 + 4}px`,
              }}
            />
          ))}
        </div>
      </div>

      
      <button className="mute-button" onClick={onMuteClick} aria-label={isMuted ? "Unmute" : "Mute"}>
        {isMuted ? <VolumeX className="icon muted" /> : <Volume2 className="icon" />}
      </button>
    </div>
  )
}
