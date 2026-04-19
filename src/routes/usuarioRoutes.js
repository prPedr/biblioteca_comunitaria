import { Router } from "express"
import usuarioController from "../controller/usuarioController.js"

const router = Router()

router.post("/usuarios", usuarioController.criarUsuarioController)

export default router
