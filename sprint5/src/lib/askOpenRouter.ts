export async function askOpenRouter(prompt: string): Promise<string> {
  console.log("Prompt recebido:", prompt);
  if (!prompt || prompt.trim() === "") {
    return "Desculpe, não entendi o que você disse.";
  }

  console.log("Prompt enviado:", prompt);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer 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`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content: "Você é uma assistente de transporte público de São Paulo no ano de 2025. Responda com base no seguinte: A estação Palmeiras-Barra Funda é uma estação que atende as linhas Vermelha do metrô e linhas da CPTM. Está localizada no bairro da Barra Funda.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await response.json();
  console.log("Resposta bruta da IA:", JSON.stringify(data, null, 2));

  

  console.log("Resposta da IA:", data);

  return data.choices?.[0]?.message?.content || "Desculpe, não consegui entender.";
}
