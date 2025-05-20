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
      <div
        className="fixed inset-0 bg-black/20 z-20"
        onClick={onClose}
      />

      <div className="fixed top-0 left-0 h-full w-[220px] bg-gray-200 z-30 flex flex-col animate-slideIn">

        <div className="p-6 flex items-center">
          <span className="text-lg font-medium">Menu</span>
        </div>


        <div className="p-6 flex flex-col gap-4">
          <div className="text-sm">
            <p className="font-medium">Bem-vindo, {user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <button
            onClick={navigateToTeam}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full w-full text-center font-medium hover:bg-gray-400"
          >
            Equipe
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full w-full text-center hover:bg-gray-400"
          >
            Voltar
          </button>

          <button
            onClick={onLogout}
            className="bg-red-700 text-white px-6 py-2 rounded-full w-full text-center hover:bg-red-800"
          >
            Sair
          </button>
        </div>
      </div>
    </>
  )
}
