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

export default {
  criarUsuarioController
}
