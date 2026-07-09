import express from "express"
import cors from "cors"
import usuarioRoutes from "./src/routes/usuarioRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(usuarioRoutes)

const porta = 3235

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})
