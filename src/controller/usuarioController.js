import usuarioServices from "../service/usuarioServices.js"

const criarUsuarioController = async (request, response) => {
  const novoUsuario = request.body

  try {
    const criarUsuario = await usuarioServices.criarUsuarioServices(novoUsuario)
    response.status(201).send({criarUsuario})
  } catch (err) {
    response.status(400).send(err.message)
  }
}

const listarTodosUsuariosController = async (request, response) => {
  try {
    const listarTodosUsuarios = await usuarioServices.listarTodosUsuariosServices()
    response.status(200).send({listarTodosUsuarios})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

const listarUsuarioIdController = async (request, response) => {
  const { id } = request.params

  try {
    const listarUsuarioId = await usuarioServices.listarUsuarioIdServices(id)
    response.status(200).send({listarUsuarioId})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

const listarUsuarioNomeController = async (request, response) => {
  const { nomeUsuario } = request.params

  try {
    const listarUsuarioNome = await usuarioServices.listarUsuarioNomeServices(nomeUsuario)
    response.status(200).send({listarUsuarioNome})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

const listarUsuarioEmailController = async (request, response) => {
  const { email } = request.params

  try {
    const listarUsuarioEmail = await usuarioServices.listarUsuarioEmailServices(email)
    response.status(200).send({listarUsuarioEmail})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

const atualizarUsuarioIdController = async (request, response) => {
  const { id } = request.params
  const novoUsuario = request.body

  try {
    const atualizarUsuario = await usuarioServices.atualizarUsuarioIdServices(novoUsuario, id)
    response.status(200).send({atualizarUsuario})
  } catch (err) {
    response.status(400).send(err.message)
  }
}

const atualizarUsuarioNomeController = async (request, response) => {
  const { nomeUsuario } = request.params
  const novoUsuario = request.body

  try {
    const atualizarUsuario = await usuarioServices.atualizarUsuarioNomeServices(novoUsuario, nomeUsuario)
    response.status(200).send({atualizarUsuario})
  } catch (err) {
    response.status(400).send(err.message)
  }
}

const atualizarUsuarioEmailController = async (request, response) => {
  const { email } = request.params
  const novoUsuario = request.body

  try {
    const atualizarUsuario = await usuarioServices.atualizarUsuarioEmailServices(novoUsuario, email)
    response.status(200).send({atualizarUsuario})
  } catch (err) {
    response.status(400).send(err.message)
  }
}

export default {
  criarUsuarioController,
  listarTodosUsuariosController,
  listarUsuarioIdController,
  listarUsuarioNomeController,
  listarUsuarioEmailController,
  atualizarUsuarioIdController,
  atualizarUsuarioNomeController,
  atualizarUsuarioEmailController
}
