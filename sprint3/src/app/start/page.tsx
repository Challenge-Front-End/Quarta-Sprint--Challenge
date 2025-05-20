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
    <main className="start-container">
      <div className="start-box">
        <h1>Bem-vindo ao Assistente de Voz</h1>
        <p>Este sistema foi criado para melhorar a acessibilidade de usuários com deficiência visual.</p>
        <ol className="usage-steps">
          <li>1. Crie sua conta com nome, e-mail e senha.</li>
          <li>2. Marque se você possui alguma deficiência.</li>
          <li>3. Acesse o assistente para usar comandos de voz.</li>
          <li>4. Use o menu para navegar entre as seções.</li>
        </ol>
        <button className="start-button" onClick={handleStart}>
          Começar
        </button>
      </div>
    </main>
  )
}
