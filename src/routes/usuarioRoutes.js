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
  usuarioController.buscarUsuarioIdController
)

router.get(
  "/usuarios/nome/:nomeUsuario",
  usuarioController.buscarUsuarioNomeController
)

router.get(
  "/usuarios/email/:email",
  usuarioController.buscarUsuarioEmailController
)

router.put(
  "/usuarios/:id",
  validacaoMiddlewares(usuarioSchema),
  usuarioController.atualizarUsuarioIdController
)

export default router
