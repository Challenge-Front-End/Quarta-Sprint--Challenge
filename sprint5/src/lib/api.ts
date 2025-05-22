const BASE_URL = "https://quarkussprint4java-production.up.railway.app";

export async function buscarUsuario(id: number) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar usuário");
  return res.json();
}
