import React from 'react';
import { Mail, Globe, Share2, CreditCard } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-red-200 text-[#1F1615] py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         
          {/* Coluna 1: Institucional */}
          <div>
            <h3 className="text-[#1F1615] text-lg font-bold mb-4">🍅 LaTomata</h3>
            <p className="text-sm mb-4">
              Levando saúde e sabor direto para a sua porta. Comida de verdade para quem busca o melhor.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-500"><Mail size={20} /></a>
              <a href="#" className="hover:text-green-500"><Globe size={20} /></a>
              <a href="#" className="hover:text-green-500"><Share2 size={20} /></a>
            </div>
          </div>

          {/* Coluna 2: Links Úteis */}
          <div>
            <h4 className="text-[#1F1615] font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-500 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Coluna 3: Ajuda e Suporte */}
          <div>
            <h4 className="text-[#1F1615] font-semibold mb-4">Ajuda & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-500 transition-colors">Dúvidas Frequentes (FAQ)</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Áreas de Entrega</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Política de Reembolso</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Privacidade</a></li>
            </ul>
          </div>

          {/* Coluna 4: Newsletter e Pagamento */}
          <div>
            <h4 className="text-[#1F1615] font-semibold mb-4">Fique por dentro</h4>
            <p className="text-sm mb-4">Assine nossa newsletter para dicas de saúde e cupons exclusivos.</p>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="w-full px-3 py-2 text-white-semibold mb-4"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md transition-colors">
                Assinar
              </button>
            </div>
            <h4 className="text-[#1F1615] font-semibold mb-2 text-sm">Pagamento Seguro</h4>
            <div className="flex space-x-2">
              <CreditCard size={24} className="text-[#1F1615]" />
              {/* Aqui vocês podem adicionar as logos de Pix, Visa, Mastercard, VR, etc. */}
              <span className="text-sm flex items-center">Cartões, Pix e VR</span>
            </div>
          </div>

        </div>
       
        {/* Direitos Autorais */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} LaTomata Delivery Saudável. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
