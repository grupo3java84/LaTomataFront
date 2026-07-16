import React, { useContext } from 'react';
import { ShoppingCart, Menu, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export function Navbar() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLogado = usuario.token !== "";

  function logout() {
    handleLogout();
    navigate('/login');
  }

  return (
    <nav className="bg-[#9e0000] shadow-md w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="./TomatoCut.png" alt="Logo LaTomata" className="w-10 h-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" />
              <span className="text-3xl font-bold font-['Playfair_Display'] text-white tracking-tight transition-all duration-500 group-hover:tracking-wider">
                LaTomata
              </span>
            </Link>
            
          </div>

          {/* Links e Ações */}
          <div className="flex items-center gap-8">
            <Link to="/categorias" className="inline-block text-white font-medium hover:text-[#fdfbf7] transition-all hover:scale-105 uppercase text-xs tracking-widest">
              Categorias
            </Link>
            <Link to="/produtos" className="inline-block text-white font-medium hover:text-[#fdfbf7] transition-all hover:scale-105 uppercase text-xs tracking-widest">
              Produtos
            </Link>

            {!isLogado ? (
              <>
                <Link to="/cadastro" className="inline-block text-white font-medium hover:text-[#fdfbf7] transition-all hover:scale-105 uppercase text-xs tracking-widest">
                  Cadastro
                </Link>
                <Link to="/login" className="bg-white text-[#9e0000] px-5 py-2 rounded-sm font-black uppercase text-xs tracking-widest transition-all transform hover:scale-105 shadow-md">
                  Login
                </Link>
                {/* Carrinho no fim quando não logado */}
                <button className="relative p-2 text-white hover:text-[#fdfbf7] transition-all hover:scale-110 duration-300">
                  <ShoppingCart size={24} />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black text-[#9e0000] bg-white rounded-full">2</span>
                </button>
              </>
            ) : (
              // Ordem: Carrinho -> Perfil -> Logout
              <>
                <button className="relative p-2 text-white hover:text-[#fdfbf7] transition-all hover:scale-110 duration-300">
                  <ShoppingCart size={24} />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black text-[#9e0000] bg-white rounded-full">2</span>
                </button>
                
                <div className="flex items-center gap-6 text-white">
                  <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <User size={20} />
                    <span className="text-[10px] font-bold mt-1 max-w-[80px] truncate">{usuario.nome}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105 border border-white/20"
                  >
                    <LogOut size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Sair</span>
                  </button>
                </div>
              </>
            )}

            <button className="md:hidden text-white p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}