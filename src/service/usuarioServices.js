import usuarioRepositories from "../repositories/usuarioRepositories.js"
import bcrypt from "bcrypt"

const criarUsuarioServices = async (novoUsuario) => {
  const buscarEmail = await usuarioRepositories.buscarUsuarioPorEmailRepositories(novoUsuario.email)
  if (buscarEmail) {
    throw new Error("Email já cadastrado.")
  }

  const buscarNome = await usuarioRepositories.buscarUsuarioPorNomeRepositories(novoUsuario.nomeUsuario)
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

const buscarUsuarioPorIdServices = async (id) => {
  const buscarId = await usuarioRepositories.buscarUsuarioPorIdRepositories(id)
  if (!buscarId) {
    throw new Error("Nao foi possivel encontrar o ID de usuario.")
  }

  return buscarId
}

const buscarUsuarioPorNomeServices = async (nomeUsuario) => {
  const buscarNome = await usuarioRepositories.buscarUsuarioPorNomeRepositories(nomeUsuario)
  if (!buscarNome) {
    throw new Error("Nao foi posssivel encontrar o nome de usuario")
  }

  return buscarNome
}

const buscarUsuarioPorEmailServices = async (email) => {
  const buscarEmail = await usuarioRepositories.buscarUsuarioPorEmailRepositories(email)
  if (!buscarEmail) {
    throw new Error("Nao possivel encontrar o email de usuario")
  }

  return buscarEmail
}

const listarTodosUsuariosServices = async () => {
  const listarTodosUsuarios = await usuarioRepositories.listarTodosUsuariosRepositories()
  return listarTodosUsuarios
}

export default {
  criarUsuarioServices,
  buscarUsuarioPorIdServices,
  buscarUsuarioPorNomeServices,
  buscarUsuarioPorEmailServices,
  listarTodosUsuariosServices
}
