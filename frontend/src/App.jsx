import { useState } from 'react';
import Cadastro from './Cadastro';
import ListaUsuarios from './ListaUsuarios';
import './App.css'; // Vamos criar esse arquivo rapidinho abaixo

function App() {
  const [abaAtual, setAbaAtual] = useState('cadastro');

  return (
    <div className="app-container">
      <nav className="navbar">
        <button 
          className={abaAtual === 'cadastro' ? 'nav-btn ativo' : 'nav-btn'}
          onClick={() => setAbaAtual('cadastro')}
        >
          Novo Leitor
        </button>
        <button 
          className={abaAtual === 'lista' ? 'nav-btn ativo' : 'nav-btn'}
          onClick={() => setAbaAtual('lista')}
        >
          Comunidade
        </button>
      </nav>

      <main className="conteudo-principal">
        {abaAtual === 'cadastro' ? <Cadastro /> : <ListaUsuarios />}
      </main>
    </div>
  );
}

export default App;