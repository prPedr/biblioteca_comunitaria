import crypto from "node:crypto"
import util from "node:util"

import usuarioRepositories from "../repositories/usuarioRepositories.js"

const scrypt = util.promisify(crypto.scrypt)

const criarUsuarioServices = async (novoUsuario) => {
  const buscarEmail = await usuarioRepositories.buscarUsuarioEmailRepositories(novoUsuario.email)
  if (buscarEmail) {
    throw new Error("Email já cadastrado.")
  }

  const buscarNome = await usuarioRepositories.buscarUsuarioNomeRepositories(novoUsuario.nomeUsuario)
  if (buscarNome) {
    throw new Error("Nome de usuario já cadastrado.")
  }

  const salto = crypto.randomBytes(16).toString("hex")
  const buffer = await scrypt(novoUsuario.senha, salto, 64)
  const senhaHash = `${buffer.toString("hex")}.${salto}`

  const criarUsuario = await usuarioRepositories.criarUsuarioRepositories({
    ...novoUsuario,
    senha : senhaHash,
  })

  if (!criarUsuario) {
    throw new Error("Erro ao criar o usuario.")
  }

  return criarUsuario
}

const buscarUsuarioIdServices = async (id) => {
  const buscarId = await usuarioRepositories.buscarUsuarioIdRepositories(id)
  if (!buscarId) {
    throw new Error("Nao foi possivel encontrar o ID de usuario.")
  }

  return buscarId
}

const buscarUsuarioNomeServices = async (nomeUsuario) => {
  const buscarNome = await usuarioRepositories.buscarUsuarioNomeRepositories(nomeUsuario)
  if (!buscarNome) {
    throw new Error("Nao foi posssivel encontrar o nome de usuario.")
  }

  return buscarNome
}

const buscarUsuarioEmailServices = async (email) => {
  const buscarEmail = await usuarioRepositories.buscarUsuarioEmailRepositories(email)
  if (!buscarEmail) {
    throw new Error("Nao possivel encontrar o email de usuario.")
  }

  return buscarEmail
}

const listarTodosUsuariosServices = async () => {
  const listarTodosUsuarios = await usuarioRepositories.listarTodosUsuariosRepositories()
  return listarTodosUsuarios
}

const atualizarUsuarioIdService = async (id, novoUsuario) => {
  const buscarId = await usuarioRepositories.buscarUsuarioIdRepositories(id)
  if (!buscarId) {
    throw new Error("Id do usuario nao encontrado.")
  }

  if (novoUsuario.email) {
    const verificarEmailExistente = await usuarioRepositories.buscarUsuarioEmailRepositories(novoUsuario.email)
    
    if (verificarEmailExistente && verificarEmailExistente.id != id) {
      throw new Error("Email já cadastrado.")
    }
  }

  if (novoUsuario.nomeUsuario) {
    const verificarNomeExistente = await usuarioRepositories.buscarUsuarioNomeRepositories(novoUsuario.nomeUsuario)

    if (verificarNomeExistente && verificarNomeExistente.id != id) {
      throw new Error("Nome de usuario já cadastrado.")
    } 
  }

  if (novoUsuario.senha) {
    novoUsuario.senha = await bcrypt.hash(novoUsuario.senha, 10)
  }

  const usuarioAtualizado = await usuarioRepositories.atualizarUsuarioIdRepositories(id, novoUsuario)

  return usuarioAtualizado
}

export default {
  criarUsuarioServices,
  buscarUsuarioIdServices,
  buscarUsuarioNomeServices,
  buscarUsuarioEmailServices,
  listarTodosUsuariosServices,
  atualizarUsuarioIdService
}
