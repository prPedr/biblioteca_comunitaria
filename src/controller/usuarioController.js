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

const buscarUsuarioPorIdController = async (request, response) => {
  const {id} = request.params

  try {
    const listarUsuarioId = await usuarioServices.buscarUsuarioPorId(id)
    response.status(200).send({listarUsuarioId})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

const buscarUsuarioPorNomeController = async (request, response) => {
  const {nomeUsuario} = request.params

  try {
    const buscarPorNome = await usuarioServices.buscarUsuarioPorNomeServices(nomeUsuario)
    response.status(200).send({buscarPorNome})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

const buscarUsuarioPorEmailController = async (request, response) => {
  const {email} = request.params

  try {
    const buscarPorEmail = await usuarioServices.buscarUsuarioPorEmailServices(email)
    response.status(200).send({buscarPorEmail})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

const listarTodosUsuariosController = async (request, response) => {
  try {
    const listarUsuarios = await usuarioServices.listarTodosUsuariosServices()
    response.status(200).send({listarUsuarios})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

export default {
  criarUsuarioController,
  buscarUsuarioPorIdController,
  buscarUsuarioPorNomeController,
  buscarUsuarioPorEmailController,
  listarTodosUsuariosController
}
