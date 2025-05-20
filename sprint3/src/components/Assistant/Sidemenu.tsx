"use client"

import { useRouter } from "next/navigation"

type User = {
  name: string
  email: string
  hasDisability: boolean
}

type SideMenuProps = {
  user: User
  onClose: () => void
  onLogout: () => void
}

export default function SideMenu({ user, onClose, onLogout }: SideMenuProps) {
  const router = useRouter()

  const navigateToTeam = () => {
    router.push("/team")
    onClose()
  }

  return (
    <>
      
      <div className="menu-backdrop" onClick={onClose} />

      
      <div className="side-menu">
        <div className="menu-header">
          <span>Menu</span>
        </div>

        <div className="menu-content">
          <div className="user-info">
            <p className="user-name">Bem-vindo, {user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>

          <button className="menu-button-item" onClick={navigateToTeam}>
            Equipe
          </button>

          <button className="back-button" onClick={onClose}>
            Voltar
          </button>

          <button className="logout-button" onClick={onLogout}>
            Sair
          </button>
        </div>
      </div>
    </>
  )
}