"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import TopNav from "./TopNav"
import SideMenu from "./Sidemenu"
import { Mic } from "lucide-react"
import { speakText, stopSpeaking } from "../../lib/speak"
import Loading from "@/app/loading"
import { askOpenRouter } from "@/lib/askOpenRouter"

type User = {
  name: string
  email: string
  hasDisability: boolean
}

const SpeechRecognition =
  typeof window !== "undefined"
    ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
    : null

const recognition = SpeechRecognition ? new SpeechRecognition() : null

export default function VoiceAssistant() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleMute = () => setIsMuted(!isMuted)

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/register")
  }

  const processInput = async (text: string) => {
    if (!text.trim()) return
    setLoading(true)

    try {
      const reply = await askOpenRouter(text)
      setResponse(reply)
      if (!isMuted) {
        speakText(reply, () => setIsSpeaking(true), () => setIsSpeaking(false))
      }
    } catch (err) {
      console.error(err)
      setResponse("Erro ao consultar a IA.")
    } finally {
      setLoading(false)
    }
  }

  const handleVoiceInput = () => {
    if (!recognition) {
      alert("Reconhecimento de voz não suportado neste navegador.")
      return
    }

    recognition.lang = "pt-BR"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Erro no reconhecimento:", event)
      alert("Erro ao acessar o microfone.")
      setIsListening(false)
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      setMessage(transcript)
      processInput(transcript)
    }

    recognition.start()
  }

  const handleSend = async () => {
    if (!message.trim()) return
    await processInput(message)
  }

  if (!user) return <Loading />

  return (
    <div className="flex flex-col h-screen bg-gray-100 relative overflow-hidden">
      {isMenuOpen && (
        <SideMenu user={user} onClose={toggleMenu} onLogout={handleLogout} />
      )}

      <TopNav
        user={user}
        isMuted={isMuted}
        onMenuClick={toggleMenu}
        onMuteClick={toggleMute}
      />

      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
        <button
          onClick={handleVoiceInput}
          className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${
            isListening ? "border-red-600" : "border-gray-300"
          } bg-white shadow-md transition-colors duration-300`}
          aria-label="Microfone"
        >
          <Mic
            className={`w-12 h-12 ${
              isListening ? "text-red-600" : "text-gray-800"
            }`}
          />
        </button>

        <div className="w-full max-w-xl">
          <input
            type="text"
            placeholder="Fale ou digite algo..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-700"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="mt-2 w-full bg-red-700 text-white font-semibold py-2 rounded-md hover:bg-red-800"
            disabled={loading}
          >
            {loading ? "Consultando..." : "Enviar para a IA"}
          </button>
        </div>

        {response && (
          <div className="mt-2 text-center text-gray-800 bg-white p-4 rounded-md shadow-md max-w-xl w-full max-h-96 overflow-y-auto">
            <p className="font-semibold mb-2">Resposta da IA:</p>
            <p className="text-left whitespace-pre-line">{response}</p>

            {isSpeaking && (
              <button
                onClick={() => {
                  stopSpeaking()
                  setIsSpeaking(false)
                }}
                className="mt-2 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded shadow"
              >
                Parar voz
              </button>
            )}
          </div>
        )}
      </div>

      <footer className="p-4 text-center text-sm text-gray-500">
        Copyright © 2024 - JEF
      </footer>
    </div>
  )
}
