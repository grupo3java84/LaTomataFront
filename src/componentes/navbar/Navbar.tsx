import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-(--color-red) shadow-md w-full relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <img src="./TomatoCut.png" alt="Logo LaTomata" className="h-10 w-10 mr-2" />
            <Link
              to="/"
              className="text-2xl text-(--color-bg) hover:text-green-600 font-medium"
            >
              LaTomata
            </Link>
          </div>

          {/* Links e Search (Escondidos no mobile) */}
          <div className="hidden md:flex items-center gap-6 flex-1 ml-10">
            <Link to="/sobrenos" className="text-(--color-bg) hover:text-green-600 font-medium">Sobre nós</Link>

            <div className="flex-1 max-w-lg relative ml-4 ">
              <input
                type="text"
                placeholder="Busque por categorias..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-500 
             text-(--color-bg) 
             placeholder:text-(--color-bg)/90 
             focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
            </div>
          </div>



          {/* Menu Cadastro */}
          <div className="flex items-center space-x-8">
            <Link to="/cadastro" className="text-(--color-bg) hover:text-green-600 font-medium">Cadastro</Link>

            {/* Menu Login */}
            <div className="flex items-center space-x-8">
              <Link to="/login" className="text-(--color-bg) hover:text-green-600 font-medium">Login</Link>



              {/* Corpo do Dropdown
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                  <a href="#" className="block px-4 py-2 text-sm text-[#1F1615] hover:bg-green-50">Minha Conta / Configurações</a>
                  <a href="#" className="block px-4 py-2 text-sm text-[#1F1615] hover:bg-green-50">Meus Pedidos</a>
                  <a href="#" className="block px-4 py-2 text-sm text-[#1F1615] hover:bg-green-50">Cupons e Ofertas</a>
                  <hr className="my-1 border-gray-200" />
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sair</a>
                </div>
              )}
            </div> */}

              {/* Ações: Carrinho e Perfil */}
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-(--color-bg) hover:text-green-600">
                  <ShoppingCart size={24} />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                    2
                  </span>
                </button>

                {/* Botão Mobile */}
                <div className="md:hidden flex items-center">
                  <button className="text-gray-700 hover:text-green-600 focus:outline-none p-2">
                    <Menu size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
