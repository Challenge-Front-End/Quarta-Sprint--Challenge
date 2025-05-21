export function speakText(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "pt-BR"
  utterance.rate = 1
  utterance.pitch = 1
  utterance.volume = 1

  window.speechSynthesis.speak(utterance)
}
