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
  usuarioController.listarUsuarioIdController
)

router.get(
  "/usuarios/nomeUsuario/:nomeUsuario",
  usuarioController.listarUsuarioNomeController
)

router.get(
  "/usuarios/email/:email",
  usuarioController.listarUsuarioEmailController
)

router.put(
  "/usuarios/id/:id",
  validacaoMiddlewares(usuarioSchema),
  usuarioController.atualizarUsuarioIdController 
)

router.put(
  "/usuarios/nomeUsuario/:nomeUsuario",
  validacaoMiddlewares(usuarioSchema),
  usuarioController.atualizarUsuarioNomeController
)

router.put(
  "/usuarios/email/:email",
  validacaoMiddlewares(usuarioSchema),
  usuarioController.atualizarUsuarioEmailController
)

export default router
