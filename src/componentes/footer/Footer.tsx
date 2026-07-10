import React from 'react';
import { Mail, Globe, Share2, CreditCard } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--color-red)] text-[#1F1615] py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         
          <div className='text-white'>
            <h3 className= "text-lg font-bold mb-4">LaTomata</h3>
            <p className="text-sm mb-4">
              Levando saúde e sabor direto para a sua porta. Comida de verdade para quem busca o melhor.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-500"><Mail size={20} /></a>
              <a href="#" className="hover:text-green-500"><Globe size={20} /></a>
              <a href="#" className="hover:text-green-500"><Share2 size={20} /></a>
            </div>
          </div>

          <div className='text-white'>
            <h4 className="text-white font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-500 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Contato</a></li>
            </ul>
          </div>

          <div className='text-white'>
            <h4 className="text-white font-semibold mb-4">Ajuda & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-500 transition-colors">Dúvidas Frequentes (FAQ)</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Áreas de Entrega</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Política de Reembolso</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Privacidade</a></li>
            </ul>
          </div>

          <div className='text-white'>
            <h4 className="text-white font-semibold mb-4">Fique por dentro</h4>
            <p className="text-sm mb-4">Assine nossa newsletter para dicas de refeições saudáveis e cupons exclusivos.</p>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="w-full px-3 py-2 text-white-semibold mb-4"
              />
              <button className="bg-(--color-green) hover:bg-green-700 text-white px-4 py-2 rounded-r-md transition-colors">
                Assinar
              </button>
            </div>
            <h4 className="text-white  font-semibold mb-2 text-sm">Pagamento Seguro</h4>
            <div className="flex space-x-2">
              <CreditCard size={24} className="text-white" />
              <span className="text-sm flex items-center">Cartões, Pix e VR</span>
            </div>
          </div>

        </div>
       
        <div className="border-t --color-light-red mt-12 pt-8 text-sm text-center text-white ">
          <p>&copy; {new Date().getFullYear()} LaTomata Delivery Saudável. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
