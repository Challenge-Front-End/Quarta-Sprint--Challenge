let currentUtterance: SpeechSynthesisUtterance | null = null

export function speakText(
  text: string,
  onStart?: () => void,
  onEnd?: () => void
) {
  if (typeof window === "undefined" || !window.speechSynthesis) return

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "pt-BR"
  utterance.rate = 1
  utterance.pitch = 1
  utterance.volume = 1

  if (onStart) utterance.onstart = onStart
  if (onEnd) utterance.onend = onEnd

  currentUtterance = utterance
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
}
