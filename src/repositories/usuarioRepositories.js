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
            id : this.lastID,
            Mensagem : `Usuario ${nomeUsuario} cadastrado`
          })
        }
      }
    )
  })
}

const buscarUsuarioPorId = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT id, nomeUsuario, email, fotoPerfil
        FROM usuarios
        WHERE id = ?
      `, 

      [id],

      (err, linhaId) => {
        if (err) {
          reject(err)
        } else {
          resolve(linhaId)
        }
      }
    )
  })
}

const buscarUsuarioPorEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT id, nomeUsuario, email, fotoPerfil
        FROM usuarios
        WHERE email = ?
      `,

      [email],

      (err, linhaEmail) => {
        if (err) {
          reject(err)
        } else {
          resolve(linhaEmail)
        }
      }
    )
  })
}

const buscarUsuarioPorNome = (nomeUsuario) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT id, nomeUsuario, email, fotoPerfil
        FROM usuarios
        WHERE nomeUsuario = ?
      `,

      [nomeUsuario],

      (err, linhaNome) => {
        if (err) {
          reject(err)
        } else {
          resolve(linhaNome)
        }
      }
    )
  })
}

const listarTodosUsuariosRepositories = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT id, nomeUsuario, email, fotoPerfil
        FROM usuarios
      `,

      (err, linhaTodosUsuarios) => {
        if (err) {
          reject(err)
        } else {
          resolve(linhaTodosUsuarios)
        }
      }
    )
  })
}

export default {
  criarUsuarioRepositories,
  buscarUsuarioPorId,
  buscarUsuarioPorEmail,
  buscarUsuarioPorNome,
  listarTodosUsuariosRepositories
}
