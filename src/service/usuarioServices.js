import usuarioRepositories from "../repositories/usuarioRepositories.js"
import bcrypt from "bcrypt"

const criarUsuarioServices = async (novoUsuario) => {
  const buscarEmail = await usuarioRepositories.buscarUsuarioPorEmail(novoUsuario.email)
  if (buscarEmail) {
    throw new Error("Email já cadastrado.")
  }

  const buscarNome = await usuarioRepositories.buscarUsuarioPorNome(novoUsuario.nomeUsuario)
  if (buscarNome) {
    throw new Error("Nome de usuario já cadastrado.")
  }

  const senhaHash = await bcrypt.hash(novoUsuario.senha, 10)
  const usuario = await usuarioRepositories.criarUsuarioRepositories({
    ...novoUsuario,
    senha : senhaHash,
  })

  if (!usuario) {
    throw new Error("Erro ao criar usuario.")
  }

  return usuario
}

export default {
  criarUsuarioServices
}
