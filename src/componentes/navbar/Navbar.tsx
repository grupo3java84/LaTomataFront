import React, { useContext, useState } from 'react';
import { Menu, User, LogOut, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastAlerta } from '../../utils/ToastAlerta';

export function Navbar() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const isLogado = usuario.token !== "";

  function logout() {
    handleLogout();
    ToastAlerta('O Usuário foi desconectado com sucesso!', 'info');
    navigate('/login');
    setIsOpen(false);
  }

  return (
    <nav className="bg-[#b33939] border-b-4 border-[#3b7a57] shadow-[0_4px_0_#2b5c40] w-full sticky top-0 z-50">
      <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#fff,#fff_10px,#b33939_10px,#b33939_20px)] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="./TomatoCut.png" 
                alt="Logo LaTomata" 
                className="w-10 h-10 [image-rendering:pixelated] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" 
              />
              <span className="text-2xl font-black font-mono text-[#fffdf9] tracking-tighter drop-shadow-[2px_2px_0px_#2b5c40] group-hover:text-[#ffeaa7] transition-colors">
                LaTomata
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/categorias" className="inline-block text-white font-bold hover:text-[#ffeaa7] transition-all hover:-translate-y-0.5 uppercase text-xs tracking-widest font-mono">
              Categorias
            </Link>
            <Link to="/produtos" className="inline-block text-white font-bold hover:text-[#ffeaa7] transition-all hover:-translate-y-0.5 uppercase text-xs tracking-widest font-mono">
              Produtos
            </Link>

            {!isLogado ? (
              <>
                <Link to="/cadastro" className="inline-block text-white font-bold hover:text-[#ffeaa7] transition-all hover:-translate-y-0.5 uppercase text-xs tracking-widest font-mono">
                  Cadastro
                </Link>
                <Link to="/login" className="bg-[#fffdf9] text-[#b33939] border-2 border-[#2b5c40] px-5 py-2 font-black uppercase text-xs tracking-widest transition-all transform hover:-translate-y-1 shadow-[2px_2px_0px_#2b5c40] active:translate-x-0.5 active:translate-y-0.5 font-mono">
                  Login
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4 text-white">
                <Link to="/perfil" className="flex flex-col items-center hover:scale-105 transition-transform duration-300 group">
                  <User size={20} className="text-[#ffeaa7] group-hover:drop-shadow-[0_0_2px_#fff]" />
                  <span className="text-[10px] font-bold mt-0.5 max-w-[80px] truncate font-mono bg-[#2b5c40]/60 px-1.5 py-0.5 border border-white/20">
                    {usuario.nome}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2b5c40] hover:bg-[#1e4430] text-white transition-all duration-200 border-2 border-white/30 shadow-[2px_2px_0px_#000]"
                >
                  <LogOut size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">Sair</span>
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white p-2 bg-[#2b5c40] border-2 border-white/30 shadow-[2px_2px_0px_#000]"
            aria-label="Abrir menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#9c2e2e] border-t-2 border-[#3b7a57] px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/categorias" 
              onClick={() => setIsOpen(false)}
              className="text-white font-bold uppercase text-xs tracking-widest font-mono hover:text-[#ffeaa7]"
            >
              Categorias
            </Link>
            <Link 
              to="/produtos" 
              onClick={() => setIsOpen(false)}
              className="text-white font-bold uppercase text-xs tracking-widest font-mono hover:text-[#ffeaa7]"
            >
              Produtos
            </Link>

            {!isLogado ? (
              <div className="flex flex-col space-y-3 pt-2 border-t border-white/20">
                <Link 
                  to="/cadastro" 
                  onClick={() => setIsOpen(false)}
                  className="text-white font-bold uppercase text-xs tracking-widest font-mono hover:text-[#ffeaa7]"
                >
                  Cadastro
                </Link>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="bg-[#fffdf9] text-[#b33939] border-2 border-[#2b5c40] px-5 py-2.5 font-black uppercase text-xs tracking-widest text-center shadow-[2px_2px_0px_#2b5c40] font-mono"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-2 border-t border-white/20">
                <Link 
                  to="/perfil" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-white font-bold font-mono"
                >
                  <User size={18} className="text-[#ffeaa7]" />
                  <span className="text-xs">{usuario.nome}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-[#2b5c40] text-white border-2 border-white/30 shadow-[2px_2px_0px_#000] font-mono text-xs font-bold uppercase"
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}