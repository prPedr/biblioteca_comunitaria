import { z } from "zod"

const usuarioSchema = z.object({
  nomeUsuario: z
    .string()
    .min(3, "O nome de usuário deve conter pelo menos 3 caracteres.")
    .max(72, "O nome de usuário deve conter no máximo 72 caracteres."),
  
  email: z
    .string()
    .email("E-mail inválido."),
  
  senha: z
    .string()
    .min(8, "A senha deve conter pelo menos 8 caracteres.") 
    .max(72, "A senha pode conter no máximo 72 caracteres.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
    .regex(/[\W_]/, "A senha deve conter pelo menos um caractere especial (ex: ! @ # $)."),
  
  fotoPerfil: z
    .string()
    .url("URL inválida.")
    .optional(),
})

export default {
  usuarioSchema,
}
