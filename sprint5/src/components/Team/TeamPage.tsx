"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaLinkedin, FaGithub, FaArrowLeft } from "react-icons/fa"
import Image from "next/image"

import joaoImage from "../../img/joao.jpg"
import felipeImage from "../../img/felipe.png"
import enzoImage from "../../img/enzo.png"

type User = {
  name: string
  email: string
  hasDisability: boolean
} | null

type TeamMember = {
  name: string
  image: any
  linkedin: string
  github: string
}

export default function TeamPage() {
  const router = useRouter()
  const [user, setUser] = useState<User>(null)

  const teamMembers: TeamMember[] = [
    {
      name: "João Gabriel Fuchs Greco",
      image: joaoImage,
      linkedin: "https://www.linkedin.com/in/jo%C3%A3o-gabriel-fuchs-grecco-604ba4326/",
      github: "https://github.com/joaoGFG",
    },
    {
      name: "Felipe Anselmo Soares Costa",
      image: felipeImage,
      linkedin: "https://www.linkedin.com/in/felipe-anselmo-97137431a/",
      github: "https://github.com/Felipeanselmosc",
    },
    {
      name: "Enzo Yukio Ogadamart",
      image: enzoImage,
      linkedin: "https://www.linkedin.com/in/yukio-off-b592372b6/",
      github: "https://github.com/YukioOff",
    },
  ]

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

  const handleBack = () => {
    router.push("/assistant")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 bg-red-700 text-white font-medium px-6 py-2 rounded-full mb-8 hover:bg-red-800"
      >
        <FaArrowLeft />
        Voltar para Assistente
      </button>

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold text-red-700 text-center mb-2">EQUIPE</h1>
        <h2 className="text-xl text-gray-500 text-center mb-10">1TDSPB</h2>

        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center max-w-xs text-center">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={150}
                height={150}
                className="w-[150px] h-[150px] object-cover rounded-full border-4 border-red-700 mb-4"
              />
              <h3 className="text-lg font-semibold text-black mb-2">{member.name}</h3>
              <div className="flex gap-4 text-2xl">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-700"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-700"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
