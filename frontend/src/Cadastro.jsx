import { useState } from "react";
import "./Cadastro.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nomeUsuario: "",
    email: "",
    senha: "",
    fotoPerfil: "",
  });
  const [erros, setErros] = useState([]);
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSucesso("");
    setErros([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErros([]);
    setSucesso("");

    try {
      const response = await fetch("http://localhost:3235/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.Detalhes) {
          setErros(data.Detalhes);
        } else {
          setErros([{ mensagem: data }]);
        }
        return;
      }

      setSucesso("Usuário cadastrado com sucesso!");
      setFormData({ nomeUsuario: "", email: "", senha: "", fotoPerfil: "" });
    } catch (error) {
      setErros([{ mensagem: "Erro ao conectar com o servidor." }]);
    }
  };

  return (
    <div className="container-soft-dark">
      <div className="card-cadastro">
        <h2>Criar Conta</h2>
        <p className="subtitle">Junte-se à nossa biblioteca comunitária</p>

        {sucesso && <div className="alerta sucesso">{sucesso}</div>}
        
        {erros.length > 0 && (
          <div className="alerta erro">
            <ul>
              {erros.map((erro, index) => (
                <li key={index}>{erro.mensagem}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-minimalista">
          <div className="input-group">
            <label htmlFor="nomeUsuario">Nome de Usuário</label>
            <input
              type="text"
              id="nomeUsuario"
              name="nomeUsuario"
              value={formData.nomeUsuario}
              onChange={handleChange}
              placeholder="Digite seu nome"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          <div className="input-group">
            <label htmlFor="fotoPerfil">URL da Foto de Perfil (Opcional)</label>
            <input
              type="url"
              id="fotoPerfil"
              name="fotoPerfil"
              value={formData.fotoPerfil}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <button type="submit" className="btn-primary">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;