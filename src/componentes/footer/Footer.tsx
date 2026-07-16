import { Mail, Globe, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#9e0000] text-white py-10 border-t-8 border-destaque w-full">
      <div className="max-w-7xl mx-auto px-40">
        
        {/* Bloco do Logo */}
        <div className="text-center mb-4 border-b border-white/10 pb-3">
          <div className="flex justify-center mb-1">
            <img src="./TomatoCut.png" alt="Logo LaTomata" className="w-12 h-12" />
          </div>
          <p className="font-['Playfair_Display'] text-3xl font-bold tracking-tighter">LaTomata</p>
          <p className="text-sm opacity-60 mt-2 italic">A paz de espírito que você só encontra no prato.</p>
        </div>

        {/* Grid de Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {[
            {
              title: "Institucional",
              links: [
                { label: "Categorias", path: "/categorias" },
                { label: "Produtos", path: "/produtos" },
                { label: "Sobre Nós", path: "/sobrenos" }
              ]
            },
            {
              title: "Ajuda & Legal",
              links: [
                { label: "FAQ", path: "#" },
                { label: "Áreas de Entrega", path: "#" },
                { label: "Privacidade", path: "#" }
              ]
            },
            {
              title: "Social",
              links: [
                { label: "Instagram", path: "#" },
                { label: "Twitter", path: "#" },
                { label: "LinkedIn", path: "#" }
              ]
            },
            {
              title: "Pagamento",
              links: [
                { label: "Cartões", path: "#" },
                { label: "Pix", path: "#" },
                { label: "Vale Refeição", path: "#" }
              ]
            }
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="font-black uppercase text-[#fdfbf7] mb-1 tracking-widest text-sm">{section.title}</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="hover:text-white hover:underline transition-all">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rodapé final */}
        <div className="text-center pt-8 border-t border-white/10">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-[#2d5a27] transition-colors"><Mail size={20} /></a>
            <a href="#" className="hover:text-[#2d5a27] transition-colors"><Globe size={20} /></a>
            <a href="#" className="hover:text-[#2d5a27] transition-colors"><Share2 size={20} /></a>
          </div>
          <p className="text-[10px] text-white/50 uppercase tracking-widest">
            &copy; {currentYear} LaTomata Delivery Saudável. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}