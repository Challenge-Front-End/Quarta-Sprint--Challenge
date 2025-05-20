"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import TopNav from "./TopNav"
import SideMenu from "./Sidemenu"
import MicrophoneSection from "./microfone"

type User = {
  name: string
  email: string
  hasDisability: boolean
}

export default function VoiceAssistant() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      } else {
        router.push("/register")
      }
    }
  }, [router])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/register")
  }

  if (!user) return null

  return (
    <div className="flex flex-col h-screen bg-gray-100 relative overflow-hidden">
      {isMenuOpen && (
        <SideMenu user={user} onClose={toggleMenu} onLogout={handleLogout} />
      )}

      <TopNav user={user} isMuted={isMuted} onMenuClick={toggleMenu} onMuteClick={toggleMute} />

      <div className="flex-1 flex items-center justify-center">
        <MicrophoneSection />
      </div>

      <footer className="p-4 text-center text-sm text-gray-500">
        Copyright © 2024 - JEF
      </footer>
    </div>
  )
}
