import sqlite3 from "sqlite3"

const db = new sqlite3.Database("biblioteca_db.sqlite", (err) => {
  if (err) {
    console.log("Falha ao se conectar com o banco de dados.")
  } else {
    console.log("Conectado ao banco de dados.")
  }
})

export default db