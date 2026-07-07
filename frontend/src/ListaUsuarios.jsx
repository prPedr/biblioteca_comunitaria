import { useState, useEffect } from "react";
import "./ListaUsuarios.css";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:3235/usuarios");
        if (!response.ok) {
          throw new Error("Erro ao buscar os usuários.");
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setErro("Não foi possível carregar a lista de usuários.");
      } finally {
        setCarregando(false);
      }
    };

    buscarUsuarios();
  }, []);

  return (
    <div className="container-lista">
      <div className="cabecalho-lista">
        <h2>Comunidade</h2>
        <p className="subtitle">Conheça os leitores da nossa biblioteca</p>
      </div>

      {carregando && <div className="estado-vazio">Carregando leitores...</div>}
      
      {erro && <div className="alerta erro">{erro}</div>}

      {!carregando && !erro && usuarios.length === 0 && (
        <div className="estado-vazio">
          Nenhum usuário cadastrado ainda. Seja o primeiro!
        </div>
      )}

      <div className="grid-usuarios">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="card-usuario">
            <div className="avatar-usuario">
              {usuario.fotoPerfil ? (
                <img src={usuario.fotoPerfil} alt={`Foto de ${usuario.nomeUsuario}`} />
              ) : (
                <span className="avatar-placeholder">
                  {usuario.nomeUsuario.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="info-usuario">
              <h3>{usuario.nomeUsuario}</h3>
              <p>{usuario.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaUsuarios;
