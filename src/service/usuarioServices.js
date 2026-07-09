import crypto from "node:crypto"
import util from "node:util"

import usuarioRepositories from "../repositories/usuarioRepositories.js"

const scrypt = util.promisify(crypto.scrypt)

const criarUsuarioServices = async (novoUsuario) => {
  const buscarUsuarioNome = await usuarioRepositories.buscarUsuarioNomeRepositories(novoUsuario.nomeUsuario)
  if (buscarUsuarioNome) {
    throw new Error("Nome de usuario já cadastrado.")
  }

  const buscarUsuarioEmail = await usuarioRepositories.buscarUsuarioEmailRepositories(novoUsuario.email)
  if (buscarUsuarioEmail) {
    throw new Error("E-mail já cadastrado.")
  }

  const salto = crypto.randomBytes(16).toString("hex")
  const buffer = await scrypt(novoUsuario.senha, salto, 64)
  const senhaHash = `${buffer.toString("hex")}.${salto}`

  const criarUsuario = await usuarioRepositories.criarUsuarioRepositories({
    ...novoUsuario,
    senha : senhaHash,
  })

  if (!criarUsuario) {
    throw new Error("Falha ao criar o usuario.")
  }

  return criarUsuario
}

const listarTodosUsuariosServices = async () => {
  const listarTodosUsuarios = await usuarioRepositories.listarTodosUsuariosRepositories()
  return listarTodosUsuarios
}

const listarUsuarioIdServices = async (id) => {
  const listarUsuarioId = await usuarioRepositories.buscarUsuarioIdRespositories(id)

  if (!listarUsuarioId) {
    throw new Error("ID de usuario nao encontrado.")
  }

  return listarUsuarioId
}

const listarUsuarioNomeServices = async (nomeUsuario) => {
  const listarUsuarioNome = await usuarioRepositories.buscarUsuarioNomeRepositories(nomeUsuario)

  if (!listarUsuarioNome) {
    throw new Error("Nome de usuario nao encontrado.")
  }

  return listarUsuarioNome
}

const listarUsuarioEmailServices = async (email) => {
  const listarUsuarioEmail = await usuarioRepositories.buscarUsuarioEmailRepositories(email)

  if (!listarUsuarioEmail) {
    throw new Error("Email de usuario nao encontrado.")
  }

  return listarUsuarioEmail
}

const atualizarUsuarioIdServices = async (novoUsuario, usuarioId) => {
  const usuarioExiste = await usuarioRepositories.buscarUsuarioIdRespositories(usuarioId)

  if (!usuarioExiste) {
    throw new Error("Usuario nao encontrado.")
  }

  if (novoUsuario.senha) {
    const salto = crypto.randomBytes(16).toString("hex")
    const buffer = await scrypt(novoUsuario.senha, salto, 64)
    novoUsuario.senha = `${buffer.toString('hex')}.${salto}`
  }

  const atualizarUsuario = await usuarioRepositories.atualizarUsuarioIdRepositories(usuarioId, novoUsuario)
  return atualizarUsuario
}

export default {
  criarUsuarioServices,
  listarUsuarioIdServices,
  listarUsuarioNomeServices,
  listarUsuarioEmailServices,
  listarTodosUsuariosServices,
  atualizarUsuarioIdServices
}
