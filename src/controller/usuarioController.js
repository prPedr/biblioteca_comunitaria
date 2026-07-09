import usuarioServices from "../service/usuarioServices.js"

const criarUsuarioController = async (request, response) => {
  const novoUsuario = request.body

  try {
    const usuario = await usuarioServices.criarUsuarioServices(novoUsuario)
    response.status(201).send({usuario})
  } catch (err) {
    response.status(400).send(err.message)
  }
}

const buscarUsuarioIdController = async (request, response) => {
  const { id } = request.params

  try {
    const listarUsuarioId = await usuarioServices.buscarUsuarioIdServices(id)
    response.status(200).send({listarUsuarioId})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

const buscarUsuarioNomeController = async (request, response) => {
  const { nomeUsuario } = request.params

  try {
    const buscarNome = await usuarioServices.buscarUsuarioNomeServices(nomeUsuario)
    response.status(200).send({buscarNome})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

const buscarUsuarioEmailController = async (request, response) => {
  const { email } = request.params

  try {
    const buscarEmail = await usuarioServices.buscarUsuarioEmailServices(email)
    response.status(200).send({buscarEmail})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

const listarTodosUsuariosController = async (request, response) => {
  try {
    const listarUsuarios = await usuarioServices.listarTodosUsuariosServices()
    response.status(200).send(listarUsuarios)
  } catch (err) {
    response.status(404).send(err.message)
  }
}

const atualizarUsuarioIdController = async (request, response) => {
  const { id } = request.params
  const novoUsuario = request.body

  try {
    const usuario = await usuarioServices.atualizarUsuarioService(id, novoUsuario)
    response.status(200).send({usuario})
  } catch (err) {
    response.status(400).send(err.message)
  }
}

export default {
  criarUsuarioController,
  buscarUsuarioIdController,
  buscarUsuarioNomeController,
  buscarUsuarioEmailController,
  listarTodosUsuariosController,
  atualizarUsuarioIdController
}
