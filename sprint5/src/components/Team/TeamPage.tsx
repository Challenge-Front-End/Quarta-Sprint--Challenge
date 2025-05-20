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

  if (!user) {
    return null 
  }

  return (
    <div className="team-container">
      <button className="back-button-team" onClick={handleBack}>
        <FaArrowLeft /> Voltar para Assistente
      </button>

      <div className="team-content">
        <h1>EQUIPE</h1>
        <h2>1TDSPB</h2>

        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              width={150}
              height={150}
              className="team-member-image"
            />
            <h3>{member.name}</h3>
            <div className="social-icons">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

