import usuarioSerices from "../service/usuarioServices.js"

const criarUsuarioController = async (request, response) => {
  const novoUsuario = request.body

  try {
    const usuario = usuarioSerices.criarUsuarioServices(novoUsuario)
    response.status(201).send({usuario})
  } catch (err) {
    response.status(400).send(err)
  }
}

export default {
  criarUsuarioController
}
