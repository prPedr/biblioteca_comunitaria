import express from "express"
import router from "./src/routes/usuarioRoutes.js"

const app = express()

app.use(express.json())
app.use(router)

const porta = 3235

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})
