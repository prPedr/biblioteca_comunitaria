const validacao = (schema) => (request, response, next) => {
  // O safeParse não "explode" a aplicação, ele retorna um objeto estruturado
  const resultado = schema.safeParse(request.body)

  if (!resultado.success) {
    // Pegamos os erros diretamente de resultado.error.issues
    const errosFormatados = resultado.error.issues.map((erro) => ({
      campo: erro.path[0],
      mensagem: erro.message
    }))

    return response.status(400).json({
      Mensagem: "Erro de validação",
      Detalhes: errosFormatados
    })
  }

  // Se passou na validação, garantimos que o body use os dados validados pelo Zod 
  // (útil se você usar transformações no schema depois)
  request.body = resultado.data
  next()
}

export default validacao
