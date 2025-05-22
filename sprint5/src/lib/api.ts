const BASE_URL = "https://quarkussprint4java-production.up.railway.app";

export async function buscarUsuario(id: number) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar usuário");
  return res.json();
}
export async function salvarInteracao({
  usuarioId,
  mensagemUsuario,
  respostaIA
}: {
  usuarioId: number;
  mensagemUsuario: string;
  respostaIA: string;
}) {
  const res = await fetch(`${BASE_URL}/interacoes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuarioId,
      mensagemUsuario,
      respostaIA,
      dataHora: new Date().toISOString()
    })
  });

  if (!res.ok) throw new Error("Erro ao salvar interação");
  return res.json();
}

