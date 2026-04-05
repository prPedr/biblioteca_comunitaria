import express from "express"

const app = express()

app.get("/", function(request, response) {
  response.send("Hello World!")
})

const porta = 3333

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})
