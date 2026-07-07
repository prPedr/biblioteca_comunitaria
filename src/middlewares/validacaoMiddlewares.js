const validacao = (schema) => (request, response, next) => {
  const resultado = schema(request.body);

  if (!resultado.success) {
    return response.status(400).json({
      Mensagem: "Erro de validação",
      Detalhes: resultado.erros
    });
  }

  request.body = resultado.data;
  next();
};

export default validacao;