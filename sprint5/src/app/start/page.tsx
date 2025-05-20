"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function StartPage() {
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      router.push("/assistant")
    }
  }, [router])

  const handleStart = () => {
    router.push("/register")
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-gray-100 rounded-lg shadow-md p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-4">
          Bem-vindo ao Assistente de Voz
        </h1>
        <p className="text-gray-800 text-base mb-6">
          Este sistema foi criado para melhorar a acessibilidade de usuários com deficiência visual.
        </p>

        <ol className="text-left text-gray-600 text-sm list-decimal pl-5 space-y-2 mb-6">
          <li>Crie sua conta com nome, e-mail e senha.</li>
          <li>Marque se você possui alguma deficiência.</li>
          <li>Acesse o assistente para usar comandos de voz.</li>
          <li>Use o menu para navegar entre as seções.</li>
        </ol>

        <button
          onClick={handleStart}
          className="bg-red-700 hover:bg-red-800 text-white font-medium px-6 py-2 rounded-full transition-colors duration-200"
        >
          Começar
        </button>
      </div>
    </main>
  )
}
