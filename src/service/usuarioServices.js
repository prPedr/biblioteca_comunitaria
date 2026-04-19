import usuarioRepositories from "../repositories/usuarioRepositories.js"

const criarUsuarioServices = async (novoUsuario) => {
  const usuario = await usuarioRepositories.criarUsuarioRepositories(novoUsuario)
  return usuario
}

export default {
  criarUsuarioServices
}
