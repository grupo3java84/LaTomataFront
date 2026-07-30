import { Mail, Globe, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#b33939] text-white py-5 border-t-8 border-[#3b7a57] w-full relative overflow-hidden shadow-[inset_0_10px_0_rgba(0,0,0,0.1)]">
      
      <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#3b7a57,#3b7a57_12px,#fff_12px,#fff_24px)] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-2 lg:px-5">

        <div className="text-center mb-10 border-b-2 border-white/20 pb-1">
          <div className="flex justify-center">
            <img src="./TomatoCut.png" alt="Logo LaTomata" className="w-12 h-12 [image-rendering:pixelated]" />
          </div>
          <p className="font-mono text-3xl font-black tracking-tight drop-shadow-[2px_2px_0px_#3b7a57]">LaTomata</p>
          <p className="text-sm text-[#ffeaa7] mt-1 font-mono italic"> A paz de espírito que você só encontra no prato.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left mb-3">
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
            <div key={idx} className="bg-[#9c2e2e]/40 p-4 border-2 border-white/10 shadow-sm">
              <h4 className="font-black uppercase text-[#ffeaa7] mb-3 tracking-wider text-xs font-mono border-b border-white/10 pb-1 inline-block">{section.title}</h4>
              <ul className="space-y-2 text-xs font-mono">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center pt-4 border-t-2 border-white/20">
          <div className="flex justify-center space-x-6 mb-2">
            <a href="#" className="p-2 bg-[#2b5c40] text-white border border-white/30 hover:bg-[#ffeaa7] hover:text-[#b33939] transition-all shadow-[2px_2px_0px_#000]"><Mail size={18} /></a>
            <a href="#" className="p-2 bg-[#2b5c40] text-white border border-white/30 hover:bg-[#ffeaa7] hover:text-[#b33939] transition-all shadow-[2px_2px_0px_#000]"><Globe size={18} /></a>
            <a href="#" className="p-2 bg-[#2b5c40] text-white border border-white/30 hover:bg-[#ffeaa7] hover:text-[#b33939] transition-all shadow-[2px_2px_0px_#000]"><Share2 size={18} /></a>
          </div>
          <p className="pt-2 text-[10px] text-white/70 uppercase tracking-widest font-mono">
            &copy; {currentYear} LaTomata Delivery Saudável. Todos os direitos reservados. 
          </p>
        </div>
      </div>
    </footer>
  );
}