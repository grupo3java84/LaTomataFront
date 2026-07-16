import React from 'react';
import { Search, ShoppingCart, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-[#9e0000] shadow-md w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo com Efeito de Pulso e Expansão */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="./TomatoCut.png"
                alt="Logo LaTomata"
                className="w-10 h-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
              />
              <span className="text-3xl font-bold font-['Playfair_Display'] text-white tracking-tight transition-all duration-500 group-hover:tracking-wider">
                LaTomata
              </span>
            </Link>
          </div>

          {/* Busca Integrada */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Buscar um prato..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-white/20 bg-white/10 text-white placeholder:text-white/70 focus:outline-none focus:bg-white/20 transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-white/70" size={20} />
            </div>
          </div>

          {/* Links e Ações com Efeito Hover */}
          <div className="flex items-center gap-8">
            <Link to="/produtos" className="inline-block text-white font-medium hover:text-[#fdfbf7] transition-all hover:scale-105 uppercase text-xs tracking-widest">
              Produtos
            </Link>
            <Link to="/categorias" className="inline-block text-white font-medium hover:text-[#fdfbf7] transition-all hover:scale-105 uppercase text-xs tracking-widest">
              Categorias
            </Link>
            <Link to="/cadastro" className="inline-block text-white font-medium hover:text-[#fdfbf7] transition-all hover:scale-105 uppercase text-xs tracking-widest">
              Cadastro
            </Link>

            <Link
              to="/login"
              className="bg-white text-[#9e0000] px-5 py-2 rounded-sm font-black uppercase text-xs tracking-widest transition-all transform hover:scale-105 shadow-md"
            >
              Login
            </Link>

            <button className="relative p-2 text-white hover:text-[#fdfbf7] transition-all hover:scale-110">
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black text-[#9e0000] bg-white rounded-full">
                2
              </span>
            </button>

            <button className="md:hidden text-white p-2">
              <Menu size={24} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}