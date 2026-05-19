import { Router } from "express"
import usuarioController from "../controller/usuarioController.js"
import validacaoMiddlewares from "../middlewares/validacaoMiddlewares.js"
import usuarioSchema from "../schema/usuarioSchema.js"

const router = Router()

router.post(
  "/usuarios",
  validacaoMiddlewares(usuarioSchema),
  usuarioController.criarUsuarioController
)

router.get(
  "/usuarios",
  usuarioController.listarTodosUsuariosController
)

router.get(
  "/usuarios/id/:id",
  usuarioController.buscarUsuarioPorIdController
)

router.get(
  "/usuarios/nome/:nomeUsuario",
  usuarioController.buscarUsuarioPorNomeController
)

router.get(
  "/usuarios/email/:email",
  usuarioController.buscarUsuarioPorEmailController
)

export default router
