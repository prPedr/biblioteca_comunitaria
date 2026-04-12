import db from "../config/database.js"

db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    idUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeUsuario TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    fotoUsuario TEXT
  )
`)

const criarUsuarioRepositories = (novoUsuario) => {
  return new Promise((resolve, reject) => {
    const {nomeUsuario, email, senha, fotoUsuario = null} = novoUsuario

    db.run(
      `
        INSERT INTO usuarios (nomeUsuario, email, senha, fotoUsuario)
        VALUES (?, ?, ?, ?)
      `,
      
      [nomeUsuario, email, senha, fotoUsuario],

      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve({
            id: this.lastID,
            nomeUsuario,
            Mensagem : `Usuario ${nomeUsuario} cadastrado`
          })
        }
      }
    )
  })
}

export default criarUsuarioRepositories