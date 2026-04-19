import db from "../config/database.js"

db.run(
  `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeUsuario TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      fotoPerfil TEXT
    )
  `
)

const criarUsuarioRepositories = (novoUsuario) => {
  return new Promise((resolve, reject) => {
    const { nomeUsuario, email, senha, fotoPerfil } = novoUsuario

    db.run(
      `
        INSERT INTO usuarios (nomeUsuario, email, senha, fotoPerfil)
        VALUES (?, ?, ?, ?)
      `,

      [nomeUsuario, email, senha, fotoPerfil],

      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve({
            id : this.lastID(),
            ...novoUsuario,
            Mensagem : `Usuario ${nomeUsuario} cadastrado`
          })
        }
      }
    )
  })
}

export default {
  criarUsuarioRepositories
}
