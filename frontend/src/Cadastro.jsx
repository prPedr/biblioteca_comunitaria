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

      setSucesso("Usuário cadastrado com sucesso! Bem-vindo(a) à comunidade.");
      setFormData({ nomeUsuario: "", email: "", senha: "", fotoPerfil: "" });
    } catch (error) {
      setErros([{ mensagem: "Erro ao conectar com o servidor. Tente novamente mais tarde." }]);
    }
  };

  return (
    <div className="container-soft-dark">
      <div className="card-cadastro">
        {/* Ícone de Boas-Vindas */}
        <div className="icone-biblioteca">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8257e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        </div>

        <h2>Bem-vindo(a)!</h2>
        <p className="subtitle">Cadastre-se para explorar nosso acervo comunitário</p>

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
            <label htmlFor="nomeUsuario">Como devemos te chamar?</label>
            <input
              type="text"
              id="nomeUsuario"
              name="nomeUsuario"
              value={formData.nomeUsuario}
              onChange={handleChange}
              placeholder="Seu nome de usuário"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail de contato</label>
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
            <label htmlFor="senha">Crie uma senha segura</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Mínimo de 8 caracteres"
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
              placeholder="https://link-da-sua-foto.com"
            />
          </div>

          <button type="submit" className="btn-primary">
            Criar minha conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;