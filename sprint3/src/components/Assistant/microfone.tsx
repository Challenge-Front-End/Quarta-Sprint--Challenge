import { Mic } from "lucide-react"

export default function MicrophoneSection() {
  return (
    <div className="mic-container">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <div
          key={angle}
          className="mic-ray"
          style={{
            width: angle % 90 === 0 ? "40px" : "30px",
            height: angle % 90 === 0 ? "10px" : "10px",
            transform: `rotate(${angle}deg) translateX(${angle % 90 === 0 ? 50 : 45}px)`,
            transformOrigin: "center left",
            left: "50%",
            top: "50%",
            marginTop: "-5px",
          }}
        />
      ))}

      
      <button className="mic-button" aria-label="Microphone">
        <Mic className="icon" />
      </button>
    </div>
  )
}