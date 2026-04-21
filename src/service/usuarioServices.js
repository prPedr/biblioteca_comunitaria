import usuarioRepositories from "../repositories/usuarioRepositories.js"

const criarUsuarioServices = async (novoUsuario) => {
  const buscarEmail = await usuarioRepositories.buscarUsuarioPorEmail(novoUsuario.email)
  if (buscarEmail) {
    throw new Error("Email já cadastrado.")
  }

  const buscarNome = await usuarioRepositories.buscarUsuarioPorNome(novoUsuario.nomeUsuario)
  if (buscarNome) {
    throw new Error("Nome de usuario já cadastrado.")
  }
  
  const usuario = await usuarioRepositories.criarUsuarioRepositories(novoUsuario)
  return usuario
}

export default {
  criarUsuarioServices
}
