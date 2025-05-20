"use client"

import { Mic } from "lucide-react"

export default function MicrophoneSection() {
  return (
    <div className="relative">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <div
          key={angle}
          className="absolute bg-red-700 opacity-70 rounded-sm"
          style={{
            width: angle % 90 === 0 ? "40px" : "30px",
            height: "10px",
            transform: `rotate(${angle}deg) translateX(${angle % 90 === 0 ? 50 : 45}px)`,
            transformOrigin: "center left",
            left: "50%",
            top: "50%",
            marginTop: "-5px",
          }}
        />
      ))}

      <button
        className="w-24 h-24 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center relative z-10"
        aria-label="Microphone"
      >
        <Mic className="w-12 h-12 text-gray-800" />
      </button>
    </div>
  )
}
