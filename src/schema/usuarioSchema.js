const usuarioSchema = (dados) => {
  const erros = [];
  const { nomeUsuario, email, senha, fotoPerfil } = dados;

  // Validação: nomeUsuario
  if (!nomeUsuario || typeof nomeUsuario !== "string") {
    erros.push({ 
      campo: "nomeUsuario", 
      mensagem: "O nome de usuário é obrigatório."
    });

  } else {
    if (nomeUsuario.length < 3) {
      erros.push({ 
        campo: "nomeUsuario", 
        mensagem: "O nome de usuário deve conter pelo menos 3 caracteres."
      });
    }

    if (nomeUsuario.length > 72) {
      erros.push({ 
        campo: "nomeUsuario", 
        mensagem: "O nome de usuário deve conter no máximo 72 caracteres."
      });
    }
  }

  // Validação: email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    erros.push({ 
      campo: "email", 
      mensagem: "E-mail inválido."
    });
  }

  // Validação: senha
  if (!senha || typeof senha !== "string") {
    erros.push({ 
      campo: "senha", 
      mensagem: "A senha é obrigatória."
    });

  } else {

    if (senha.length < 8) {
      erros.push({ 
        campo: "senha", 
        mensagem: "A senha deve conter pelo menos 8 caracteres."
      });
    }

    if (senha.length > 72) {
      erros.push({ 
        campo: "senha", 
        mensagem: "A senha pode conter no máximo 72 caracteres."
      });
    } 

    if (!/[A-Z]/.test(senha)) {
      erros.push({ 
        campo: "senha", 
        mensagem: "A senha deve conter pelo menos uma letra maiúscula."
      });
    } 

    if (!/[a-z]/.test(senha)) {
      erros.push({ 
        campo: "senha", 
        mensagem: "A senha deve conter pelo menos uma letra minúscula."
      });
    } 

    if (!/[0-9]/.test(senha)) {
      erros.push({ 
        campo: "senha", 
        mensagem: "A senha deve conter pelo menos um número."
      });
    } 

    if (!/[\W_]/.test(senha)) {
      erros.push({ 
        campo: "senha", 
        mensagem: "A senha deve conter pelo menos um caractere especial (ex: ! @ # $)."
      });
    } 

  }

  // Validação: fotoPerfil (Opcional)
  if (fotoPerfil !== undefined && fotoPerfil !== "") {
    try {
      new URL(fotoPerfil); // Se não for uma URL válida, vai cair no catch
    } catch (error) {
      erros.push({ 
        campo: "fotoPerfil", 
        mensagem: "URL inválida."
      });
    }
  }

  // Retorno no estilo "safeParse"
  if (erros.length > 0) {
    return { success: false, erros };
  }

  return { success: true, data: { nomeUsuario, email, senha, fotoPerfil } };
};

export default usuarioSchema;